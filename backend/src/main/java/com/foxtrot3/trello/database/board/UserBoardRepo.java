package com.foxtrot3.trello.database.board;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBoardRepo extends JpaRepository<UserBoard,Integer> {
    UserBoard findById(int id);
}
