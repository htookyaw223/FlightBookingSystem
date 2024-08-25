package com.hkdev.flightfinder.constants;

public enum UserRole {
    ADMIN("ADMIN"), TEACHER("TEACHER");

    private final String type;

    UserRole(String string) {
        type = string;
    }

    @Override
    public String toString() {
        return type;
    }
}
