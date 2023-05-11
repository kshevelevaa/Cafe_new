package com.example.cafebackend.service;

import com.example.cafebackend.dto.CompletedOrderDto;
import com.example.cafebackend.dto.OrderDto;
import com.example.cafebackend.entity.Order;
import com.example.cafebackend.entity.User;
import com.example.cafebackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {


    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private DishOrderService dishOrderService;

    //    @Transactional(propagation = Propagation.REQUIRED)
    public Order save(Order order) {
        Order orderToSave = orderRepository.save(order);
        orderRepository.flush();
        return orderToSave;
    }

    public List<Order> findAllByUser(User user) {
        return orderRepository.findAllByUserOrderByIdDesc(user);
    }

    public List<CompletedOrderDto> findAllOrders(Authentication authentication) {
        User user = userService.getUserAuth(authentication);
        List<Order> completedOrders = findAllByUser(user).stream().filter(order -> order.getOrderDateTime() != null).toList();
        return completedOrders.stream().map(order -> CompletedOrderDto.builder()
                .address(order.getAddress())
                .orderDateTime(order.getOrderDateTime())
                .dishOrderList(dishOrderService.findDishOrderByOrder(order))
                .total(dishOrderService.findDishOrderByOrder(order).stream().mapToInt(dishOrder -> dishOrder.getDish().getPrice() * dishOrder.getCount()).sum())
                .build()
        ).toList();
    }


    @Transactional
    public Order findLastActiveOrder(Authentication authentication) {
        User user = userService.getUserAuth(authentication);
        List<Order> orders = findAllByUser(user);
        if (!orders.isEmpty()) {
            return orders.get(0);
        } else return null;
    }

    public ResponseEntity<?> processOrder(Authentication authentication, OrderDto orderDto) {
        Order order = findLastActiveOrder(authentication);
        if (dishOrderService.findDishOrderByOrder(order).isEmpty()) {
            return new ResponseEntity<>("Order has no dishes", HttpStatus.CONFLICT);
        }
        order.setAddress(orderDto.getAddress());
        order.setOrderDateTime(orderDto.getOrderDateTime());
        User user = userService.getUserAuth(authentication);
        Order newOrder = Order.builder().user(user).build();
        order = save(newOrder);
        return ResponseEntity.ok(save(order));
    }


}
