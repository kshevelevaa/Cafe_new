package com.example.cafebackend.dto;

import com.example.cafebackend.entity.Role;
import com.example.cafebackend.entity.User;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Set;

/**
 * A DTO for the {@link User} entity
 */
@Data
@Builder
public class UserInfoDto implements Serializable {
    private final Long id;

    private final String username;

    private final String phone;
    private final Set<Role> roles;

    private final String email;
}