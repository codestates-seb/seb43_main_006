package com.codestates.julsinsa.order.entity;

import com.codestates.julsinsa.item.entity.Item;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class ItemOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long itemOrderId;

    @Column(nullable = false)
    public int quantity;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    public Order order;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    public Item item;
}
