package com.foxtrot3.trello;

import com.foxtrot3.trello.database.HelloRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@SpringBootApplication
@RequestMapping("/rest-services")
public class MainController extends SpringBootServletInitializer {
    @Autowired
    HelloRepo helloRepo;

    @GetMapping("/hello")
    @ResponseBody
    public String helloWorld(){
        return helloRepo.findAll().get(0).getHello();
    }
}
