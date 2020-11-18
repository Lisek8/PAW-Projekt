package com.foxtrot3.trello.database.hello;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HelloRepo extends JpaRepository<Hello,Integer> {
}

