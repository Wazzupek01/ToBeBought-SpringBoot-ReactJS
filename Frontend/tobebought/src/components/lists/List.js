import React, { useState } from "react";
import classes from "./List.module.css";
import Item from "./Item";

// [ ] TODO: new list field validation
// [ ] TODO: update field validation

const List = (props) => {
  const [id, setId] = useState(props.id);
  const [name, setName] = useState(props.name);
  const [items, setItems] = useState([]);

  const [updateList, setUpdateList] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const [newItemName, setNewItemName] = useState("Name");
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [newItemUnit, setNewItemUnit] = useState("kilogram");
  const [showAddItem, setShowAddItem] = useState(false);

  const item = class item {
    constructor(id, name, quantity, unit, checked) {
      this.id = id;
      this.name = name;
      this.quantity = quantity;
      this.unit = unit;
      this.checked = checked;
    }
  };

  const fetchItems = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    myHeaders.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };

    const response = await fetch(
      "http://localhost:8080/shoppingList/" + id + "/all",
      requestOptions
    );
    const result = await response.text();
    return result;
  };

  const deleteList = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    myHeaders.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      credentials: "include",
    };

    const response = await fetch(
      "http://localhost:8080/shoppingList/" + id,
      requestOptions
    );
    props.onUpdate();
  };

  const setFetchedItems = () => {
    if (showItems === false) {
      fetchItems().then((result) => {
        JSON.parse(result).forEach((el) => {
          const newItem = new item(
            el.id,
            el.name,
            el.quantity,
            el.unit,
            el.checked
          );
          let contains = false;
          for (let i = 0; i < items.length; i++) {
            if (items[i].id == newItem.id) contains = true;
          }
          if (!contains) {
            let itemsCopy = items;
            itemsCopy.push(newItem);
            setItems(itemsCopy);
            console.log(items);
          }
        });
        setShowItems(true);
      });
    } else {
      setShowItems(false);
    }
  };

  const update = async () => {
    if (updateList === false) {
      setUpdateList(true);
    } else {
      setUpdateList(false);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*");
      myHeaders.append(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE"
      );
      myHeaders.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ name: name }),
        redirect: "follow",
        credentials: "include",
      };

      const response = await fetch(
        "http://localhost:8080/shoppingList/" + id,
        requestOptions
      );
      return response;
    }
  };

  const addItem = () => {
    if (showAddItem === false) {
      setShowAddItem(true);
    } else {
      setShowAddItem(false);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*");
      myHeaders.append(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE"
      );
      myHeaders.append(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      var raw = JSON.stringify({
        name: newItemName,
        quantity: newItemQuantity,
        unit: newItemUnit,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include",
      };

      fetch("http://localhost:8080/item/shoppingList/" + id, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setItems([
            ...items,
            new item(
              result.id,
              result.name,
              result.quantity,
              result.unit,
              result.checked
            ),
          ]);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const deleteItem = (id) => {
    let itemsCopy = items;
    setItems(itemsCopy.filter((item) => item.id !== id));
  };

  const itemList = items.map((value, index) => (
    <Item
      key={value.id}
      shoppingListId={id}
      id={value.id}
      name={value.name}
      quantity={value.quantity}
      unit={value.unit}
      checked={value.checked}
      onDelete={deleteItem}
    />
  ));

  return (
    <div className={classes.list__container}>
      <div className={classes.list__firstline}>
        {updateList ? (
          <input
            type="text"
            className={classes.additem__input}
            onChange={(event) => {
              setName(event.currentTarget.value);
            }}
            value={name}
          ></input>
        ) : (
          <div>{name}</div>
        )}
        <div className={classes.list__buttoncontainer}>
          <div className={classes.delete} onClick={deleteList}>
            &#10006;
          </div>
          <div className={classes.update} onClick={update}>
            &#8634;
          </div>
          <div onClick={setFetchedItems} className={classes.show}>
            {showItems ? "-" : "+"}
          </div>
        </div>
      </div>
      {showItems && (
        <div className={classes.list__items}>
          {showAddItem ? (
            <div className={classes.list__additem}>
              <input
                className={`${classes.additem__input} ${
                  !(newItemName.split(" ").join("").length > 0) &&
                  classes.invalid
                }`}
                type="text"
                onChange={(event) => {
                  setNewItemName(event.currentTarget.value);
                }}
                value={newItemName}
              ></input>
              <input
                className={`${classes.additem__input} ${
                  !(newItemQuantity > 0) && classes.invalid
                }`}
                type="number"
                onChange={(event) => {
                  setNewItemQuantity(event.currentTarget.value);
                }}
                value={newItemQuantity}
              ></input>
              <select
                className={classes.additem__input}
                onChange={(event) => {
                  setNewItemUnit(event.currentTarget.value);
                }}
                value={newItemUnit}
                required
              >
                <option value="kilogram">kilogram</option>
                <option value="gram">gram</option>
                <option value="piece">piece</option>
                <option value="pack">pack</option>
                <option value="litre">litre</option>
                <option value="unit" defaultValue>
                  unit
                </option>
              </select>
              <button onClick={addItem}>Add Item</button>
            </div>
          ) : (
            <div className={classes.button__additem} onClick={addItem}>
              +
            </div>
          )}
          {itemList}
        </div>
      )}
    </div>
  );
};

export default List;
