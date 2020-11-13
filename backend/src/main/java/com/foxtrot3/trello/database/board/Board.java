package com.foxtrot3.trello.database.board;

import javax.persistence.*;

@Entity
@Table(name="boards")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String description;
    @Column(name="is_private")
    private boolean isPrivate;
    private String link;



    public Board() {
    }

   public Board(String name, boolean isPrivate) {
        this.name=name;
        this.isPrivate=isPrivate;
        this.description="";

    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String password) {
        this.description = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String userType) {
        this.link = userType;
    }


}
