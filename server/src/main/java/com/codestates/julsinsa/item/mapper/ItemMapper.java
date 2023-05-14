package com.codestates.julsinsa.item.mapper;

import com.codestates.julsinsa.item.dto.ItemDto;
import com.codestates.julsinsa.item.dto.ItemPatchDto;
import com.codestates.julsinsa.item.entity.Item;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ItemMapper {

    ItemDto.Response itemToItemResponseDto(Item item);

//    List<ItemDto.Response> itemsToItemResponseDtos(List<Item> items);

    List<ItemDto.ItemsResponse> itemsToItemResponseDtos(List<Item> items);

    Item itemPostItem(ItemDto.Post itemPost);

    ItemPatchDto.ItemPatch itemToItemPatchDto(Item item);

    List<ItemDto.ItemsResponse> itemsToSearchItemResponseDtos(List<Item> items, String title);
}
