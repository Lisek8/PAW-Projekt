package com.foxtrot3.trello.database.label;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CardLabelRepo extends JpaRepository<CardLabel, Integer> {
    CardLabel findById(int id);
    CardLabel findByLabelIdAndCardId(int labelId, int cardId);
    @Transactional
    void deleteAllByLabelId(int labelId);
}
