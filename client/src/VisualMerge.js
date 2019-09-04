import React, { Component } from 'react';

export class VisualMerge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }

        this.myRef = React.createRef();
        this.setHeight = this.setHeight.bind(this);
    }

    componentDidMount() {
        //this.setHeight();
    }

    componentDidUpdate() {
        this.setHeight();
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

    setHeight() {
        let i = 0;
        //console.log(this.props.Arr.length);
        //console.log(this.props.Arr);
        //let Arr = this.props.Arr;

        while(i < this.props.Arr.length) { 
            
            //if(document.getElementById("row0")) {
            
            let el = document.getElementById("row"+i)
            el.style.setProperty("--bar-height" , (el.innerHTML) + "%");
            //console.log("row"+i);
            //console.log( document.getElementById("row"+i));
            i++;
        }
        
    }

    render() {
        let Arr = this.props.Arr;

        return (

            <React.Fragment>
                <ul className="sortList">
                { Arr.map( (item,index) => {
                    var rowId = "row"+index;
                    let styles = {
                        height: rowId+"%"
                    }
                    
                    var t = <li id={rowId} className="sortBar" style={styles} key={index} ref={li => {this.li = li }} >{item}</li>
                    
                    //t.style.setProperty("--bar-height" , item + "%")
                    //this.li.style.setProperty("--bar-height" , item + "%");
                    //document.getElementById(rowId).style.setProperty("--bar-height" , item + "%");
                    return t;
                }) 
                }
                </ul>
            </React.Fragment>
        )
    }
}


export default VisualMerge;