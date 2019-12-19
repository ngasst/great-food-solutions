import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, ButtonToolbar } from "react-bootstrap";

export const Connection = () => {
    const history = useHistory();
    const redirectToSingIn = () => {
        history.push("/Signin");
    }
    return (
        <ButtonToolbar>
            <Button variant="secondary" onClick={redirectToSingIn}>CONNECTION</Button>
        </ButtonToolbar>
    )
}