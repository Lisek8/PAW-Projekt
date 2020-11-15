package com.foxtrot3.trello.security;

public enum Roles {
    ADMIN("ADMIN"),
    USER("USER");

    private final String role;

    Roles(String role) {
        this.role=role;
    }
}
