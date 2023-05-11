package com.example.cafebackend.repository;

import com.example.cafebackend.entity.Dish;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
    boolean existsByTitle(String title);

    Optional<Dish> findByTitle(String title);

    @Transactional
    @Modifying
    @Query("delete from Dish d where d.id = ?1")
    void deleteDishById(Long id);

    Optional<Dish> findDishById(Long id);


    @Override
    List<Dish> findAll(Sort sort);

    @Query("select d from Dish d where d.category = ?1")
    List<Dish> findDishesByCategory(String category, Sort sort);


}