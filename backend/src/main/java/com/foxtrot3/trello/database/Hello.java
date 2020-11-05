package com.foxtrot3.trello.database;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
public class Hello {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;
    private String helloString;

    public String getHello() {
        return helloString;
    }

    public void setHello(String hello) {
        this.helloString = hello;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
