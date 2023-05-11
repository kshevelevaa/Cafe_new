package com.example.cafebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A DTO for the {@link com.example.cafebackend.entity.Dish} entity
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DishCreateDto implements Serializable {

    @NotBlank(message = "Поле не должно быть пустым")
    @Size(min = 3, message = "Название блюда не может быть короче трёх символов")
    private String title;

    @NotBlank(message = "Поле не должно быть пустым")
    private String category;

    @NotNull(message = "Поле не должно быть пустым")
    @Min(value = 5, message = "Минимальная стоимость блюда 5$")
    private int price;

    @NotBlank(message = "Описание не должно быть пустым")
    private String description;
}
