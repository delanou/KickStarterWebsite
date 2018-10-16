import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {browserHistory} from 'react-router';

const categoryOptions = [
    "Art", "Comics", "Crafts", "Dance", "Design", "Fashion", "Film & Video", 
    "Food", "Games", "Journalism", "Music", "Photography", "Publishing", 
    "Technology", "Theater"
]

const countryOptions = [
    "AT", "AU", "BE", "CA", "CH", "DE", "DK", "ES", "FR", 
    "GB", "HK", "IE", "IT", "JP", "LU", "MX", "N,0\"", 
    "NL", "NO", "NZ", "SE", "SG", "US"
]

const months = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
]

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: categoryOptions[0],
            goal: 0,
            deadlineMonth: months[0],
            launchedMonth: months[0],
            pledgedAmount: 0,
            backers: 0,
            country: countryOptions[0]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDeadlineMonthChange = this.handleDeadlineMonthChange.bind(this);
        this.handleLaunchedMonthChange = this.handleLaunchedMonthChange.bind(this);
        this.handlePledgedAmountChange = this.handlePledgedAmountChange.bind(this);
        this.handleBackersChange = this.handleBackersChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    handleNameChange (event) {
        this.setState({
            name: event.target.value
        })
    }
    handleCategoryChange (option) {
        this.setState({
            category: option.value
        })
    }
    handleGoalChange (event) {
        this.setState({
            goal: event.target.value
        })
    }
    handleDeadlineMonthChange (option) {
        this.setState({
            deadlineMonth: option.value
        })
    }
    handleLaunchedMonthChange (option) {
        this.setState({
            launchedMonth: option.value
        })
    }
    handlePledgedAmountChange (event) {
        this.setState({
            pledgedAmount: event.target.value
        })
    }
    handleBackersChange (event) {
        this.setState({
            backers: event.target.value
        })
    }
    handleCountryChange (option) {
        this.setState({
            country: option.value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch('/postForm', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            return response.json();
        }).then((prediction) => {
            let result = prediction["prediction"] ;
            console.log(result);        
            if (result === 0) {
                // redirect to fail component  
                this.props.history.push("/Fail");
            }
            else {
                // redirect to pass component
                this.props.history.push("/Pass");
            }
            return 0;
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label> Name <input value={this.state.name} onChange={this.handleNameChange} name="Name" type="text" required></input></label>
                <br/>
                <label> Category </label><Dropdown options={categoryOptions} onChange={this.handleCategoryChange} value={this.state.category} placeholder="Select an option" />
                <br/>
                <label> Goal <input value={this.state.goal} onChange={this.handleGoalChange} values={this.state.goal} name="Goal" type='number' required></input></label>
                <br/>
                <label> Deadline Month </label><Dropdown options={months} onChange={this.handleDeadlineMonthChange} value={this.state.deadlineMonth} placeholder="Select an option" />
                <br/>
                <label> Launched Month </label><Dropdown options={months} onChange={this.handleLaunchedMonthChange} value={this.state.launchedMonth} placeholder="Select an option" />
                <br/>
                <label> Pledged Amount <input value={this.state.pledgedAmount} onChange={this.handlePledgedAmountChange} values={this.state.pledgedAmount} name="PledgedAmount" type='number' required></input></label>
                <br/>
                <label> Backers <input value={this.state.backers} onChange={this.handleBackersChange} value={this.state.backers} name="author" type='number' required></input></label>
                <br/>
                <label> Country  </label><Dropdown options={countryOptions} onChange={this.handleCountryChange} value={this.state.country} placeholder="Select an option" />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Form;