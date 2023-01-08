package com.pedrycz.tobebought.model.user_mappers;

import com.pedrycz.tobebought.entities.User;
import com.pedrycz.tobebought.model.user.UserLoginDTO;
import org.mapstruct.Mapper;

@Mapper
public interface UserUserLoginDTOMapper {
    UserLoginDTO userToUserLoginDTO(User user);
    User userLoginDTOToUser(UserLoginDTO userLoginDTO);
}