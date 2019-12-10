import React from "react";
import { Nav, Navbar, NavDropdown, Button, ButtonToolbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import GFS from "../Assets/image/GFS.png";
import styled from "styled-components";
import GFS_header from "../Assets/image/Bg_01.png";
import "./header.css";

const HeaderBox = styled.div`
background-image: url('${({ bgUrl }) => bgUrl}');
height: 65px;
`;

const HeaderTitle = styled.h1`
    left: 5.21%;
    right: 5.21%;
    top: 23.08%;
    bottom: 46.15%;
    font-family: "Roboto", sans-serif;
    font-style: bold;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    padding-top: 15px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #ffffff;
`;

const HeaderUndertitle = styled.h1`
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #ffffff;
`;

export function Header() {
    const history = useHistory();
    const redirectToClient = () => {
        history.push("/client");
    }
    const redirectToRecipe = () => {
        history.push("/recipe");
    }
    const redirectToIngredient = () => {
        history.push("/ingredient");
    }
    return (
        <div>
            <Navbar className="bg-light justify-content-between navbar">
                <Navbar.Brand href="/">
                    <img className="gfs_img" src={GFS} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="GFS" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="" onClick={redirectToClient}>Clients</NavDropdown.Item>
                            <NavDropdown.Item href="" onClick={redirectToRecipe}>
                                Recettes
                            </NavDropdown.Item>
                            <NavDropdown.Item href="" onClick={redirectToIngredient}>
                                Ingrédients
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Ajouter client
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="Order">Commandes</Nav.Link>
                        <NavDropdown
                            title="Production"
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item href="">
                                Liste d'Ingrédients
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Tracabilité
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="">Note d'envoi</Nav.Link>
                        <Nav.Link href="Bill">Facturation</Nav.Link>
                    </Nav>
                    <ButtonToolbar>
                        <Button variant="secondary">DECONNECTION</Button>
                    </ButtonToolbar>
                </Navbar.Collapse>
            </Navbar>
            <HeaderBox bgUrl={GFS_header}>
                <HeaderTitle>Great Food Solutions</HeaderTitle>
                <HeaderUndertitle>Production</HeaderUndertitle>
            </HeaderBox>
        </div>
    );
}
