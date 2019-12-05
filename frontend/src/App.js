import MainRouter from "./routes";
import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Shell } from "./pages/shell";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Shell>
                    <Switch>
                        <MainRouter />
                    </Switch>
                </Shell>
            </BrowserRouter>
        )
    }
}



export default App;
