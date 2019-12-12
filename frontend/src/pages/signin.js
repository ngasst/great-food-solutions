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
margin: 60px;
padding: 15px;
`;

    return (
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
                    <Button type="submit">Sign in</Button>
                </Col>
            </Form.Group>
        </BoxForm>
    )
}