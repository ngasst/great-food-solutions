import React, { Component } from 'react';
import { ingredient as http } from '../utils/http';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 2.5em;
border: solid;
padding: 45px;
border-color: rgba(239, 66, 35, 0.75);
`;

export default class IngredientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            quantity: 0,
            unitBase: "",
            price: 0,
            supplier: "",
            brand: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        if(name==="category") {
            const category = () => {
                switch (e.target.value) {
                    case "Fruits et légumes":
                        return "fruit and vegetables";
                    case "Viandes":
                        return "meat";
                    case "Produits laitier":
                        return "dairy";
                    case "Boulangerie":
                        return "bakery";
                    case "Produits alimentaires séchés":
                        return "dried food products";
                    default:
                        console.log("Non recognized category");
                }
            }
            this.setState({ ...this.state, [name]: category() });
        } else {
            this.setState({ ...this.state, [name]: e.target.value });
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        const inputs = {
            name: this.state.name,
            category: this.state.category,
            quantity: {
                number: this.state.quantity,
                unitBase: this.state.unitBase
            },
            price: this.state.price,
            supplier: this.state.supplier,
            brand: this.state.brand
        };
        http.post("/ingredients", inputs)
            .then(({ data }) => {
                if (data.ok) {
                    this.props.history.push("/ingredient-list");
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    render() {
        return (
            <StyledForm onSubmit={this.handleSubmit} >
                <h1> Création d'un nouvel ingrédient</h1>
                <Form.Row>
                    <Form.Group as={Col} controlId="nomIngredient">
                        <Form.Label>Nom de l'ingrédient</Form.Label>
                        <Form.Control onChange={this.handleChange} name="name" placeholder="Nom de l'ingrédient" />
                    </Form.Group>

                    <Form.Group controlId="categoryIngredient">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange} name="category">
                            <option value="">Choissez une catégorie</option>
                            <option>Fruits et légumes</option>
                            <option>Viandes</option>
                            <option>Produits laitier</option>
                            <option>Boulangerie</option>
                            <option>Produits alimentaires séchés</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="quantityField">
                        <Form.Label>Quantité</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" step="0.001" name="quantity" placeholder="Quantité" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="quantityField">
                        <Form.Label>Unité de mesure</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange} name="unitBase">
                            <option value="">Choissez l'unité</option>
                            <option>kg</option>
                            <option>l</option>
                            <option>piece</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="priceField">
                        <Form.Label>Prix (€)/u</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" step="0.01" min="0" name="price" placeholder="Prix" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="supplierField">
                        <Form.Label>Fournisseur</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="supplier" placeholder="Fournisseur" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="brandField">
                        <Form.Label>Marque</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="brand" placeholder="Marque" />
                    </Form.Group>
                </Form.Row>
                <Button variant="secondary" type="submit" style={{ marginRight: "auto" }}>
                    Ajouter Ingredient</Button>
            </StyledForm>
        )
    }
};