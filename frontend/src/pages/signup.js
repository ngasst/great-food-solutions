import React, { useState } from 'react';
import {Form, Col, Row, Button } from 'react-bootstrap';
import { client } from '../utils/http';

export const SignUp = ({history}) => {
    const [state, setState] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        setState({...state, [name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const path = "/auth/signup";
        const body = {
            email: state.email,
            password: state.password
        }
        client.post(path, body)
            .then(({data: {message}}) => {
                console.log(message);
                history.push("/signin");
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
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
            <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Confirm password
                </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={handleChange} type="password" name="ConfirmPassword" placeholder="Password" required />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Sign up</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}