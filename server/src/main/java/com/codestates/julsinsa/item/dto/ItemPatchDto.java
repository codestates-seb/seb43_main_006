package com.codestates.julsinsa.item.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;


public class ItemPatchDto {

    @Getter
    @Setter
    public static class ItemPatch {
        private Long id;

        @NotBlank(message = "상품명은 공백이 아니어야 합니다.")
        private String korName;

        @Pattern(regexp = "^([A-Za-z])(\\s?[A-Za-z])*$",
                message = "상품명(영문)은 영문이어야 합니다. 예) JAMESON")
        private String engName;

        @Range(min = 100, max = 50000000)
        private Integer price;


        private int quantity;
    }
}
