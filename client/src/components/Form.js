import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import ReactLoading from 'react-loading';
import 'react-dropdown/style.css'

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
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
]

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // project information
            name: "",
            category: categoryOptions[0],
            goal: 0,
            deadlineMonth: months[0],
            launchedMonth: months[0],
            pledgedAmount: 0,
            backers: 0,
            country: countryOptions[0],

            // meta information
            isLoading: false
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
        console.log("about to fetch");

        this.setState({
            isLoading: true
        });

        fetch('/postForm', {
            method: 'POST',
            body: JSON.stringify({
                name:           this.state.name,
                category:       this.state.category,
                goal:           this.state.goal,
                deadlineMonth:  this.state.deadlineMonth,
                launchedMonth:  this.state.launchedMonth,
                pledgedAmount:  this.state.pledgedAmount,
                backers:        this.state.backers,
                country:        this.state.country
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            console.log("got response");
            return response.json();
        }).then((prediction) => {
            console.log(JSON.stringify(prediction));
            console.log(prediction["probability"]);
            
            let result = prediction["prediction"] ;
            let probability = prediction["probability"];
            
            this.props.history.push({
                pathname: "/ResultPage",
                state: {
                    prediction: result,
                    probability: probability,
                }
            });

            return 0;
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
    }

    render() {
        return( 
            <div>

                <div style={{ 
                                visibility: this.state.isLoading ? 'visible' : 'hidden', 
                                display:this.state.isLoading? 'flex': 'none',
                                justifyContent:'center', 
                                alignItems:'center',
                                width: '100%',
                                height: '100%'
                            }} >

                    <ReactLoading 
                        type="balls"
                        color="#32CD32"
                        height={'40%'} 
                        width={'40%'}
                    />
                </div>
                
                
                <form style={{visibility: this.state.isLoading ? 'hidden' : 'visible', display:this.state.isLoading? 'none': 'block'}} onSubmit={this.handleSubmit}>

                    <div className="form-group row">
                        <label className="col-2 col-form-label">Name</label>
                        <div className="col-10">
                            <input value={this.state.name} onChange={this.handleNameChange} type="text" className="form-control" style={{textAlign:"center"}} required/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-2 col-form-label"> Category </label>
                        <div className="col-10">
                            <Dropdown className="form-control" options={categoryOptions} onChange={this.handleCategoryChange} value={this.state.category} placeholder="Select an option" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-2 col-form-label">Goal</label>
                        <div className="col-10">
                            <input className="form-control" value={this.state.goal} onChange={this.handleGoalChange} values={this.state.goal} name="Goal" type='number' style={{textAlign:"center"}} required></input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-2 col-form-label"> Deadline Month </label>
                        <div className="col-10">
                            <Dropdown className="form-control" options={months} onChange={this.handleDeadlineMonthChange} value={this.state.deadlineMonth} placeholder="Select an option" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-2 col-form-label"> Launched Month </label>
                        <div className="col-10">
                            <Dropdown className="form-control" options={months} onChange={this.handleLaunchedMonthChange} value={this.state.launchedMonth} placeholder="Select an option" />
                        </div>
                    </div>

                    <div className="form-group row" >
                        <label className="col-2 col-form-label"> Pledged Amount </label>    
                        <div className="col-10">
                            <input className="form-control"  value={this.state.pledgedAmount} onChange={this.handlePledgedAmountChange} values={this.state.pledgedAmount} name="PledgedAmount" type='number' style={{textAlign:"center"}} required></input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-2 col-form-label"> Backers </label>
                        <div className="col-10">
                            <input className="form-control" value={this.state.backers} onChange={this.handleBackersChange} value={this.state.backers} name="author" type='number' style={{textAlign:"center"}} required></input>
                        </div> 
                    </div>

                    <div className="form-group row">
                        <label className="col-2 col-form-label">Country</label>
                        <div className="col-10">
                            <Dropdown className="form-control" options={countryOptions} onChange={this.handleCountryChange} value={this.state.country} placeholder="Select an option" />
                        </div>
                    </div>

                    <input type="submit" value="Submit" className="btn btn-lg btn-secondary" />
                </form>
            </div>
        );
    }
}

export default Form;