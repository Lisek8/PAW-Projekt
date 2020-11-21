package com.foxtrot3.trello.database.card;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CardRepo extends JpaRepository<Card, Integer> {
    Card findById(int id);
    List<Card> findAllByListId(int listId);
    @Transactional void deleteAllByListId(int listId);
}
