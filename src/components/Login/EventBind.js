import React, { Component } from 'react';

class EventBind extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message : 'hello'
        }
        this.clickHandler2 = this.clickHandler2.bind(this)
    }

    clickHandler() {
        this.setState({
            message : 'Goodbye'
        })
    }
    
    clickHandler2() {
        this.setState({
            message : 'Goodbye - ctor'
        })
    }

    clickHandler3 = () => {
        this.setState({
            message : 'Goodbye'
        })
    }


    render() {
        return (
            <div style={{border : '1px solid red', padding: "5px", margin : "10px"}}>
                <div style={{textAlign : "center", color : "red", fontWeight: 700}}>{this.state.message}</div>

                {/* this way, the 'this' keyword in the clickHandler will not get the 'this' and throw 'undefined' */}
                <button onClick={this.clickHandler}>Change the message</button> 

                <br />
                {/* SOLUTION 1 */}
                {/* To solve the above issue, we have to bind the event handler with 'this' */}
                <button onClick={this.clickHandler.bind(this)}>Change the message (eventHandler is binded) </button> 
                <br />
                {/* SOLUTION 2 */}
                {/* We can pass the event handler in arrow function */}
                <button onClick={() => this.clickHandler()}>Change the message (call with arrow function) </button> 
                <br />
                {/* SOLUTION 3 */}
                {/* Another solution may be as binding the event handler method in class constructor */}
                <button onClick={this.clickHandler2}>Change the message - binding event handler method in class constructor</button> 
                <br />
                {/* SOLUTION 4 */}
                {/* We can define the event handler method with arrow function */}
                <button onClick={this.clickHandler3}>Change the message - define the class property in arrow function</button> 
            </div>
        );
    }
}


export default EventBind;