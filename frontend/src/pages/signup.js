import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { client } from '../utils/http';
import styled from 'styled-components';
import GFS from "../Assets/image/GFS.png";



const Wrapper = styled.div`
  align-items: center;
  margin: auto;
  margin-top: 50px;
  padding: 50px;
  width: 50%;
  border: 5px solid;
  border-color: rgba(239, 66, 35, 0.75);
  border-radius: 10px 100px / 120px;
  margin-bottom: 170px;
`;

const Titre = styled.h1`
  margin: 45px;
  background-image: url('${({ bgUrl }) => bgUrl}');
`;


export const SignUp = ({ history }) => {
    const [state, setState] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        setState({ ...state, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const path = "/auth/signup";
        const body = {
            email: state.email,
            password: state.password
        }
        client.post(path, body)
            .then(({ data: { message } }) => {
                const action = {
                    type: "AUTH",
                    message
                }
                dispatch(action);
                history.push("/signin");
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
    <>
        <Titre>
        <img className="gfs_img" src={GFS} alt="" style={{ width: "180px",
    height: "90px"}}/>
        </Titre>
        <Wrapper>
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
                        Mot de passe
                </Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange} type="password" name="password" placeholder="Mot de passe" required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
Confirmer mot de passe                </Form.Label>
                    <Col sm={10}>
                        <Form.Control onChange={handleChange} type="password" name="ConfirmPassword" placeholder="Mot de passe" required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">S'ENREGISTRER</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Wrapper>
        </>
    )
}