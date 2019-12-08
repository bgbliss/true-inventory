//Queue Class 
class Queue
{   
    //Array is used to implement a Queue
    constuctor()
    {
        this.itmes = [];
    }
    emqueue(item)
}


// This function adds an element at the rear of a queue. We have used push() method of array to add an element at the end of the queue.
enqueue(element)
{
    //adding element to the queue
    this.itmes.push(element)
}

dequeue()
{
    //removing element from the queue
    // returns underflow when called
    // on empty quere
    if(this.isEmpty())
        return "Underflow";
    return this.items.shift();
}

front()
{
    //returns the Front element of the queue
    //without removing it.
    if(this.isEmpty())
        return "No elements in Queue"
    return this.itmes[0];
}

// helper Methods 
isEmpty()
{
    // return true if the queue is empty
    return this.items.length == 0;
}

printQueue()
{
        var str = "";
        for(var i = 0; i < this.items.length; i++){
            str += this.items[i] + " ";
        }
        return str;
}
