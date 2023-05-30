package com.codestates.julsinsa.image.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Embeddable
public class ImageInfo {

    // DB에 저장될 파일의 이름
    @Column(nullable = false)
    private String imageName;

    // 원래 이미지 파일의 이름을 저장
    @Column(nullable = false)
    private String oriName;

    // 파일 저장 위치
    @Column(nullable = false)
    private String filePath;

    // JPA에서 엔티티에 매핑되지 않는 속성을 나타내는 애너테이션
    @Transient
    private final String baseUrl = "https://jusinsa-project.s3.ap-northeast-2.amazonaws.com/";
}