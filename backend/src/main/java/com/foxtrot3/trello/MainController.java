package com.foxtrot3.trello;

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

    @GetMapping("/boards")
    List<Board> getBoards(){
        List<Board> boards = boardRepo.findAll();
        for(Board board:boards){
            board = setLists(board);
        }
        return boards;
    }



    @GetMapping("/board")
    Board getBoard(int id){
        Board board = boardRepo.findById(id);
        if(board==null){
            throw new RuntimeException("Error 404, board not found.");
        }else {
            return setLists(board);
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
            throw new RuntimeException("Wrong user type");

    }

}
