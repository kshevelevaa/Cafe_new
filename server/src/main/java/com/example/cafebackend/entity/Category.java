package com.example.cafebackend.entity;


import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Category {
    DRINK, BREAKFAST, LUNCH, DINNER;

}