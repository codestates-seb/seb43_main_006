package com.codestates.julsinsa.image.entity;

import com.codestates.julsinsa.audit.Auditable;
import com.codestates.julsinsa.item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class ItemImage extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ITEM_IMAGE_ID")
    private Long id;

    @Embedded
    private ImageInfo imageInfo;

    @ManyToOne
    @JoinColumn(name = "ITEM_ID")
    private Item item;

}
