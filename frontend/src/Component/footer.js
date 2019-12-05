import React from "react";
import { Navbar, Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";

const MyList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 12px;
`;


export default function Footer() {
    return (
        <div className="fixed-bottom">
            <Container fluid className="text-center text-md-left">
                <Row className="bg-light justify-content-between">
                    <Col>
                        <Navbar.Brand href="/">
                            Great Food Solutions
                    </Navbar.Brand>
                        <p>
                            Great Food solutions delivers quality food to the world,
                            offering exceptional services and exclusive recipes.
                    </p>
                    </Col>
                    <Col>
                        <h5>View</h5>
                        <MyList>
                            <li>
                                <a href="Recipe">Recipe</a>
                            </li>
                            <li>
                                <a href="client">Client</a>
                            </li>
                            <li>
                                <a href="order">Order</a>
                            </li>
                        </MyList>
                    </Col>
                    <Col>
                            <h5>Create</h5>
                            <MyList>
                                <li>
                                    <a href="Recipe">Recipe</a>
                                </li>
                                <li>
                                    <a href="client">Client</a>
                                </li>
                                <li>
                                    <a href="order">Order</a>
                                </li>
                            </MyList>
                    </Col>
                </Row>
                <Row  className="bg-secondary" >
                    <Col align="center">
                        <p>@GreatFoodSolutions 2019-2020</p>
                    </Col>
                </Row>
            </Container>
            </div>
    );
}
