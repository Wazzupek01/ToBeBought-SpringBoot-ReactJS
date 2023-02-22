package com.pedrycz.tobebought.model.item;

import com.pedrycz.tobebought.entities.Item;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-17T11:19:20+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 19.0.1 (N/A)"
)
public class ItemItemDataDTOMapperImpl implements ItemItemDataDTOMapper {

    @Override
    public ItemDataDTO itemToItemDataDTO(Item item) {
        if ( item == null ) {
            return null;
        }

        ItemDataDTO itemDataDTO = new ItemDataDTO();

        itemDataDTO.setId( item.getId() );
        itemDataDTO.setName( item.getName() );
        itemDataDTO.setQuantity( item.getQuantity() );
        itemDataDTO.setUnit( item.getUnit() );
        itemDataDTO.setChecked( item.isChecked() );

        return itemDataDTO;
    }
}