package com.foxtrot3.trello.database.tasklist;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface TaskRepo extends JpaRepository<Task, Integer> {
    Task findById(int id);
    @Transactional
    void deleteTaskById(int id);
    @Transactional
    void deleteAllByTaskListId(int taskListId);
    List<Task> findAllByTaskListId(int taskListId);
    List<Task> findAllByTaskListIdAndAndDone(int taskListId, boolean Done);

}
