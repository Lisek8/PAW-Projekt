package com.foxtrot3.trello.database.board;

import javax.persistence.*;

@Entity
@Table(name="user_boards")
public class UserBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="user_id")
    private int userId;
    @Column(name="board_id")
    private int boardId;
    @Column(name="is_admin")
    private boolean isAdmin;
    @Column(name="is_favorite")
    private boolean isFavorite;
    @Column(name="is_invited")
    private boolean isInvited;

    public UserBoard() {
    }

    public UserBoard(int userId, int boardId, boolean isAdmin) {
        this.userId = userId;
        this.boardId = boardId;
        this.isAdmin=isAdmin;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBoardId() {
        return boardId;
    }

    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }

    public boolean isInvited() {
        return isInvited;
    }

    public void setInvited(boolean invited) {
        isInvited = invited;
    }
}
