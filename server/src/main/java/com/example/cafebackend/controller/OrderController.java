package com.example.cafebackend.controller;

import com.example.cafebackend.dto.OrderDto;
import com.example.cafebackend.entity.DishOrder;
import com.example.cafebackend.entity.Order;
import com.example.cafebackend.service.DishOrderService;
import com.example.cafebackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private DishOrderService dishOrderService;

    @GetMapping
    ResponseEntity<?> getAllOrders(Authentication authentication) {
        return ResponseEntity.ok(orderService.findAllOrders(authentication));
    }

    @GetMapping("/active")
    public ResponseEntity<?> getLastActiveOrder(Authentication authentication) {
        Order order = orderService.findLastActiveOrder(authentication);
        return ResponseEntity.ok(dishOrderService.findDishOrderByOrder(order));
    }

    @GetMapping("/active/total")
    public ResponseEntity<?> getOrderTotal(Authentication authentication) {
        Order order = orderService.findLastActiveOrder(authentication);
        return ResponseEntity.ok(dishOrderService.getOrderTotal(order));
    }

    @PostMapping("/active/{dish_id}/change")
    public ResponseEntity<?> changeDishInOrder(Authentication authentication, @PathVariable(value = "dish_id") Long dishId, @RequestParam("plus") boolean plus) {
        if (plus) {
            return ResponseEntity.ok(dishOrderService.addDishToOrder(authentication, dishId));
        } else {
            DishOrder dishAfterRemove = dishOrderService.removeDishFromOrder(authentication, dishId);
            if (dishAfterRemove != null) {
                return ResponseEntity.ok(dishAfterRemove);
            } else return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping("/active/{dish_id}")
    public ResponseEntity<?> removeDishInOrder(Authentication authentication, @PathVariable(value = "dish_id") Long dishId) {
        dishOrderService.removeDishInOrder(authentication, dishId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/active/process")
    public ResponseEntity<?> processOrder(Authentication authentication, @Valid @RequestBody OrderDto orderDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.CONFLICT);
        }
        return orderService.processOrder(authentication, orderDto);
    }
}
