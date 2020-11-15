package com.foxtrot3.trello.database.activity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityHistoryRepo extends JpaRepository<ActivityHistory, Integer> {
    ActivityHistory findById(int id);
}
