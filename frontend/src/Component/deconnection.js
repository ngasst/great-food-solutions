import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Button, ButtonToolbar } from "react-bootstrap";

export const Deconnection = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const disconnect = () => {
        const action = {
            type: "AUTH",
            token: null,
            message: "Disconnected."
        }
        dispatch(action);
        localStorage.removeItem("token");
        history.push("/");
    }
    return (
        <ButtonToolbar>
            <Button variant="secondary" onClick={disconnect}>DECONNECTION</Button>
        </ButtonToolbar>
    )
}