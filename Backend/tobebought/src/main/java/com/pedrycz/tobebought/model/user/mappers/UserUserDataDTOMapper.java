package com.pedrycz.tobebought.model.user.mappers;

import com.pedrycz.tobebought.entities.User;
import com.pedrycz.tobebought.model.user.UserDataDTO;
import org.mapstruct.Mapper;

@Mapper
public interface UserUserDataDTOMapper {

    UserDataDTO userToUserDataDTO(User user);
}
