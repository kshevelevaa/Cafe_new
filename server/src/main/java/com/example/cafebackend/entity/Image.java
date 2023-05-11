package com.example.cafebackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Table(name = "image", schema = "jpa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "original_file_name")
    private String originalFileName;


    @Column(name = "size")
    private Long size;


    @Column(name = "media_type")
    private String mediaType;

    @Lob
    @JsonIgnore
    private byte[] bytes;

}
