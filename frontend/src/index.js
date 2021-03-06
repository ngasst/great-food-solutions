import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { allReducers } from "./reducers";
import "./index.css";
import App from "./App";
import "./Assets/styles/bootstrap-custom.scss";

const store = createStore(allReducers);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
