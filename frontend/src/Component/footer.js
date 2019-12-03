
import React from "react";
import {Navbar, Nav, Col, Row } from "react-bootstrap";

export function Footer(){
  return(
    
    <Navbar fixed="bottom" bg="light" expand="lg">



    <Row>
      <Col>
      <Navbar.Brand href="#home">Great Food Solutions</Navbar.Brand>
  <p>Great Food solutions delivers quality food to the world, offering exceptional services and exclusive recipes.</p>
</Col>
<Col>
  <h5>View</h5>
  <ul>
<li><a href="#">Receipe</a></li>
  <li><a href="#">Client</a></li>
  <li><a href="#">Order</a></li>
</ul>
</Col>
<Col>
<div>
<h5>Create</h5>
<ul>
  <li><a href="#">Receipe</a></li>
  <li><a href="#">Client</a></li>
  <li><a href="#">Order</a></li>
  </ul>
</div>

</Col>
</Row>
<Row>
  <Col align="center">
  <h6>Great Food Solution 2019-2020</h6>
  </Col>
</Row>

</Navbar>


  )
}

