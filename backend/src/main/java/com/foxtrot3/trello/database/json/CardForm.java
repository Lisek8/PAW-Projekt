package com.foxtrot3.trello.database.json;

public class CardForm {
    private String name;
    private int listId;

    public CardForm(String name, int listId) {
        this.name = name;
        this.listId = listId;
    }

    public CardForm() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }
}
