package com.example.cafebackend.repository;

import com.example.cafebackend.entity.Order;
import com.example.cafebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select o from Order o where o.user = ?1 order by o.id DESC")
    List<Order> findAllByUserOrderByIdDesc(User user);


}