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
            quantity: "",
            price: "",
            supplier: "",
            brand: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let name = e.target.name;
        this.setState({ ...this.state, [name]: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        const inputs = this.state;
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
                        <Form.Control as="select" onChange={this.handleChange} name="category" placeholder="Catégorie">
                            <option value="">Choose a category</option>
                            <option>fruit and vegetables</option>
                            <option>meat</option>
                            <option>dairy</option>
                            <option>bakery</option>
                            <option>dried food products</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="quantityField">
                        <Form.Label>Quantité (en kg)</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="quantity" placeholder="Quantité" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="priceField">
                        <Form.Label>Prix (€)</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="price" placeholder="Prix" />
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