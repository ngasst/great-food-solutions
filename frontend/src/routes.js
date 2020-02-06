import React from 'react';
import { Route } from 'react-router-dom';
import { requireAuth, requireNoAuth } from './HOCs';
import Home from './pages/home';
import ClientList from './pages/client-list';
import Restaurant from './pages/restaurant';
import RecipeList from './pages/recipe-list';
import { Client } from './pages/client';
import RecipeClient from './pages/recipe-client';
import RestaurantClient from './pages/restaurant-client';
import Order from './pages/order';
import Bill from './pages/bill';
import Ingredient from './pages/ingredient';
import { SignIn } from './pages/signin';
import { SignUp } from './pages/signup';
import RecipeDetails from './pages/recipeDetails';
import IngredientDayList from './pages/ingredient-day-list';
import Production from './pages/production';
import Delivery from './pages/delivery';
import DeliveryForm from './pages/delivery-form';
import Tracability from './pages/tracability';
import ClientForm from './pages/client-form';
import RecipeForm from './pages/recipe-form';
import IngredientForm from './pages/ingredient-form';


export default function MainRouter() {
  return (
    <>
      <Route exact path="/" component={requireAuth(Home)} />
      <Route exact path="/client/:id" component={requireAuth(Client)} />
      <Route exact path="/client/:id/recipes" component={requireAuth(RecipeClient)} />
      <Route exact path="/client/:id/restaurants" component={requireAuth(RestaurantClient)} />
      <Route exact path="/clientlist" component={requireAuth(ClientList)} />
      <Route exact path="/client-form" component={requireAuth(ClientForm)} />
      <Route exact path="/restaurant" component={requireAuth(Restaurant)} />
      <Route exact path="/recipelist" component={requireAuth(RecipeList)} />
      <Route exact path="/recipeDetails" component={requireAuth(RecipeDetails)} />
      <Route exact path="/bill" component={requireAuth(Bill)} />
      <Route exact path="/ingredient" component={requireAuth(Ingredient)} />
      <Route exact path="/ingredient-form" component={requireAuth(IngredientForm)} />
      <Route exact path="/ingredient-day-list" component={requireAuth(IngredientDayList)} />
      <Route exact path="/production" component={requireAuth(Production)} />
      <Route exact path="/order" component={requireAuth(Order)} />
      <Route exact path="/delivery" component={requireAuth(Delivery)} />
      <Route exact path="/delivery-form" component={requireAuth(DeliveryForm)} />
      <Route exact path="/tracability" component={requireAuth(Tracability)} />
      <Route exact path="/signin" component={requireNoAuth(SignIn)} />
      <Route exact path="/signup" component={requireNoAuth(SignUp)} />
      <Route exact path="/recipe-form" component={requireAuth(RecipeForm)} />


    </>
  );
}
