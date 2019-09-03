import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListComponent from './ListComponent'

const uuidGenerator = require('uuid/v1');

export class AddItem extends Component {
    state = {
        title: '',
        user:'',
        address: '',
        item: '',
        qty: '',
        price: ''
        //items: []
    }

    onSubmit = (e) => {
        e.preventDefault();

        let item = {    
            item: this.state.item, 
            qty:  this.state.qty,
            price: this.state.price,
            itemId: uuidGenerator()
        }

        //let items = [...this.props.items, item];
        this.props.addItem(item);

        this.setState({ 
                title: '',
                user: '',
                address: '',
                item: '',
                qty:'',
                price:''
        });

        e.stopPropagation();
    }

    delItem = (itemId) => {
        this.props.removeItem(itemId);
    }

    onChange = (e) => this.setState({ title: e.target.value });
    onChange1 = (e) => this.setState({ user: e.target.value });
    onChange2 = (e) => this.setState({ address: e.target.value });
    onChange3 = (e) => this.setState({item: e.target.value});
    onChange4 = (e) => this.setState({qty: e.target.value});
    onChange5 = (e) => this.setState({price: e.target.value});


    render() {
        return (
            <form className="textbox" onSubmit={this.onSubmit}> 
            <div>{"Item"}</div>
            <input type="text"
                name= "item"
                style={{flex: '10', padding: '5px'}}
                placeholder="Add Order Item..." 
                value={this.state.item}
                onChange={this.onChange3}
                />{'  '}

                <input type="text"
                name= "qty"
                style={{flex: '10', padding: '5px'}}
                placeholder="Order Quantity" 
                value={this.state.qty}
                onChange={this.onChange4}
                />{'  '}

                <input type="text"
                name= "price"
                style={{flex: '10', padding: '5px'}}
                placeholder="Order price" 
                value={this.state.price}
                onChange={this.onChange5}
                />{'  '}
                
                <input 
                    type="submit"
                    value="Add Item"
                    className="basebtn highlight"
                    style= {{flex: '1'}}
                />
                <ListComponent items={this.props.items} delItem={this.delItem}/>
            </form>
        )
    }
}

// PropTypes
AddItem.PropTypes = {
    addItem: PropTypes.func.isRequired
}

export default AddItem;