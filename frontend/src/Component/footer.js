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
width: 101%;
bottom: fixed;
`;

export function Footer() {
    
    return (
        <div>
            {<Wrapper className="footer" style={{textSizeAdjust:"1vw"}}>
                <Row style={{background: "#f8f9fa", padding: "0,5rem 0,5rem"}}>
                    <Col xs>
                        <Navbar.Brand href="/" style={{fontSize: "1vw"}}>
                            Great Food Solutions
                    </Navbar.Brand>
                        <p style={{fontSize: "1vw"}}>
                            Great Food solutions delivers quality food to the world,
                            offering exceptional services and exclusive recipes.
                    </p>
                    </Col>
                    <Col xs style={{textAlign: "center", padding: "0,5rem 0,5rem"}}>
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
                    <Col xs="3" style={{textAlign:"right"}} >
                            <h5 style={{fontSize: "1vw"}}> GREAT FOOD SOLUTIONS</h5>
                           <h5 style={{fontSize: "1vw"}}>
                           Chaussée d'Alsemberg 93,
                           Saint Gilles</h5>
                           
                    </Col>
                </Row>
                <Row  className="bg-secondary" style={{height: "25px", width: "100%"}}>
                    <Col style={{textAlign: "center", height: "50%"}}>
                        <p style={{fontSize: "1vw"}}>ⒸGreatFoodSolutions 2019-2020</p>
                    </Col>
                </Row>
            </Wrapper> }
            </div>
    );
}
