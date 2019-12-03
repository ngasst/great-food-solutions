import React from "react";
import { Navbar, Nav, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const MyList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const MyNav = styled(Navbar)`
    margin-bottom: 1rem;

    p {
        font-size: 10pt;
    }
`;

export function Footer() {
    return (
        <MyNav fixed="bottom" bg="light" expand>
            <Row>
                <Col>
                    <Navbar.Brand href="#home">
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
                            <a href="#">Receipe</a>
                        </li>
                        <li>
                            <a href="#">Client</a>
                        </li>
                        <li>
                            <a href="#">Order</a>
                        </li>
                    </MyList>
                </Col>
                <Col>
                    <div>
                        <h5>Create</h5>
                        <MyList>
                            <li>
                                <a href="#">Receipe</a>
                            </li>
                            <li>
                                <a href="#">Client</a>
                            </li>
                            <li>
                                <a href="#">Order</a>
                            </li>
                        </MyList>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col align="center">
                    <p>@Great Food Solution 2019-2020</p>
                </Col>
            </Row>
        </MyNav>
    );
}
