package com.codestates.julsinsa.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
@RequiredArgsConstructor
public class UploadImageS3 {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    /**
     * s3에 업로드
     */

    // 업로드할 파일, 파일 경로, 파일 이름을 파라미터로 받아서 amazonS3 객체의 putObject 메소드를 사용하여 해당 파일을 S3 버킷에 업로드합니다.
    // 이때, withCannedAcl 메소드를 사용하여 업로드된 파일에 대한 접근 권한을 설정합니다. 위 코드에서는 PublicRead로 설정하여 누구나 업로드된 파일에 접근할 수 있도록 했습니다.
    //마지막으로 upload 메소드는 업로드된 파일의 경로와 이름을 문자열로 반환합니다.
    public String upload(File uploadFile, String filePath, String saveFileName) {
        String fileName = filePath + saveFileName;
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead)); // public 권한으로 설정

        return fileName;
    }
}