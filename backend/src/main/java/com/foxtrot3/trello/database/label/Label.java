package com.foxtrot3.trello.database.label;

import javax.persistence.*;

@Entity
@Table(name="labels")
public class Label {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String color;
    @Column(name="board_id")
    private int boardId;

    public Label() {
    }

    public Label(String name, String color, int boardId) {
        this.name = name;
        this.color = color;
        this.boardId = boardId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }
}
