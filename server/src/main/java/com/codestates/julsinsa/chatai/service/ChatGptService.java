package com.codestates.julsinsa.chatai.service;

import com.codestates.julsinsa.chatai.config.ChatGptConfig;
import com.codestates.julsinsa.chatai.dto.ChatGptRequestDto;
import com.codestates.julsinsa.chatai.dto.ChatGptResponseDto;
import com.codestates.julsinsa.chatai.dto.QuestionRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGptService {

    @Value("${api.key}")
    public String API_KEY;
    private static RestTemplate restTemplate = new RestTemplate();

    //  HttpEntity를 생성하여 ChatGptConfig 클래스에 정의된 media type, authorization, api key 정보를 설정
    public HttpEntity<ChatGptRequestDto> buildHttpEntity(ChatGptRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(ChatGptConfig.MEDIA_TYPE));
        headers.add(ChatGptConfig.AUTHORIZATION, ChatGptConfig.BEARER + API_KEY);
        return new HttpEntity<>(requestDto, headers);
    }

    //  postForEntity 메소드를 이용하여 GPT-3 API와 통신을 하고, 반환되는 결과를 ChatGptResponseDto 객체로 받아옴
    public ChatGptResponseDto getResponse(HttpEntity<ChatGptRequestDto> chatGptRequestDtoHttpEntity) {
        ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(
                ChatGptConfig.URL,
                chatGptRequestDtoHttpEntity,
                ChatGptResponseDto.class);

        return responseEntity.getBody();
    }

    // 사용자의 질문을 받아와 ChatGptRequestDto 객체를 생성하고, 이를 HttpEntity로 묶어 getResponse 메소드를 호출하여 GPT-3 API에 질문을 전송하고, 답변을 반환.
    // 이때, 사용되는 파라미터들은 ChatGptConfig 클래스에 미리 정의

    //비동기로 구현할라니까 응답이안오네 ㅋㅋ
    public ChatGptResponseDto askQuestion(QuestionRequestDto requestDto) {
        return this.getResponse(
                this.buildHttpEntity(
                        new ChatGptRequestDto(
                                ChatGptConfig.MODEL,
                                requestDto.getQuestion(),
                                ChatGptConfig.MAX_TOKEN,
                                ChatGptConfig.TEMPERATURE,
                                ChatGptConfig.TOP_P
                        )
                )
        );
    }
}