import React, { Component } from 'react';

/**
 * This page displays the prediction from the classifier. Includes: header at the top
 * to describe the confidence and a picture for the respective outcome
 */

class ResultPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prediction: this.props.location.state.prediction,
            probability: Math.round(this.props.location.state.probability * 100),
            imageSource: "",
        }
    }

    componentDidMount() {
        /* Change the source of the image to include based of the prediction field */
        let source = '../images/thumbs-up-circle.jpg';

        if (this.state.prediction === 0) {
            source = '../images/thumbs-down-circle.jpg';
        }

        this.setState({imageSource: source});
    }

    render() {
        return(
            <div>
                <h1>Confidence: {this.state.probability}%</h1>
                <img alt="thumbs up" src={require('../images/thumbs-up-circle.jpg')} />
            </div>
        );
    }
}

export default ResultPage;