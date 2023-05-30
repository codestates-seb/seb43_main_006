package com.codestates.julsinsa.chatai.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
public class ChatGptResponseDto implements Serializable {


    private List<Choice> choices;

    @Builder
    public ChatGptResponseDto(List<Choice> choices) {
        this.choices = choices;
    }
}