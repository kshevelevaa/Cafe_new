package com.example.cafebackend.service;

import com.example.cafebackend.dto.DishCreateDto;
import com.example.cafebackend.entity.Dish;
import com.example.cafebackend.entity.Image;
import com.example.cafebackend.repository.DishRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Validator;
import java.io.IOException;
import java.util.List;

@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private Validator validator;

    public boolean existsByTitle(String title) {
        return dishRepository.existsByTitle(title);
    }

    public Dish findByTitle(String title) {
        return dishRepository.findByTitle(title).orElse(null);
    }

    public List<Dish> findDishesByCategory(String category, Sort sort) {
        return dishRepository.findDishesByCategory(category, sort);
    }

    public void deleteDishById(Long id) {
        dishRepository.deleteDishById(id);
    }

    public Dish findDishById(Long id) {
        return dishRepository.findDishById(id).orElse(null);
    }

    public Dish save(Dish dish) {
        return dishRepository.save(dish);
    }

    public List<Dish> findAll(Sort sort) {
        return dishRepository.findAll(sort);
    }

    public Dish mapToDishCreateDto(DishCreateDto dishCreateDto) {
        return Dish.builder()
                .title(dishCreateDto.getTitle())
                .category(dishCreateDto.getCategory())
                .price(dishCreateDto.getPrice())
                .description(dishCreateDto.getDescription())
                .build();
    }


    public BindingResult validateDish(DishCreateDto dishCreateDto) {
        SpringValidatorAdapter springValidator = new SpringValidatorAdapter(validator);
        BindingResult bindingResult = new BeanPropertyBindingResult(dishCreateDto, "dishCreateDtoResult");
        springValidator.validate(dishCreateDto, bindingResult);

        return bindingResult;
    }

    public ResponseEntity<?> addImageToDish(MultipartFile multipartFile, Dish dish) throws IOException {
        if (multipartFile != null) {
            Image image = Image.builder()
                    .originalFileName(multipartFile.getOriginalFilename())
                    .mediaType(multipartFile.getContentType())
                    .size(multipartFile.getSize())
                    .bytes(multipartFile.getBytes()).build();
            dish.setImage(image);
        }
        return new ResponseEntity<>(save(dish), HttpStatus.OK);
    }

    public ResponseEntity<?> createDish(MultipartFile multipartFile, String newDish) throws IOException {
        DishCreateDto dishCreateDto = new ObjectMapper().readValue(newDish, DishCreateDto.class);
        BindingResult bindingResult = validateDish(dishCreateDto);
        if (existsByTitle(dishCreateDto.getTitle())) {
            bindingResult.addError(new FieldError("dish", "title", "Блюдо с таким названием уже существует"));
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.CONFLICT);
        }
        Dish dish = mapToDishCreateDto(dishCreateDto);
        return addImageToDish(multipartFile, dish);
    }

    public ResponseEntity<?> updateDish(MultipartFile multipartFile, String existingDish, Long id) throws IOException {
        DishCreateDto dishCreateDto = new ObjectMapper().readValue(existingDish, DishCreateDto.class);
        BindingResult bindingResult = validateDish(dishCreateDto);
        Dish oldDish = findDishById(id);
        if (existsByTitle(dishCreateDto.getTitle()) && (!oldDish.getTitle().equals(dishCreateDto.getTitle()))) {
            bindingResult.addError(new FieldError("dish", "title", "Блюдо с таким названием уже существует"));
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.CONFLICT);
        }
        Dish dish = findDishById(id);
        dish.setTitle(dishCreateDto.getTitle());
        dish.setPrice(dishCreateDto.getPrice());
        dish.setDescription(dishCreateDto.getDescription());
        return addImageToDish(multipartFile, dish);
    }

}
