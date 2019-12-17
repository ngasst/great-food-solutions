import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { client } from '../utils/http';
import styled from "styled-components"

export const SignIn = ({ history }) => {
    const [state, setState] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        setState({ ...state, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const path = "/auth/signin";
        client.post(path, state)
            .then(({ data }) => {
                const action = {
                    type: "AUTH",
                    token: data.token,
                    message: "Signed in !"
                }
                dispatch(action);
                history.push("/recipe");
            })
            .catch(err => {
                console.error(err);
            })
    }

    const BoxForm = styled(Form)`

align-items: center; 
margin: auto;
margin-top: 70px;
padding: 50px;
width: 50%;
border: 5px solid;
border-color: rgba(239, 66, 35, 0.75);
border-radius: 10px 100px / 120px;
`;

const Titre = styled.h1`
margin-top: 50px;
`;


    return (
        <>
        <Titre> Bienvenu</Titre>
        <BoxForm onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={handleChange} type="email" name="email" placeholder="Email" required />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Password
                </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={handleChange} type="password" name="password" placeholder="Password" required />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button variant="secondary" type="submit">Sign in</Button>
                </Col>
            </Form.Group>
        </BoxForm>
        </>
    )
}