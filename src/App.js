import React, {Component} from 'react';
import Bookings from './components/Bookings';
import Meals from './components/Meals';
import Error from './components/Error';


const _ = require('lodash');

class App extends Component {


    state = {
        errors: [],
        meals: [],
        hackers: 'hazem',
        dates: '2010-10-22 to 2010-10-30'
    };


    constructor(props) {
        super(props);
        this.appendMealsForHacker = this.appendMealsForHacker.bind(this);
    }

    hackersHaveBeenChanged = (e) => {

        this.setState({
            hackers: e.target.value
        })
    }

    datesHaveBeenChanged = (e) => {
        this.setState({
            dates: e.target.value
        });
    }

    setMales = (meals) => {

        meals.sort((a, b) => {
            return a.id - b.id;
        });

        this.setState({
            meals,
            hackers:'',
            dates:'',
        });
    };


    clearErrors = () => {
        this.setState({
            errors: []
        });
    }

    getMeals = () => {

        this.clearErrors();
        // validate hackers values && dates values

        let hackers = this.splitLines(this.state.hackers);
        let dates = this.splitLines(this.state.dates);

        if(!this.state.hackers)
            return;


        hackers.forEach((hackerName, key) => {

            let durationDate = this.splitDates(dates[key]);

            if (!this.validDuration(durationDate)) {

                this.appendErrorForHacker(hackerName);
                return;
            }

            this.appendMealsForHacker(hackerName, durationDate[0], durationDate[1]);
        });


    };


    validDuration(dates) {

        let startDate = dates[0];
        let endDate = dates[1];

        return !(!this.validateDateFormate(startDate) || !this.validateDateFormate(endDate)
            || !this.validateDatePeriod(startDate, endDate));


    }

    appendErrorForHacker(hackerName) {
        this.setState((state) => {
            let errors = [...state.errors];
            errors.push(hackerName);

            return {
                errors
            };

        })
    };

    async appendMealsForHacker(hackerName, startDate, endDate) {


        let dates = getDates(startDate, endDate);

        let newMeals = _.cloneDeep(this.state.meals);

        let i = 0;
        let date;
        let breakfast;
        let lunch;
        let dinner;
        let dateString;

        while (dates.length > i) {

            date = dates[i];

            dateString = date.toISOString().slice(0, 10);

            breakfast = {
                hackerName: hackerName,
                id: date.getTime() + 0.1,
                name: 'Breakfast',
                time: 'morning',
                date: dateString
            };

            lunch = {
                hackerName: hackerName,
                id: date.getTime() + 0.2,
                name: 'Lunch',
                time: 'afternoon',
                date: dateString

            };

            dinner = {
                hackerName: hackerName,
                id: date.getTime() + 0.3,
                name: 'Dinner',
                time: 'night',
                date: dateString
            };


            newMeals.push(breakfast);
            newMeals.push(lunch);
            newMeals.push(dinner);
            ++i;
        }


        this.setMales(newMeals);


    }

    splitLines(string) {
        return string.split("\n");
    }

    splitDates(dateString) {
        return dateString.split("to").map((string) => {
            return string.trim();
        });
    }


    validateDateFormate(dateString) {

        if (!dateString.match(/^\d{4}-\d{2}-\d{2}$/))
            return false;
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    validateDatePeriod(startDate, endDate) {
        return (new Date(endDate)).getTime() >= (new Date(startDate)).getTime();
    }


    render() {
        return (<div className="container-fluid">
            <center>
                <h2>Hacker Hostel</h2>
            </center>
            <div className="container">
                <Bookings
                    hackersHaveBeenChanged={this.hackersHaveBeenChanged}
                    datesHaveBeenChanged={this.datesHaveBeenChanged}
                    getMeals={this.getMeals}
                />
                <Error errors={this.state.errors}/>
                <Meals meals={this.state.meals}/>
            </div>
        </div>);
    }

}

const addDays = function (currentDate) {

    var date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();

    var currentDate = new Date(startDate);

    while (currentDate.getTime() <= (new Date(stopDate)).getTime() ) {

        dateArray.push(currentDate);
        currentDate = addDays(currentDate);
    }
    return dateArray;
}

export default App;