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
import ClientForm from './Component/client-form';

export default function MainRouter() {
  return (
    <>
      <Route exact path="/client/create" component={ClientForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/client/:id" component={Client} />
      <Route exact path="/client" component={Client} />
      <Route exact path="/restaurant" component={Restaurant} />
      <Route exact path="/recipe" component={Recipe} />
      <Route exact path="/bill" component={Bill} />
      <Route exact path="/ingredient" component={Ingredient} />
      <Route exact path="/order" component={Order} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </>
  );
}
