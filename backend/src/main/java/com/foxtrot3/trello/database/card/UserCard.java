package com.foxtrot3.trello.database.card;

import javax.persistence.*;

@Entity
@Table(name="user_cards")
public class UserCard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "card_id")
    private int cardId;

    public UserCard() {
    }

    public UserCard(int userId, int cardId) {
        this.userId = userId;
        this.cardId = cardId;
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

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }
}
