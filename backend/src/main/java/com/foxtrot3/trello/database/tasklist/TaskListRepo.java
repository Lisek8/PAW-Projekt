package com.foxtrot3.trello.database.tasklist;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface TaskListRepo extends JpaRepository<TaskList, Integer> {
    TaskList findById(int id);
    @Transactional
    void deleteAllById(int id);
    @Transactional
    void deleteAllByCardId(int id);
    List<TaskList>findAllByCardId(int id);
}
