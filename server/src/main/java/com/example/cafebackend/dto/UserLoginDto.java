package com.example.cafebackend.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.example.cafebackend.entity.User} entity
 */
@Data
public class UserLoginDto implements Serializable {

    private final String username;

    private final String password;
}