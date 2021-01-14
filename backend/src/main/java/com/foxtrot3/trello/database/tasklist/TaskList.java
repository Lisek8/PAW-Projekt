package com.foxtrot3.trello.database.tasklist;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="task_list")
public class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    @Column(name = "card_id")
    private int cardId;
    private int completed;


    public TaskList() {
    }
    public TaskList(String name, int cardId) {
        this.name=name;
        this.cardId=cardId;
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

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }
}
