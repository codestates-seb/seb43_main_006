package com.codestates.julsinsa.cart.entity;

import com.codestates.julsinsa.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    private int totalQuantity;

    private int totalPrice;

    @OneToOne(mappedBy = "cart",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Member member;
    @OneToMany(mappedBy = "cart" , cascade = CascadeType.ALL)
    private List<ItemCart> itemCarts = new ArrayList<>();
}
