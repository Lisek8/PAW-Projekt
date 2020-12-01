package com.foxtrot3.trello.database.label;

import com.foxtrot3.trello.database.comments.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;


public interface LabelRepo extends JpaRepository<Label, Integer> {
    Label findById(int id);
    List<Label> findAllByBoardId(int boardId);
    @Transactional
    void deleteAllByBoardId(int boardId);
}
