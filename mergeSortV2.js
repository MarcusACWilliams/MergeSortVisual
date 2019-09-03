/*
-- Merge Sort Impementation --
Divide and Conquor Algo: Break Big problems down into smaller
problems. Keep breaking down the smaller problems into trivial
problems. Finally, solve and combine.
*/
class MergeSortV2 {
    constructor(inputArr) {

        if(!Array.isArray(inputArr) || !inputArr.length)
            throw 'Please enter a valid Array';
            
        this.unsortedArr = inputArr;
        this.arrLength = inputArr.length;
        this.sortedArr = new Array(inputArr.length);//Allocate new array
        this.sortStack = [];
    }
    /*  
        Strategy: use index pointers to 
        keep track of pesudo arrays instead
        of creating many new arrays 
    */
    /*  
        use lower index of left child and upper index of right child 
        to rebuild parent "pesudo array"
    */
    sort() {
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

        return this.sortedArr;
    }

    //Break arrays in half !!!REMEMBER!!! --arrToSplit is actually just two ints [lowIndex, highIndex] -- !!!
    split(arrToSplit) {
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

    swap(firstNum, secondNum) { 
            
        //Swap the ACTUAL VALUES...
        let temp = this.sortedArr[firstNum];
        this.sortedArr[firstNum] = this.sortedArr[secondNum];
        this.sortedArr[secondNum] = temp;
        temp = this.sortedArr;
    }

    //Join sorted arrays back together
    merge(arrToMerge) {
        let leftVirtualIndex = arrToMerge[0];
        let rightVirtualIndex = arrToMerge[2]+1;
        let current = arrToMerge[0];
        
        //Initial or "Real" merge state
        while(this.sortedArr[leftVirtualIndex] <= this.sortedArr[rightVirtualIndex]) {
                leftVirtualIndex++;
                current++;
            if(leftVirtualIndex == rightVirtualIndex) {
                //If you're here, the array is offically sorted!
                return;
            }    
        }
        //Transition to "Virtual Merge" state
            this.swap(leftVirtualIndex, rightVirtualIndex)
            leftVirtualIndex = rightVirtualIndex;
            rightVirtualIndex++;
            current++;
            if(rightVirtualIndex > arrToMerge[1]) {
                return;
            }
        //Virtual Merge state
        while(leftVirtualIndex < rightVirtualIndex) {

            if(this.sortedArr[leftVirtualIndex] <= this.sortedArr[rightVirtualIndex] ) {
                    this.swap(current, leftVirtualIndex);
                    leftVirtualIndex++;
                    current++;
                if(leftVirtualIndex == rightVirtualIndex) {
                    //If you're here, the array is offically sorted!
                    return;
                }
            }
            else {
                this.swap(current, rightVirtualIndex);
                rightVirtualIndex++;
                current++;
                if(rightVirtualIndex > arrToMerge[1]) {
                    //If you're here, the array is offically sorted!  
                    return;
                }
            }    
        }
        return this.sortedArr;
    }
}export default MergeSortV2;

