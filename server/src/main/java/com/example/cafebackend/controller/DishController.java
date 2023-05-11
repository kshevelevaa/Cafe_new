package com.example.cafebackend.controller;

import com.example.cafebackend.service.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/dishes")
public class DishController {

    @Autowired
    private DishService dishService;

    @GetMapping
    public ResponseEntity<?> showAllDishes(@RequestParam(name = "sort") Optional<String> sort, @RequestParam(name = "filter") Optional<String> filter) {
        if (filter.isPresent()) {
            return sort.map(s -> ResponseEntity.ok(dishService.findDishesByCategory(filter.get(), Sort.by(s)))).orElseGet(() -> ResponseEntity.ok(dishService.findDishesByCategory(filter.get(), Sort.by("title"))));
        } else {
            return sort.map(s -> ResponseEntity.ok(dishService.findAll(Sort.by(s)))).orElseGet(() -> ResponseEntity.ok(dishService.findAll(Sort.by("title"))));
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createDish(@RequestParam(value = "file", required = false) MultipartFile multipartFile, @RequestParam(value = "dish", required = false) String newDish) throws IOException {
        return dishService.createDish(multipartFile, newDish);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDish(@RequestParam(value = "file", required = false) MultipartFile multipartFile, @RequestParam(value = "dish", required = false) String existingDish, @PathVariable Long id) throws IOException {
        return dishService.updateDish(multipartFile, existingDish, id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDish(@PathVariable Long id) {
        dishService.deleteDishById(id);
        return ResponseEntity.ok().build();
    }
}
