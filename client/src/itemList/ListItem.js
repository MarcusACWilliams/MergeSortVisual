import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ListItem extends Component {
    getStyle = () => {
        return {
            background: '#F4F4F4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            width: '100%',
        }
    };

    render() {
        const { item, qty ,itemId, price } = this.props.item;
        return (
            <div style={ this.getStyle() }>
                <p>
                    
                    {'Item Name: '+ item + '      '}
                    {'Quantity '+ qty + '     '}
                    {'Price' + price }
                    
                    <button onClick={this.props.delItem.bind(this, itemId)} style={{ float: 'right' }}>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </p>
            </div>
        )
    }
}

// PropTypes
ListItem.PropTypes = {
    todos: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired
}


export default ListItem;