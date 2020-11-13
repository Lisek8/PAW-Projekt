package com.foxtrot3.trello.database.label;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LabelRepo extends JpaRepository<Label, Integer> {
    Label findById(int id);
}