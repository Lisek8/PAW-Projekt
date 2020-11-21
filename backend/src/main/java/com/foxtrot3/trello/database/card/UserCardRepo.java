package com.foxtrot3.trello.database.card;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface UserCardRepo extends JpaRepository<UserCard, Integer> {
    UserCard findById(int id);
    @Transactional void deleteAllByCardId(int cardId);
}
