package com.example.cafebackend.repository;

import com.example.cafebackend.entity.Dish;
import com.example.cafebackend.entity.DishOrder;
import com.example.cafebackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DishOrderRepository extends JpaRepository<DishOrder, Long> {
    List<DishOrder> findDishOrderByOrder(Order order);

    Optional<DishOrder> findDishOrderByDishAndOrder(Dish dish, Order order);

    void deleteById(Long id);

}