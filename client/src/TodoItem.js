import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    state = {
        show: false
    }
    getStyle = () => {
        return {
            background: '#F4F4F4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            width: '100%',
        }
    };

    showItems = () => {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        const { items, orderId, owner, shippingAddress, orderDate, deliveryDate } = this.props.todo;
        let ordered = new Date(orderDate);
        let deliver = new Date(deliveryDate);
        return (
            <div className="textbox">
                    {'Customer Name: '+owner}
                    <div> {'Address: '  + shippingAddress }</div>
                    <div>
                        {'Items: '}
                        <button className="basebtn highlight" onClick={this.showItems}>
                        {this.state.show ? 'hide': 'show'}
                        </button>
                            { this.state.show ?
                                <ul>
                                { items.map((item, index) => {
                                                {item.item}
                                                return <li key={index}>{item.item + '            qty:'+ item.qty }</li>
                                            }) 
                                }
                                </ul>: null}
                        </div>

                    <div>
                    <div>{'Order Date: ' + ordered.getDate() +'-'+(ordered.getMonth()+1)+'-'+ ordered.getFullYear()}</div>
                    {'Expected Delivery Date: ' + deliver.getDate() +'-'+(deliver.getMonth()+1)+'-'+ deliver.getFullYear()}

                    <button className="basebtn delbtn" onClick={this.props.delTodo.bind(this, orderId)} >
                            {/*<i class="fa fa-trash" aria-hidden="true"></i>*/}
                            <i class="far fa-window-close delicon" aria-hidden="true"></i>
                    </button>
                    </div>
            </div>
        )
    }
}

// PropTypes
TodoItem.PropTypes = {
    todos: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired
}


export default TodoItem;