package com.foxtrot3.trello.database.comments;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
    Comment findById(int id);
}
