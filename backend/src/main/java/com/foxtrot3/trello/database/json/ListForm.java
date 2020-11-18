package com.foxtrot3.trello.database.json;

public class ListForm {
    private String name;
    private int boardId;

    public ListForm(String name, int boardId) {
        this.name = name;
        this.boardId = boardId;
    }

    public ListForm() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }
}
