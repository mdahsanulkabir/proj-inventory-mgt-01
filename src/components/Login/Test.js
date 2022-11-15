import React, { Component } from 'react';

class Test extends Component {

    constructor (props) {
        super(props);
        this.state = {
            count : 0
        }
    }

    increment() {
        // this.setState({
        //     count : this.state.count + 1
        // }, ()=> console.log('inside - ', this.state.count))  //this is the callBack function wihch will act after the setState function done its job. this must be an arrow function
        


        //if we want to set the value of a state based on its previous state, we need to pass the updated value in a function with prevState as parameter
        this.setState((prevState)=> ({      //this.setState((prevState, props)=> ({    this way we can pass the props
            count: prevState.count + 1
        }))


        console.log('outside - ', this.state.count);
    }


    render() {
        const {name, heroName } = this.props; // this way we can destructure the props
        const { state1, state2, state3 } = this.state; // this way we can destructure the state values
        return (
            <div>
                <div>count - {this.state.count}</div>
                <button onClick={()=> this.increment()}>increment</button>
                
            </div>
        );
    }
}

export default Test;