package com.foxtrot3.Trello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/hello")
    String helloWorld(){
        return "Hello World!";
    }
}
