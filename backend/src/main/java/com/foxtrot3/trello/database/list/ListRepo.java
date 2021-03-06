package com.foxtrot3.trello.database.list;

import com.foxtrot3.trello.database.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface ListRepo extends JpaRepository<List,Integer> {
    List findById(int id);
    java.util.List<List> findAllByBoardId(int boardId);
    @Transactional void deleteAllByBoardId(int boardId);
}
