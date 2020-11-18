package com.foxtrot3.trello.database.list;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.foxtrot3.trello.database.card.Card;

import javax.persistence.*;

@Entity
@Table(name="lists")
public class List {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private int position;
    @Column(name="is_archived")
    private boolean isArchived = false;
    @Column(name="board_id")
    private int boardId;
    @JsonInclude()
    @Transient
    private java.util.List<Card> cards;
    public List() {
    }

    public List(String name, int position, int boardId) {
        this.name = name;
        this.position = position;
        this.boardId = boardId;
    }

    public java.util.List<Card> getCards() {
        return cards;
    }

    public void setCards(java.util.List<Card> cards) {
        this.cards = cards;
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

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }
}
