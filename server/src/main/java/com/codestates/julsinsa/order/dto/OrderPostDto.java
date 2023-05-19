package com.codestates.julsinsa.order.dto;

import com.codestates.julsinsa.order.entity.ItemOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderPostDto {
    private List<ItemOrder> orderList;
}
