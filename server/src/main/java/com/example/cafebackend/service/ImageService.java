package com.example.cafebackend.service;

import com.example.cafebackend.entity.Image;
import com.example.cafebackend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Optional<Image> findImageById(Long id) {
        return imageRepository.findImageById(id);
    }
}
