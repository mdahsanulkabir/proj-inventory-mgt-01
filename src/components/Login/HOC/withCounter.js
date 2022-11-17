import React from 'react';

const withCounter = ( WrappedComponent ) => {

    class WithCounter extends React.Component {
        constructor (props) {
            super (props);
    
            this.state = {                              // For the ClickCounter and HoverCounter components,
                count : 0                               // we are making a HOC here which can be share among them
            }                                           // and possibly any other new components which needs it's
        }                                               // counter functionality as increasing the count value
    
        incrementCount = () => {
            this.setState(prevState => {
                return { count : prevState.count + 1 }
            })
        }

        render() {
            const { count } = this.state;
            return <WrappedComponent count={ count } increment={ this.incrementCount }/>;
        }
    
    };
    
    return WithCounter
}

export default withCounter;