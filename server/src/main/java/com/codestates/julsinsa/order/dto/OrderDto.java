package com.codestates.julsinsa.order.dto;

import com.codestates.julsinsa.item.entity.Item;
import com.codestates.julsinsa.order.entity.ItemOrder;
import com.codestates.julsinsa.order.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


public class OrderDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{

        private Long orderId;
        private String name;
        private String phone;
        private Order.OrderStatus orderStatus;

        private int totalQuantity;

        private List<ItemOrderDto.Response> itemOrders;

        private LocalDate createdAt;

        private boolean isChecked = false; // 프론트에서 체크박스 여부 확인한다고 만들어 달라함

        // 아이템리스트에서 갯수들을 가져와서 더함
        public int getTotalQuantity() {
            int totalQuantity = 0;
            for (ItemOrderDto.Response itemOrder : itemOrders) {
                totalQuantity += itemOrder.getQuantity();
            }
            return totalQuantity;
        }
    }
}
