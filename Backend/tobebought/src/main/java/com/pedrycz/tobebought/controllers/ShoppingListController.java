package com.pedrycz.tobebought.controllers;

import com.pedrycz.tobebought.entities.ShoppingList;
import com.pedrycz.tobebought.model.item.ItemDataDTO;
import com.pedrycz.tobebought.model.shoppingList.ShoppingListDataDTO;
import com.pedrycz.tobebought.services.UserServiceImpl;
import com.pedrycz.tobebought.services.interfaces.ShoppingListService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/shoppingList")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    @GetMapping("/{id}")
    ResponseEntity<ShoppingListDataDTO> getShoppingList(@PathVariable Long id, @CookieValue("jwt-token") String token) {
        Long userId = UserServiceImpl.getUserIdFromJWT(token);
        return new ResponseEntity<>(shoppingListService.getShoppingList(id, userId), HttpStatus.OK);
    }

    @GetMapping("/")
    ResponseEntity<List<ShoppingListDataDTO>> getShoppingLists(@CookieValue("jwt-token") String token) {
        Long userId = UserServiceImpl.getUserIdFromJWT(token);
        return new ResponseEntity<>(shoppingListService.getShoppingLists(userId), HttpStatus.OK);
    }

    @GetMapping("/{id}/all")
    ResponseEntity<List<ItemDataDTO>> getListItems(@PathVariable Long id, @CookieValue("jwt-token") String token) {
        Long userId = UserServiceImpl.getUserIdFromJWT(token);
        return new ResponseEntity<>(shoppingListService.getListItems(id, userId), HttpStatus.OK);
    }

    @PostMapping("/")
    ResponseEntity<ShoppingListDataDTO> addShoppingList(@Valid @RequestBody ShoppingList shoppingList,
                                                        @CookieValue("jwt-token") String token) {
        Long id = UserServiceImpl.getUserIdFromJWT(token);
        return new ResponseEntity<>(shoppingListService.saveShoppingList(shoppingList, id), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    ResponseEntity<ShoppingListDataDTO> updateShoppingList(@Valid @RequestBody ShoppingList shoppingList,
                                                           @PathVariable Long id,
                                                           @CookieValue("jwt-token") String token) {
        Long userId = UserServiceImpl.getUserIdFromJWT(token);
        return new ResponseEntity<>(shoppingListService.updateShoppingList(shoppingList.getName(),
                id,
                userId), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<HttpStatus> deleteShoppingList(@PathVariable Long id, @CookieValue("jwt-token") String token){
        Long userId = UserServiceImpl.getUserIdFromJWT(token);
        shoppingListService.deleteShoppingList(id, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

