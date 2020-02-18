import React from "react";
import { Navbar, Col, Row } from "react-bootstrap";
import styled from "styled-components";


const Wrapper = styled.form`
 position: fixed;
  bottom: 0;
  width: 100%;
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
                
                    <Col xs="3" style={{textAlign:"right", padding: "3rem 0,5rem"}} >
                            <h5 style={{fontSize: "1vw"}}> GREAT FOOD SOLUTIONS</h5>
                           <h5 style={{fontSize: "1vw", padding: "0,5rem 0,5rem"}}>
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
