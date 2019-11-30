import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import Client from "./pages/client";
import Restaurant from "./pages/restaurant";
import Recipe from "./pages/recipe";

export default function MainRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/client" component={Client} />
                <Route exact path="/restaurant" component={Restaurant} />
                <Route exact path="/recipe" component={Recipe} />
            </Switch>
        </Router>
    );
}
