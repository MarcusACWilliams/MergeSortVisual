import React, { Component } from "react";
import PropTypes from 'prop-types';

import ListItem from './listItem';

class ListComponent extends Component {
    render() {
        return this.props.items.map((item) => (
            <ListItem key={item.itemId} item = {item} delItem={this.props.delItem}/>
        ));
    }
}

// PropTypes
ListComponent.PropTypes = {
    //items: PropTypes.array.isRequired,
    delItem: PropTypes.func.isRequired
}

export default ListComponent;