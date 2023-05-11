package com.example.cafebackend.dto;

import com.example.cafebackend.entity.DishOrder;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * A DTO for the {@link com.example.cafebackend.entity.Order} entity
 */
@Data
@Builder
public class CompletedOrderDto implements Serializable {
    private final String address;

    List<DishOrder> dishOrderList;
    private final LocalDateTime orderDateTime;

    private final int total;
}
