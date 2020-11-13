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
    @Column(columnDefinition = "DATE", name="create_time")
    private Date createTime;
    private int position;
    @Column(name="is_done")
    private boolean isDone;
    @Column(name = "card_id")
    private int cardId;


    public TaskList() {
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }
}
