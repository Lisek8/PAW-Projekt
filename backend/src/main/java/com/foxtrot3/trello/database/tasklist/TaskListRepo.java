package com.foxtrot3.trello.database.tasklist;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.Entity;
import javax.persistence.Table;

public interface TaskListRepo extends JpaRepository<TaskList, Integer> {
    TaskList findById(int id);
}
