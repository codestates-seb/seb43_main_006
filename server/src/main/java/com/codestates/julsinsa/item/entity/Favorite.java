package com.codestates.julsinsa.item.entity;

import com.codestates.julsinsa.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    // 관계 편의 메서드
    public void addMember(Member member){
        this.member = member;
        if(!member.getFavorites().contains(this)){
            member.getFavorites().add(this);
        }
    }

    public void addItem(Item item){
        this.item = item;
        if(!item.getFavorites().contains(this)){
            item.getFavorites().add(this);
        }
    }
}
