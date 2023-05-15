package com.codestates.julsinsa.cart.repository;

import com.codestates.julsinsa.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
}
