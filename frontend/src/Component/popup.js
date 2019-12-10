import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

export const PopUp = () => {
    const [flash, setFlash] = useState("");
    const messageAuth = useSelector(state => state.auth.msg);

    useEffect(() => {
        if (messageAuth) {
            setFlash(messageAuth);
        }
        handleClose();
    }, [messageAuth]);

    const handleClose = () => {
        setTimeout(function () {
            setFlash("");
        }, 3000);
    };

    return (
        <Alert id="alert" variant="primary" show={flash !== ""}>{flash}</Alert>
    )
}