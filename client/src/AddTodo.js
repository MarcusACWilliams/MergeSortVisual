import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddItem from './itemList/AddItem'

export class AddTodo extends Component {
    state = {
        title: '',
        user:'',
        address: '',
        //Update Compnet here to now send an array of items
        item: '',
        qty: '',
        price:'',
        items: []
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.onChange;
        this.onChange1;
        this.onChange2;
        this.props.addTodo(this.props.user.firstName, this.props.user.id, this.props.user.address, this.state.items, this.state.qty, this.state.price);
        this.setState({ 
                title: '',
                user: '',
                address: '',
                item: '',
                qty:'',
                price:'',
                items: []
        });
    }

    onChange = (e) => this.setState({ title: e.target.value });
    onChange1 = (e) => this.setState({ user: e.target.value });
    onChange2 = (e) => this.setState({ address: e.target.value });
    onChange3 = (e) => this.setState({item: e.target.value});
    onChange4 = (e) => this.setState({qty: e.target.value});

    //Prop methods that udpate "items list" on the order
    addItem = (item) => {
        this.setState({
            items: [...this.state.items, item]
        })
    }

    removeItem = (itemId) => {
        let items = [...this.state.items.filter(item => item.itemId !== itemId)];
        this.setState({
            items: items
        });
    }
    //------------------------------------------------------------------

    render() {
        return (
            <form className="textbox" onSubmit={this.onSubmit}> 
            <div>{"User"}</div>
            <input 
                    type="text" 
                    
                    name="title"
                    style={{flex: '10', padding: '5px'}}
                    placeholder="Add user..." 
                    value={this.props.user ? this.props.user.firstName + ' ' + this.props.user.lastName: this.state.title}
                    onChange={this.onChange}
                />
            <div>{"User Id"}</div>
                <input type="text"
                        name= "user"
                        style={{flex: '10', padding: '5px'}}
                        placeholder="Add user id..." 
                        value={this.props.user ? this.props.user.id : this.state.user}
                        onChange={this.onChange1}
                />
            <div>{"Delivery Address"}</div>
                <input type="text"
                name= "address"
                style={{flex: '10', padding: '5px'}}
                placeholder="Add address..." 
                value={this.props.user ? this.props.user.address : this.state.address}
                onChange={this.onChange2}
                />

                <AddItem addItem={this.addItem} removeItem={this.removeItem} items={this.state.items} user={this.props.user} />

                <input 
                    type="submit"
                    value="Add Order"
                    className="basebtn highlight"
                    style= {{flex: '1'}}
                />
            </form>
        )
    }
}

// PropTypes
AddTodo.PropTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo;