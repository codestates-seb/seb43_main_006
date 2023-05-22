package com.codestates.julsinsa.order.dto;

import com.codestates.julsinsa.order.entity.ItemOrder;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderPostDto {
    @NotEmpty
    private List<ItemOrderDto.Post> itemOrders;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickupDate;
}
