import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
 
import Home from './pages/Home'
import Client from './pages/Client'
import Restaurant from './pages/Restaurant'
import Recipe from './pages/Recipe'


 
export default function MainRouter () {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/client" component={Client}/>
                <Route path="/restaurant" component={Restaurant}/>
                <Route path="/recipe" component={Recipe}/>
            </div>
        </Router>
    )
}