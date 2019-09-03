import React, { Component } from 'react';

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
        let Arr = this.props.Arr;
        return (

            <div>
                <ul className="sortList">
                { Arr.map( (item,index) => {
                    return <li className="sortBar" key={index}>{item}</li>
                }) 
                }
                </ul>
            </div>
        )
    }
}


export default VisualMerge;