package com.foxtrot3.trello.database.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    User findById(int id);
}
