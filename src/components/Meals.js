import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

const Meals = (({meals}) => {


    return (<div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
        <ol id="list">
            <div>

                {meals.map((meal, key) => {

                    return <li key={key} className={meal.time}>{meal.name} for {meal.hackerName} on {meal.date}</li>;

                })}
            </div>
        </ol>
    </div>);
});
export default Meals;
