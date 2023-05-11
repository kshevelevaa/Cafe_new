package com.example.cafebackend.service;

import com.example.cafebackend.entity.Order;
import com.example.cafebackend.entity.Role;
import com.example.cafebackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;

@Service
@Transactional
public class AdminInitService implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OrderService orderService;

    @Override
    public void run(String... args) {
        if (!userService.existsByUsername("Admin")) {
            User user = User.builder()
                    .username("Admin")
                    .email("nikpuk637@gmail.com")
                    .phone("88888888")
                    .password(passwordEncoder.encode("adminpass"))
                    .roles(Set.of(Role.ROLE_ADMIN))
                    .build();
            User admin = userService.save(user);
            Order newOrder = Order.builder().user(admin).build();
            orderService.save(newOrder);
        }
    }
}