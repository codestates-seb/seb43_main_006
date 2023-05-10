package com.codestates.julsinsa.market.entitiy;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "markets")
@Getter
@Setter
@NoArgsConstructor
public class Market {

    @Id
    @GeneratedValue
    @Column(name = "market_id")
    private Long marketId;
    private String name;
    private String phone;
    private String address;
    private String workTime;
    private String comment;
}
