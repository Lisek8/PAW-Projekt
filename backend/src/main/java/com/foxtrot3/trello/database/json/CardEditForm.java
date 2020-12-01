package com.foxtrot3.trello.database.json;

import java.util.Date;

public class CardEditForm {
    private String name;
    private String description;
    private boolean isArchived = false;
    private Date deadline;
    private int listId;

    public CardEditForm() {
    }

    public CardEditForm(String name, String description, boolean isArchived, Date deadline, int listId) {
        this.name = name;
        this.description = description;
        this.isArchived = isArchived;
        this.deadline = deadline;
        this.listId = listId;
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

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }
}
