package com.codestates.julsinsa.image.service;


import com.codestates.julsinsa.global.exception.BusinessLogicException;
import com.codestates.julsinsa.global.exception.ExceptionCode;
import com.codestates.julsinsa.image.entity.ImageInfo;
import com.codestates.julsinsa.image.entity.ReviewImage;
import com.codestates.julsinsa.image.repository.ReviewImageRepository;
import com.codestates.julsinsa.review.entity.Review;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    private final FileManager fileManager;
    private final UploadImageS3 uploadImageS3;
    private final ReviewImageRepository reviewImageRepository;


    // uploadReviewImage 메소드는 리뷰에 대한 이미지를 업로드하기 위한 메소드이다.
    // MultipartFile로 전달받은 이미지를 파일명, 경로 등을 생성하여 AWS S3에 업로드하고, 업로드한 파일의 정보를 ReviewImage 객체에 담아 리턴
    public List<ReviewImage> uploadReviewImage(MultipartFile[] mfs, Review review){

        List<ReviewImage> reviewImages = new ArrayList<>();

        for (MultipartFile mf : mfs) {
            if (isSupportedFileType(mf)) {
                long time = System.currentTimeMillis();
                String originalFilename = mf.getOriginalFilename();
                String saveFileName = String.format("%d_%s", time, originalFilename.replaceAll(" ", ""));
                String filePath = "review/";

                String savedPath = createAndUploadFile(mf, saveFileName, filePath);
                log.info("Saved Path : " + savedPath);

                ReviewImage reviewImage = ReviewImage.builder().review(review)
                        .imageInfo(new ImageInfo(saveFileName, originalFilename, filePath))
                        .build();
                reviewImages.add(reviewImage);
            }
        }

        return reviewImages;
    }

    // 선택한 화장자 허용 확인
    private boolean isSupportedFileType(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (contentType.equals("image/gif") || contentType.equals("image/jpeg")
                || contentType.equals("image/jpg") || contentType.equals("image/svg") || contentType.equals("image/png"));
    }

//    // 임시 파일 생성 & 업데이트 & 임시 파일 삭제
//    // createAndUploadFile 메소드는 MultipartFile을 File 객체로 변환하고, S3에 업로드하기 위해 파일을 임시로 생성하여 S3로 업로드하고,
//    // 업로드한 파일의 경로를 리턴하는 메소드이다. 파일 생성, 업로드 후에는 생성한 파일을 삭제한다.
//    private String createAndUploadFile(MultipartFile mf, String saveFileName, String filePath) {
//        // 파일 생성
//        File uploadFile = null;
//        try {
//            Optional<File> uploadFileOpt = fileManager.convertMultipartFileToFile(mf);
//            if (uploadFileOpt.isEmpty()) {
//                throw new BusinessLogicException(ExceptionCode.IMAGE_NOT_CONVERTED);
//            }
//            uploadFile = uploadFileOpt.get();
//
//            // 파일 업로드
//            String saveFilePath = uploadImageS3.upload(uploadFile, filePath, saveFileName);
//
//            return File.separator + saveFilePath;
//
//        } catch (IOException e) {
//            e.printStackTrace();
//            throw new BusinessLogicException(ExceptionCode.IMAGE_NOT_UPLOADED);
//        } finally {
//            // 파일 삭제
//            if (uploadFile != null) {
//                uploadFile.delete();
//            }
//        }
//    }
    private String createAndUploadFile(MultipartFile mf, String saveFileName, String filePath) {
        try {
            byte[] fileData = mf.getBytes();

            // 파일 업로드
            String saveFilePath = uploadImageS3.upload(fileData, filePath, saveFileName);

            return File.separator + saveFilePath;

        } catch (IOException e) {
            e.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.IMAGE_NOT_UPLOADED);
        }
    }

}