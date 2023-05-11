package com.example.cafebackend.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Builder
@Table(name = "dishes", schema = "jpa")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotBlank(message = "Поле не должно быть пустым")
    @Size(min = 3, message = "Название блюда не может быть короче трёх символов")
    @Column(name = "title")
    private String title;

    @NotBlank(message = "Поле не должно быть пустым")
    @Column(name = "category")
    private String category;

    @OneToOne(targetEntity = Image.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;


    @Min(value = 2, message = "Минимальная стоимость блюда 2$")
    @Column(name = "price")
    private int price;

    @NotBlank(message = "Описание не должно быть пустым")
    @Column(name = "description")
    private String description;


}
