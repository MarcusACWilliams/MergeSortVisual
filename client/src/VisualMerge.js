import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class VisualMerge extends Component {
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
        
        return (
            <div className="textbox">
                    {'Customer Name: '}
                    <div> {'Address: ' }</div>
                    <div>
                        {'Items: '}
                        <button className="basebtn highlight" onClick={this.showItems}>
                        {this.state.show ? 'hide': 'show'}
                        </button>
                            { this.state.show ?
                                <ul>

                                </ul>: null}
                        </div>

                    <div>
                    <button className="basebtn delbtn" >
                            {/*<i class="fa fa-trash" aria-hidden="true"></i>*/}
                            <i class="far fa-window-close delicon" aria-hidden="true"></i>
                    </button>
                    </div>
            </div>
        )
    }
}


export default VisualMerge;