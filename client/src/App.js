import React, { Component } from "react";
import Dropdown from "react-dropdown";
import Todos from './Todos';
import AddTodo from './AddTodo';
import VisualMerge from './VisualMerge';

import './css/index.css';

const uuidGenerator = require('uuid/v1');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offline: false,
            currentUser: null,
            users: {},
            userNames: [],
            allOrders: [],
            orders: [],
            ArrToSort: []
        };


    }

    componentDidMount() {
        this.fillArray();
    } 

    fillArray = () => {
        let maxNums = 25;
        let numSet = new Set(null);

        while(maxNums > 0) {
            let num = Math.floor(Math.random() * 100);

            if(!numSet.has(num)) {
                numSet.add(num);
                maxNums--;
            }
        }

        this.setState({
            ArrToSort: [...numSet]
        })
    }

    retreiveUsers() {
        
        fetch('http://127.0.0.1:3000/users')
            .then(res => res.json() )
                .then(
                    (result) => { 
                        let names = [];
                        let users = {};

                        result.forEach( (user) => { 
                            names.push(user.firstName);
                            users[user.firstName] = user;
                        });
                        this.setState({
                            userNames: this.state.userNames.concat(names),
                            users: users
                        });
                    },
                    (error) => { 
                        console.log("Throwing error");   
                    }
                )
    };

    retreiveOrders(name) {

        fetch('http://127.0.0.1:3000/orders')
            .then(res => res.json() )
                .then(
                    (result) => { 
                        let orders = [];

                        if(name == undefined || name == 'all') {

                            result.forEach( (order) => { 
                                orders.push(order);
                            });
                            
                            this.setState({
                                orders: orders,
                                allOrders: orders,
                                currentUser: null
                            });
                        }
                        else {
                            let id = this.state.users[name].id;
                            this.setState({ 
                                orders: [...this.state.allOrders.filter(todo => todo.ownerId == id)],
                                currentUser: this.state.users[name]
                            });
                        }
                        },
                            (error) => { 
                            console.log("Throwing error");   
                        }
                )
    };

    // Create Order
    createOrder(order) {
        fetch('http://127.0.0.1:3000/orders/newOrder', {
        method: 'post',
        body: JSON.stringify(order),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json(), 
                (error) => { 
                    console.log("Throwing error");   
                }
            )
    };

    // Delete
    delTodo = (id) => {
        let orderId = id;

        return fetch('http://127.0.0.1:3000/orders/deleteOrder/' + orderId, {
            method: 'delete'
        })
        .then(res => res.json() )
        .then( 
            this.setState({ orders: [...this.state.orders.filter(todo => todo.orderId !== orderId)]}) 
        ),
        (error) => { 
                    console.log("Error Deleting Object");   
                }
    }

    // Update Orders
    updOrders = (name) => {
        let user = this.state.users[name.value];
        this.retreiveOrders(name.value);
    }

    addTodo = (title, user, address, items, qty) => {
        
        let newOrder = {
          //items, orderId, owner, shippingAddress 
          "owner": title,
          "ownerId": user,
          "items": items,
          "qty": qty ? qty:'0',
          "orderId": uuidGenerator(),
          "shippingAddress": address,
          "orderDate": Date.now(),
          "deliveryDate": (Date.now() + 86400000)//One day from now...
        }

        this.setState({ orders: [...this.state.orders, newOrder]})
        this.createOrder(newOrder);
    }
    

  render() {

    return (
    <div>   {/*Top Level Container*/} 

        <div className="section-image merge">
        <VisualMerge Arr={this.state.ArrToSort} />
        </div> 
    </div>
    );
  }
}

export default App;
