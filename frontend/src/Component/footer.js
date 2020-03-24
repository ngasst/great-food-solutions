import React from "react";
import { Navbar, Col, Row } from "react-bootstrap";
import styled from "styled-components";


const Wrapper = styled.form`
 position: fixed;
  bottom: 0;
  width: 101%;
  margin-top: 25px;
`;

export function Footer() {
    
    return (
        <div>
            {<Wrapper className="footer" style={{textSizeAdjust:"1vw"}}>
                <Row style={{background: "#f8f9fa"}}>
                    <Col xs style={{ margin: "15px"}}>
                        <Navbar.Brand href="/" style={{fontSize: "1vw"}}>
                            Great Food Solutions
                    </Navbar.Brand>
                        <p style={{fontSize: "1vw"}}>
                        Inspiring – Ubuntu – Professional </p>                    </Col>
                
                    <Col xs="3" style={{textAlign:"right", margin: "15px"}} >
                            <h5 style={{fontSize: "1vw"}}>Contact:</h5>
                           <h5 style={{fontSize: "1vw", padding: "0,5rem 0,5rem"}}>
                           Chaussée d'Alsemberg 93,
                           Saint Gilles</h5>
                           <h5 style={{fontSize: "1vw", padding: "0,5rem 0,5rem"}}>02/880 87 80</h5>
                           
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
