package com.foxtrot3.trello;

import com.foxtrot3.trello.database.card.UserCard;
import com.foxtrot3.trello.database.card.UserCardRepo;
import com.foxtrot3.trello.database.json.CardForm;
import com.foxtrot3.trello.database.board.Board;
import com.foxtrot3.trello.database.board.BoardRepo;
import com.foxtrot3.trello.database.board.UserBoard;
import com.foxtrot3.trello.database.board.UserBoardRepo;
import com.foxtrot3.trello.database.card.Card;
import com.foxtrot3.trello.database.card.CardRepo;
import com.foxtrot3.trello.database.hello.HelloRepo;
import com.foxtrot3.trello.database.json.ListForm;
import com.foxtrot3.trello.database.json.RegisterForm;
import com.foxtrot3.trello.database.list.ListRepo;
import com.foxtrot3.trello.database.user.User;
import com.foxtrot3.trello.database.user.UserRepo;
import com.foxtrot3.trello.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@RestController
@SpringBootApplication
@RequestMapping("/rest-services")
public class MainController extends SpringBootServletInitializer {
    @Autowired
    HelloRepo helloRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    BoardRepo boardRepo;
    @Autowired
    UserBoardRepo userBoardRepo;
    @Autowired
    ListRepo listRepo;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    CardRepo cardRepo;
    @Autowired
    UserCardRepo userCardRepo;

    @GetMapping("/hello")
    @ResponseBody
    public String helloWorld(){
        return helloRepo.findAll().get(0).getHello();
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/register")
    void registerUser(@RequestBody RegisterForm registerForm){
        if(userRepo.findByEmail(registerForm.getEmail()).isPresent()){
            throw new RuntimeException("User with that email already exists");
        }
        User user = new User();
        user.setEmail(registerForm.getEmail());
        user.setPassword(registerForm.getPassword());
        user.setName(registerForm.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserType("USER");
        userRepo.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        }catch (BadCredentialsException e){
            throw new RuntimeException("Incorrect email or password",e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/boards")
    List<Board> getBoards(){
        UserPrincipal userPrincipal = getPrincipal();
        List<UserBoard> userBoards = userBoardRepo.findAllByUserId(userPrincipal.getId());
        List<Board> boards = new ArrayList<>();
        for(UserBoard board : userBoards){
            Board foundBoard = boardRepo.findById(board.getBoardId());
            foundBoard = setLists(foundBoard);
            if(!foundBoard.isArchived())boards.add(foundBoard);
        }
        return boards;
    }

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @PutMapping("/boardPrivacy")
    void setBoardPrivacy(int id, boolean makePrivate){
        UserPrincipal userPrincipal = getPrincipal();
        UserBoard userBoard = userBoardRepo.findByBoardIdAndUserId(id, userPrincipal.getId());
        if (userBoard != null&&userBoard.isAdmin()){
            Board board = boardRepo.findById(userBoard.getBoardId());
            board.setPrivate(makePrivate);
            boardRepo.save(board);
        }
        else {
            throw new RuntimeException("Error 404, board not found.");
        }
    }

    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @PutMapping("/boardArchive")
    void setBoardArchivisation(int id, boolean makeArchived){
        UserPrincipal userPrincipal = getPrincipal();
        UserBoard userBoard = userBoardRepo.findByBoardIdAndUserId(id, userPrincipal.getId());
        if (userBoard != null&&userBoard.isAdmin()){
            Board board = boardRepo.findById(userBoard.getBoardId());
            board.setArchived(makeArchived);
            boardRepo.save(board);
        }
        else {
            throw new RuntimeException("Error 404, board not found.");
        }
    }

    @GetMapping("/board")
    Board getBoard(int id, HttpServletResponse response){
        Board board = boardRepo.findById(id);
        if(board==null)throw new RuntimeException("Board doesn't exists");
        else if(board.isPrivate()&&getPrincipal()==null){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            throw new RuntimeException("Can't access the board");
        }
        else if(!board.isPrivate()){
            board = setLists(board);
            return board;
        }
        else {
            UserPrincipal userPrincipal = getPrincipal();
            if (userPrincipal != null) {
                UserBoard userBoard = userBoardRepo.findByBoardIdAndUserId(id, userPrincipal.getId());
                if (userBoard != null) {
                    Board b =boardRepo.findById(userBoard.getBoardId());
                    b=setLists(b);
                    return b;
                }
                else {
                    throw new RuntimeException("Error 404, board not found.");
                }
            }else{
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                throw new RuntimeException("Can't access the board");
            }
        }
    }

    @PostMapping("/board")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    void createBoard(String name, boolean isPrivate){
        Board board = new Board(name,isPrivate);
        boardRepo.save(board);
        UserPrincipal principal = getPrincipal();
        UserBoard userBoard = new UserBoard(principal.getId(), board.getId(), true);
        userBoardRepo.save(userBoard);
    }

    @PutMapping("/boardName")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    void renameBoard(int id, String name){
        Board board = boardRepo.findById(id);
        if(board==null)throw new RuntimeException("Board 404");
        UserPrincipal userPrincipal = getPrincipal();
        UserBoard userBoard = userBoardRepo.findByBoardIdAndUserId(id, userPrincipal.getId());
        if (userBoard != null&&userBoard.isAdmin()) {
            board.setName(name);
            boardRepo.save(board);
        }else{
            throw new RuntimeException("No admin access to the board");
        }
    }

    @DeleteMapping("/board")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    void deleteBoard(int id){
        UserPrincipal userPrincipal = getPrincipal();
        UserBoard userBoard = userBoardRepo.findByBoardIdAndUserId(id, userPrincipal.getId());
        if (userBoard != null&&userBoard.isAdmin()){
            Board board = boardRepo.findById(userBoard.getBoardId());
            if(!board.isArchived())throw new RuntimeException("Can't delete a non-archived board");
            userBoardRepo.deleteAllByBoardId(id);
            List<com.foxtrot3.trello.database.list.List>lists = listRepo.findAllByBoardId(id);
            for(com.foxtrot3.trello.database.list.List list:lists){
                List<Card>cardList = cardRepo.findAllByListId(list.getId());
                for(Card card:cardList){
                    userCardRepo.deleteAllByCardId(card.getId());
                }
                cardRepo.deleteAllByListId(list.getId());
            }
            listRepo.deleteAllByBoardId(id);
            boardRepo.delete(board);
        }
        else {
            throw new RuntimeException("Error 404, board not found.");
        }
    }

    @PostMapping("/list")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    void createList(@RequestBody ListForm listForm){
        if(boardRepo.findById(listForm.getBoardId())==null)throw new RuntimeException("Board 404");
        int listCount = listRepo.findAllByBoardId(listForm.getBoardId()).size();
        com.foxtrot3.trello.database.list.List list = new com.foxtrot3.trello.database.list.List(listForm.getName(), listCount+1, listForm.getBoardId());
        list = setCards(list);
        listRepo.save(list);
    }

    com.foxtrot3.trello.database.list.List setCards(com.foxtrot3.trello.database.list.List list){
        List<Card>listCards = cardRepo.findAllByListId(list.getId());
        list.setCards(listCards);
        return list;
    }

    Board setLists(Board board){
        List<com.foxtrot3.trello.database.list.List>boardLists = listRepo.findAllByBoardId(board.getId());
        for(com.foxtrot3.trello.database.list.List list:boardLists){
            list=setCards(list);
        }
        board.setLists(boardLists);
        return board;
    }

    @PutMapping("/listName")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    void renameList(int id, String name){
        com.foxtrot3.trello.database.list.List list = listRepo.findById(id);
        if(list==null)throw new RuntimeException("List 404");
        UserPrincipal userPrincipal = getPrincipal();
        UserBoard userBoard = userBoardRepo.findByBoardIdAndUserId(list.getBoardId(), userPrincipal.getId());
        if (userBoard != null&&userBoard.isAdmin()) {
            list.setName(name);
            listRepo.save(list);
        }else{
            throw new RuntimeException("No admin access to the board");
        }
    }


    @PostMapping("/card")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    void createCard(@RequestBody CardForm cardForm){
        if(listRepo.findById(cardForm.getListId())==null)throw new RuntimeException("List 404");
        int cardCount = cardRepo.findAllByListId(cardForm.getListId()).size();
        Card card = new Card(cardForm.getName(), cardCount+1, cardForm.getListId());
        cardRepo.save(card);
    }


    public UserPrincipal getPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal)
            return (((UserPrincipal) principal));
        else
            return null;

    }

}
