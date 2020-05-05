import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Bookings extends Component {


    handleGuestInfo = (e) =>{
        return this.props.hackersHaveBeenChanged(e);
    };

    handleDateInfo = (e) => {
        return this.props.datesHaveBeenChanged(e);

    };

    render() {
        return (
      <div className="row">
        <TextField
            onChange={this.handleGuestInfo}
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the hacker list (one hacker per line)"
        />
        <TextField
            onChange={this.handleDateInfo}

            className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the date range for each hacker's stay (one range per line)"
        />
        <Button onClick={this.props.getMeals} variant="outlined" color="primary" className="block-center">Get Meals Schedule</Button>
        </div>);
    }
}

export default Bookings;