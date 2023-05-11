package com.example.cafebackend.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * A DTO for the {@link com.example.cafebackend.entity.Order} entity
 */
@Data
public class OrderDto implements Serializable {


    @NotBlank(message = "Поле не может быть пустым")
    private final String address;


    private final LocalDateTime orderDateTime;
}
