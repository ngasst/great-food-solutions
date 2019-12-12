import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/home';
import Client from './pages/client';
import Restaurant from './pages/restaurant';
import Recipe from './pages/recipe';
import Order from './pages/order';
import Bill from './pages/bill';
import Ingredient from './pages/ingredient';
import { SignIn } from './pages/signin';
import { SignUp } from './pages/signup';
import RecipeDetails from './pages/recipeDetails';
import IngredientForm from './pages/ingredient-form';
import IngredientDayList from './pages/ingredient-day-list';
import Production from './pages/production';
import Delivery from './pages/delivery';
import DeliveryForm from './pages/delivery-form';
import Tracability from './pages/tracability';
import ClientForm from './pages/client-form';


export default function MainRouter() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/client/:id" component={Client} />
      <Route exact path="/client" component={Client} />
      <Route exact path="/client-form" component={ClientForm} />
      <Route exact path="/restaurant" component={Restaurant} />
      <Route exact path="/recipe" component={Recipe} />
      <Route exact path="/recipeDetails" component={RecipeDetails} />
      <Route exact path="/bill" component={Bill} />
      <Route exact path="/ingredient" component={Ingredient} />
      <Route exact path="/ingredient-form" component={IngredientForm} />
      <Route exact path="/ingredient-day-list" component={IngredientDayList} />
      <Route exact path="/production" component={Production} />
      <Route exact path="/order" component={Order} />
      <Route exact path="/delivery" component={Delivery} />
      <Route exact path="/delivery-form" component={DeliveryForm} />
      <Route exact path="/tracability" component={Tracability} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </>
  );
}
