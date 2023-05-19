package com.codestates.julsinsa.item.entity;

import com.codestates.julsinsa.item.entity.Item;
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

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isChecked; // 프론트에서 체크박스 여부 확인한다고 만들어 달라함

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
