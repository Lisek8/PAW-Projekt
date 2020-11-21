package com.foxtrot3.trello.database.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBoardRepo extends JpaRepository<UserBoard,Integer> {
    UserBoard findById(int id);
    List<UserBoard> findAllByUserId(int userId);
    List<UserBoard> findAllByBoardId(int boardId);
    UserBoard findByBoardIdAndUserId(int boardId, int userId);

}
