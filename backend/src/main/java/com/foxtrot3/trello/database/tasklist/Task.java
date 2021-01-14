package com.foxtrot3.trello.database.tasklist;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    @Column(columnDefinition = "DATE", name="create_time")
    private Date deadline;
    private int position;
    @Column(name="is_done")
    private boolean isDone;
    @Column(name = "task_list_id")
    private int taskListId;


    public Task() {
    }

    public Task(String name, int taskListId) {
        this.name = name;
        this.taskListId = taskListId;
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

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date createTime) {
        this.deadline = createTime;
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

    public int getTaskListId() {
        return taskListId;
    }

    public void setTaskListId(int taskListId) {
        this.taskListId = taskListId;
    }
}
