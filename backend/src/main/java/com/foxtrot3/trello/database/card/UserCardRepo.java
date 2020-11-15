package com.foxtrot3.trello.database.card;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCardRepo extends JpaRepository<UserCard, Integer> {
    UserCard findById(int id);
}
