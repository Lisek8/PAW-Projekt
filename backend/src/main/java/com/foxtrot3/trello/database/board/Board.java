package com.foxtrot3.trello.database.board;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.foxtrot3.trello.database.label.Label;
import com.foxtrot3.trello.database.list.List;

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
    @Column(name="is_archived")
    private boolean isArchived = false;
    @JsonInclude()
    @Transient
    private java.util.List<List> lists;
    @JsonInclude()
    @Transient
    private java.util.List<Label> labels;

    public java.util.List<List> getLists() {
        return lists;
    }

    public void setLists(java.util.List<List> lists) {
        this.lists = lists;
    }

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

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public java.util.List<Label> getLabels() {
        return labels;
    }

    public void setLabels(java.util.List<Label> labels) {
        this.labels = labels;
    }
}
