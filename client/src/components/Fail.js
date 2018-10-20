import React, { Component } from 'react';


class Fail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            probability: this.props.location.state.probability,
        }
    }

    render() {
        return(
            <div>
                <h1>Chance of Success = {this.state.probability}</h1>
                <img alt="thumbs down" src={require('../images/thumbs-down-circle.jpg')} />
            </div>
        );
    }
}

export default Fail;