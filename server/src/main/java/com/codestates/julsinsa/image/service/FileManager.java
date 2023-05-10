package com.codestates.julsinsa.image.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Component
public class FileManager {
    // MultipartFile 을 file로 변형 후 로컬로 저장,  저장된 파일 객체를 Optional로 감싸서 반환
    public Optional<File> convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());    // MultipartFile 객체로부터 파일 이름을 얻어 새로운 File 객체를 생성
        if(convertFile.createNewFile()) { // 중복되는 파일이 존재하지 않을 때 아래 코드를 실행
            try(FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        // 파일 이름이 중복되는 경우 새로운 파일이 생성되지 않고 Optional.empty()를 반환
        return Optional.empty();
    }
}