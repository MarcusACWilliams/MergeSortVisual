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
            ArrToSort: [],
     
        };

        this.unsortedArr = [];
        this.sortedArr = [];
        this.sortStack = [];
        
    }

    componentDidMount() {
        this.fillArray();
        setTimeout( () => {console.log(this.state.ArrToSort)}, 2000);
        setTimeout( () => {this.sort()}, 3000);    
    }

    componentDidUpdate() {
        
    };

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
    };
    
    sort = () => {
        console.log("Sorting...");
        //this.sortedArr = new Array(this.state.ArrToSort.length);//Allocate new array
        let i = 0;
        while(i <= this.state.ArrToSort.length) {
            this.unsortedArr.push(this.state.ArrToSort[i]);
            this.sortedArr.push(this.state.ArrToSort[i]);
            i++;
        }
        this.unsortedArr = this.state.ArrToSort;
        //this.sortedArr = this.state.ArrToSort;
        console.log("Unsorted Array: " + this.unsortedArr);
        let peek; let leftIndex; let rightIndex;

        this.sortStack.push([0, (this.sortedArr.length-1) ]); //Initialize stack

        while( (this.sortStack.length) > 0) {

            //Peek the Stack
            peek = this.sortStack.pop();
            //-------------------------------------------------STARTING INDICES ZONE!!!
            leftIndex = peek[0];    rightIndex = peek[1];
            
            //Check for split
            if( (rightIndex-leftIndex) > 1) {
                if(peek[2]) {//If this truple has a mid point then it was previously split and now needs to be merged
                    this.merge(peek);
                }
                else {
                    this.sortStack.push(peek);  //Put Peek back on the stack...
                    this.split(peek);           //And then split it...
                }
            }//-------------------------------------------------END OF INDICES ZONE!!!
            else {//Array is now small enough to sort!!---------STARTING VALUE ZONE!!!
                if( this.unsortedArr[leftIndex] <= this.unsortedArr[rightIndex] ) {
                    this.sortedArr[leftIndex] = this.unsortedArr[leftIndex];
                    this.sortedArr[rightIndex] = this.unsortedArr[rightIndex];
                }
                else {   //Initialize if needed
                    this.sortedArr[leftIndex] = this.unsortedArr[rightIndex];
                    this.sortedArr[rightIndex] = this.unsortedArr[leftIndex];       
                } 
            }//-------------------------------------------------END OF VALUES ZONE!!!
        }
        console.log("Sorted Array: " + this.sortedArr);
        this.setState({
            ArrToSort: this.sortedArr
        })

    };

    //Break arrays in half !!!REMEMBER!!! --arrToSplit is actually just two ints [lowIndex, highIndex] -- !!!
    split = (arrToSplit) => {
        //Create two smaller array halves...
        let midPoint = ( (arrToSplit[0]) + Math.floor( ( (arrToSplit[1]) - (arrToSplit[0])) / 2));
        let leftArr = [arrToSplit[0], midPoint];
        let rightArr = [midPoint+1, arrToSplit[1]]
        
        //Store large array's mid point
        arrToSplit.push(midPoint);

        //Put arrays on stack
        this.sortStack.push(rightArr);
        this.sortStack.push(leftArr);

        return;  
    }

    swap = (firstNum, secondNum) => {
            
        //Swap the ACTUAL VALUES...
        let temp = this.sortedArr[firstNum];
        this.sortedArr[firstNum] = this.sortedArr[secondNum];
        this.sortedArr[secondNum] = temp;
        temp = this.sortedArr;
    }

//Join sorted arrays back together
merge(arrToMerge) {

    let leftIndex = 0;
    let rightIndex = 0;
    let current = arrToMerge[0];
    let lowArr = [];
    let highArr = [];
    let i = arrToMerge[0];

    //Fill two arrays
    while(i <= arrToMerge[2]) {
        lowArr.push(this.sortedArr[i]);
        i++;
    }

    while(i <= arrToMerge[1]) {
        highArr.push(this.sortedArr[i]);
        i++;
    }
    
    //Initial or "Real" merge state
    while(leftIndex < lowArr.length || rightIndex < highArr.length) {

        if(lowArr[leftIndex] <= highArr[rightIndex]) {

            this.sortedArr[current] = lowArr[leftIndex];
            leftIndex++;
                current++;
            if(leftIndex >= lowArr.length) {
                while(rightIndex < highArr.length){
                    this.sortedArr[current] = highArr[rightIndex];
                    rightIndex++;
                        current++;
                }
                //If you're here, the array is offically sorted!
                return;
            }    
        }else {
            this.sortedArr[current] = highArr[rightIndex];
            rightIndex++;
                current++;
            if(rightIndex >= highArr.length) {
                while(leftIndex < lowArr.length){
                    this.sortedArr[current] = lowArr[leftIndex];
                    leftIndex++;
                        current++;
                }
                //If you're here, the array is offically sorted!
                return;
            }   
        }
        }
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
