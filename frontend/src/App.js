import MainRouter from "./routes";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from "react-router-dom";
import { Shell } from "./pages/shell";
import { PopUp } from "./Component/popup";

class App extends Component {
    componentDidMount() {
        const token = localStorage.getItem("token");
        if(token) {
        const action = {
            type: "AUTH",
            token
        }
        this.props.dispatch(action);
        }
    }
    render() {
        return (
            <BrowserRouter>
                <Shell>
                    <Switch>
                        <MainRouter />
                    </Switch>
                    <PopUp />
                </Shell>
            </BrowserRouter>
        )
    }
}

export default connect()(App);
