package com.foxtrot3.Trello;

import com.foxtrot3.Trello.Database.HelloRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/rest-services")
public class MainController {
    @Autowired
    HelloRepo helloRepo;

    @GetMapping("/hello")
    String helloWorld(){
        return helloRepo.findAll().get(0).getHello();
    }
}
