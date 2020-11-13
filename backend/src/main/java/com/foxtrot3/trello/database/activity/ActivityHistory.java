package com.foxtrot3.trello.database.activity;

import javax.persistence.*;

@Entity
@Table(name="activity_history")
public class ActivityHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String description;
    @Column(name="user_id")
    private int userId;

    public ActivityHistory() {
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

    public void setDescription(String description) {
        this.description = description;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
