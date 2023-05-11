package com.example.cafebackend.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class OrderCartDro implements Serializable {

    private final int total;

    private final int dishesCount;
}
