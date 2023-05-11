package com.example.cafebackend.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serial;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class DishOrderKey implements Serializable {
    @Serial
    private static final long serialVersionUID = 6465803568458008259L;
    @Column(name = "dish_id")
    Long dishId;

    @Column(name = "order_id")
    Long orderId;

}
