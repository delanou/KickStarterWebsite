import React, { Component } from 'react';


class Fail extends Component {
    render() {
        return(
            <div>
                <img alt="thumbs down" src={require('../images/thumbs-down-circle.jpg')} />
            </div>
        );
    }
}

export default Fail;