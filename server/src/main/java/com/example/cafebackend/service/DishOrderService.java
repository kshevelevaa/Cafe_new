package com.example.cafebackend.service;

import com.example.cafebackend.dto.OrderCartDro;
import com.example.cafebackend.entity.Dish;
import com.example.cafebackend.entity.DishOrder;
import com.example.cafebackend.entity.Order;
import com.example.cafebackend.repository.DishOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DishOrderService {
    @Autowired
    private DishOrderRepository dishOrderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private DishService dishService;

    public List<DishOrder> findDishOrderByOrder(Order order) {
        return dishOrderRepository.findDishOrderByOrder(order);
    }

    Optional<DishOrder> findDishOrderByDishAndOrder(Dish dish, Order order) {
        return dishOrderRepository.findDishOrderByDishAndOrder(dish, order);
    }

    public DishOrder save(DishOrder dishOrder) {
        return dishOrderRepository.save(dishOrder);
    }

    public void deleteById(Long id) {
        dishOrderRepository.deleteById(id);
    }


    public DishOrder addDishToOrder(Authentication authentication, Long dishId) {
        Order order = orderService.findLastActiveOrder(authentication);
        Dish dish = dishService.findDishById(dishId);
        DishOrder dishOrder = findDishOrderByDishAndOrder(dish, order).orElse(null);
        if (dishOrder != null) {
            dishOrder.setCount(dishOrder.getCount() + 1);
        } else {
            dishOrder = DishOrder.builder()
                    .dish(dish)
                    .order(order)
                    .count(1)
                    .build();
        }
        return save(dishOrder);
    }

    public DishOrder removeDishFromOrder(Authentication authentication, Long dishId) {
        Order order = orderService.findLastActiveOrder(authentication);
        Dish dish = dishService.findDishById(dishId);
        DishOrder dishOrder = findDishOrderByDishAndOrder(dish, order).orElse(null);
        assert dishOrder != null;
        if (dishOrder.getCount() > 1) {
            dishOrder.setCount(dishOrder.getCount() - 1);
            return save(dishOrder);
        } else {
            deleteById(dishOrder.getId());
            return null;
        }
    }

    public void removeDishInOrder(Authentication authentication, Long dishId) {
        Order order = orderService.findLastActiveOrder(authentication);
        Dish dish = dishService.findDishById(dishId);
        DishOrder dishOrder = findDishOrderByDishAndOrder(dish, order).orElse(null);
        assert dishOrder != null;
        deleteById(dishOrder.getId());
    }

    public OrderCartDro getOrderTotal(Order order) {
        return OrderCartDro.builder()
                .total(dishOrderRepository.findDishOrderByOrder(order).stream().mapToInt(dishOrder -> dishOrder.getDish().getPrice() * dishOrder.getCount()).sum())
                .dishesCount(dishOrderRepository.findDishOrderByOrder(order).stream().mapToInt(DishOrder::getCount).sum())
                .build();
    }
}
