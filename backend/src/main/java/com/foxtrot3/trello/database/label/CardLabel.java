package com.foxtrot3.trello.database.label;

import javax.persistence.*;

@Entity
@Table(name="card_labels")
public class CardLabel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name="card_id")
    private int cardId;
    @Column(name="label_id")
    private int labelId;

    public CardLabel() {
    }

    public CardLabel(int cardId, int labelId) {
        this.id = id;
        this.cardId = cardId;
        this.labelId = labelId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public int getLabelId() {
        return labelId;
    }

    public void setLabelId(int labelId) {
        this.labelId = labelId;
    }
}
