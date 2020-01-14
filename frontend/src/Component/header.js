import React from "react";
import { useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Connection } from './connection';
import { Deconnection } from './deconnection';
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
    const token = useSelector(state => state.auth.token);
    const redirectToClient = () => {
        history.push("/clientlist");
    }
    const redirectToRecipe = () => {
        history.push("/recipelist");
    }
    const redirectToIngredient = () => {
        history.push("/ingredient");
    }
    const redirectToClientForm = () => {
        history.push("/client-form");
    }
    const redirectToOrder = () => {
        history.push("/order");
    }
    const redirectToOrderForm = () => {
        history.push("/order-form");
    }
    const redirectToProduction = () => {
        history.push("/production");
    }
    const redirectToIngredientDayList = () => {
        history.push("/ingredientDayList");
    }
    const redirectToTracability = () => {
        history.push("/tracability");
    }
    const redirectToDelivery = () => {
        history.push("/delivery");
    }
    const redirectToDeliveryForm = () => {
        history.push("/delivery-form");
    }
    const redirectToBill = () => {
        history.push("/Bill");
    }

    const coDeco = () => {
        if(token) {
            return (
                <Deconnection />
            )
        } else {
            return (
            <Connection />
            )
        }
    }

    const navBar = () => {
        if(token) {
            return (
                <Nav className="mr-auto">
                    <NavDropdown title="GFS" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="" onClick={redirectToClient}>
                            Clients
                        </NavDropdown.Item>
                        <NavDropdown.Item href="" onClick={redirectToRecipe}>
                            Recettes
                        </NavDropdown.Item>
                        <NavDropdown.Item href="" onClick={redirectToIngredient}>
                            Ingrédients
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="" onClick={redirectToClientForm}>
                            Ajouter client
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Commandes" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="" onClick={redirectToOrder}>
                            Commande
                        </NavDropdown.Item>
                        <NavDropdown.Item href="" onClick={redirectToOrderForm}>
                            Ajouter Commande
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Production" id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="" onClick={redirectToProduction}>
                            Production
                        </NavDropdown.Item>
                        <NavDropdown.Item href="" onClick={redirectToIngredientDayList}>
                            Liste d'Ingrédients
                        </NavDropdown.Item>
                        <NavDropdown.Item href="" onClick={redirectToTracability}>
                            Tracabilité
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Note d'envoi" id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="" onClick={redirectToDelivery}>
                            Note d'envoi
                        </NavDropdown.Item>
                        <NavDropdown.Item href="" onClick={redirectToDeliveryForm}>
                            Ajout de note d'envoi
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Factures" id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="" onClick={redirectToBill}>
                            Facturation
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }
    }
    return (
        <div>
            <Navbar className="bg-light justify-content-between navbar">
                <Navbar.Brand href="/">
                    <img className="gfs_img" src={GFS} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {navBar()}
                    {coDeco()}
                </Navbar.Collapse>
            </Navbar>
            <HeaderBox bgUrl={GFS_header}>
                <HeaderTitle>Great Food Solutions</HeaderTitle>
                <HeaderUndertitle>Production</HeaderUndertitle>
            </HeaderBox>
        </div>
    );
}
