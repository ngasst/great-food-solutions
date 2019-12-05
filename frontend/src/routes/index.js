import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Bill from '../pages/bill';
import Client from '../pages/client';
import Home from '../pages/home';
import Ingredient from '../pages/ingredient';
import Order from '../pages/order';
import Recipe from '../pages/recipe';
import RecipeDetails from '../pages/recipeDetails';
import Restaurant from '../pages/restaurant';

export default function Routes() {
    return (
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Bill" component={Bill} />
        <Route path="/Client" component={Client} />
        <Route path="/Ingredient" component={Ingredient} />
        <Route path="/Order" component={Order} />
        <Route path="/Recipe" component={Recipe} />
        <Route path="/RecipeDetails" component={RecipeDetails} />
        <Route path="/Restaurant" component={Restaurant} />   
        <Route component={Home} />
        </Switch>
    );
}