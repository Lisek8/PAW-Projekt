package com.foxtrot3.trello.database.card;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.foxtrot3.trello.database.label.Label;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="cards")
public class Card {
    @Transient
    private final SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String description;
    private int position;
    @Column(name="is_archived")
    private boolean isArchived = false;
    @Column(columnDefinition = "DATE")
    private Date deadline;
    @Column(columnDefinition = "DATE", name="create_date")
    private Date createDate;
    @Column(name="list_id")
    private int listId;
    @JsonInclude()
    @Transient
    private java.util.List<Label> labels;
    public Card() {
    }

    public Card(String name, int position, int listId){
        this.name=name;
        this.position=position;
        this.listId = listId;
        createDate = new Date();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int labelId) {
        this.listId = labelId;
    }

    public List<Label> getLabels() {
        return labels;
    }

    public void setLabels(List<Label> labels) {
        this.labels = labels;
    }
}
