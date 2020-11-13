package com.foxtrot3.trello.database.list;

import com.foxtrot3.trello.database.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListRepo extends JpaRepository<List,Integer> {
    List findById(int id);

}
