package com.foxtrot3.trello;

import com.foxtrot3.trello.database.board.Board;
import com.foxtrot3.trello.database.board.BoardRepo;
import com.foxtrot3.trello.database.board.UserBoard;
import com.foxtrot3.trello.database.board.UserBoardRepo;
import com.foxtrot3.trello.database.hello.HelloRepo;
import com.foxtrot3.trello.database.RegisterForm;
import com.foxtrot3.trello.database.list.ListRepo;
import com.foxtrot3.trello.database.user.User;
import com.foxtrot3.trello.database.user.UserRepo;
import com.foxtrot3.trello.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
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
import org.springframework.stereotype.Controller;
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
        return boardRepo.findAll();

    }

    @GetMapping("/board")
    Board getBoard(int id){
        Board board = boardRepo.findById(id);
        if(board==null){
            throw new RuntimeException("Error 404, board not found.");
        }else return board;
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
    void createList(String name, int boardId){
        if(boardRepo.findById(boardId)==null)throw new RuntimeException("Board 404");
        int listCount = listRepo.findAllByBoardId(boardId).size();
        com.foxtrot3.trello.database.list.List list = new com.foxtrot3.trello.database.list.List(name, listCount+1, boardId);
        listRepo.save(list);
    }

    public UserPrincipal getPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal)
            return (((UserPrincipal) principal));
        else
            throw new RuntimeException("Wrong user type");

    }

}
