package com.codestates.julsinsa.market.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Market {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long marketId;

    private double lat;
    private double lng;
    private boolean choice;
    private String name;
    private String phone;
    private String address;
    private String workTime;
    private String comment;
}
