package com.example.cafebackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Table(name = "dishes_orders", schema = "jpa")
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@NoArgsConstructor
@AllArgsConstructor
public class DishOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne(targetEntity = Dish.class, fetch = FetchType.LAZY, orphanRemoval = false)
    private Dish dish;

    @OneToOne(targetEntity = Order.class, fetch = FetchType.LAZY, orphanRemoval = false)
    private Order order;

    @Column(name = "count")
    private int count;
}
