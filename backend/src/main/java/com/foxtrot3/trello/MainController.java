package com.foxtrot3.trello;

import com.foxtrot3.trello.database.HelloRepo;
import com.foxtrot3.trello.database.User;
import com.foxtrot3.trello.database.UserRepo;
import com.foxtrot3.trello.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;


@Controller
@SpringBootApplication
@RequestMapping("/rest-services")
public class MainController extends SpringBootServletInitializer {
    @Autowired
    HelloRepo helloRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;


    @GetMapping("/hello")
    @ResponseBody
    public String helloWorld(){
        return helloRepo.findAll().get(0).getHello();
    }

    @PostMapping("/register")
    void registerUser(String email, String password, String name){
        if(userRepo.findByEmail(email).isPresent()){
            throw new RuntimeException("User with that email already exists");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setName(name);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserType("USER");
        userRepo.save(user);
    }


}
