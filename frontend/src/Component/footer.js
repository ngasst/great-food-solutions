import React from "react";
import { Navbar, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const MyList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 12px;
`;

const Wrapper = styled.form`
position: absolute;
width: 100%;
height: 2rem;
bottom: 0;
`;

export function Footer() {
    return (
        <div>
            {/* <Wrapper fluid className="text-center text-md-left" fixed-bottom>
                <Row className="bg-light justify-content-between">
                    <Col>
                        <Navbar.Brand href="/" style={{fontSize: "1vw"}}>
                            Great Food Solutions
                    </Navbar.Brand>
                        <p style={{fontSize: "1vw"}}>
                            Great Food solutions delivers quality food to the world,
                            offering exceptional services and exclusive recipes.
                    </p>
                    </Col>
                    <Col>
                        <h5 style={{fontSize: "1vw"}}>View</h5>
                        <MyList>
                            <li>
                                <a href="Recipe" style={{fontSize: "1vw"}}>Recipe</a>
                            </li>
                            <li>
                                <a href="client" style={{fontSize: "1vw"}}>Client</a>
                            </li>
                            <li>
                                <a href="order" style={{fontSize: "1vw"}}>Order</a>
                            </li>
                        </MyList>
                    </Col>
                    <Col>
                            <h5 style={{fontSize: "1vw"}}>Create</h5>
                            <MyList>
                                <li>
                                    <a href="Recipe" style={{fontSize: "1vw"}}>Recipe</a>
                                </li>
                                <li>
                                    <a href="client" style={{fontSize: "1vw"}}>Client</a>
                                </li>
                                <li>
                                    <a href="order" style={{fontSize: "1vw"}}>Order</a>
                                </li>
                            </MyList>
                    </Col>
                </Row>
                <Row  className="bg-secondary" style={{height: "26px"}}>
                    <Col align="center">
                        <p style={{fontSize: "1vw"}}>@GreatFoodSolutions 2019-2020</p>
                    </Col>
                </Row>
            </Wrapper> */}
            </div>
    );
}
