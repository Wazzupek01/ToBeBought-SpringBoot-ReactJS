import React, { Component } from 'react';
import Item from './Item';
import "./List.css";
class List extends Component {
    constructor(props) {
        super(props);
    }
    state = {id: this.props.id, name: this.props.name, items: [], update: false, showItems: false,
            newItemName: "name", newItemQuantity: 0, newItemUnit: "unit"}

    item = class item {
        constructor(id, name, quantity, unit, checked){
            this.id =id;
            this.name = name;
            this.quantity = quantity;
            this.unit = unit;
            this.checked = checked;
        }
    }

    deleteList = async () => {
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


        const response = await fetch("http://localhost:8080/shoppingList/" + this.state.id, requestOptions);
    }

    setItems = () => {
        if(this.state.showItems === false){
            this.getItems().then(result => {
                JSON.parse(result).forEach((el) => {
                    const newItem = new this.item(el.id, el.name, el.quantity, el.unit, el.checked);
                    let contains = false;
                    for(let i = 0; i < this.state.items.length; i++){
                        if(this.state.items[i].id == newItem.id) contains = true;
                    }
                    if(!contains){
                        this.state.items.push(newItem);
                    }
                    this.setState({items: this.state.items});
                    console.log(this.state.items);
                });
            });
            this.setState({showItems: true});
        } else {
            this.setState({showItems: false});
        }
        
    }

    getItems = async () => {
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

        const response = await fetch("http://localhost:8080/shoppingList/" + this.state.id + "/all", requestOptions);
        const result = await response.text();
        return result;
    }

    update = async () => {
        if(this.state.update === false){
            this.setState({update: true});
        } else {
            this.setState({update: false});
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "*");
            myHeaders.append("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
            myHeaders.append(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
            );

            var raw = JSON.stringify({name: this.state.name});

            var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            credentials: "include",
            };


            const response = await fetch("http://localhost:8080/shoppingList/" + this.state.id, requestOptions);
        }
    }

    addItem = async () => {
        if(this.state.update === false){
            this.setState({update: true});
        } else {
            this.setState({update: false});
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "*");
            myHeaders.append("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
            myHeaders.append(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
            );

            var raw = JSON.stringify({
                name: this.state.newItemName,
                quantity: this.state.newItemQuantity,
                unit: this.state.newItemUnit
            });

            var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
            credentials: "include",
            };


            const response = await fetch("http://localhost:8080/item/shoppingList/" + this.state.id, requestOptions);
        }
    }


    render() { 
        return ( <div className="list__container">
                <div className="list__firstline">
                {
                    this.state.update ? 
                    <input type="text" onChange={(event) => {this.setState({name: event.currentTarget.value})}} value={this.state.name}></input>
                    : <div>{this.state.name}</div>
                }

                <div>id: {this.state.id}</div>
                <div><button onClick={this.deleteList}>Delete</button></div>
                <div><button onClick={this.update}>Update</button></div>
                <div onClick = {this.setItems}>+</div>
            </div>
            {
            this.state.showItems ? <div className="list__items">
                <div className="list__additem">
                    <input type="text" onChange={(event) => {this.setState({newItemName: event.currentTarget.value})}} value = {this.state.newItemName}></input>
                    <input type="number" onChange={(event) => {this.setState({newItemQuantity: event.currentTarget.value})}} value = {this.state.newItemQuantity}></input>
                    <input type="text" onChange={(event) => {this.setState({newItemUnit: event.currentTarget.value})}} value = {this.state.newItemUnit}></input>
                    <button onClick={this.addItem}>Add Item</button>
                </div>
                {this.state.items.map((value, index) => (<Item key={value.id} shoppingListId={this.state.id} id={value.id} name={value.name} quantity={value.quantity} unit={value.unit} checked={value.checked} />))}
            </div> : ""
            }
        </div> );
    }
}
export default List;