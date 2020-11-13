package com.foxtrot3.trello.database.board;

import com.foxtrot3.trello.database.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepo extends JpaRepository<Board,Integer> {
    Board findById(int id);
}
