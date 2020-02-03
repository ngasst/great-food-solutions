import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class IngredientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientName: "",
            categoryName: "",
            quantityNumber: "",
            priceAndCurrency: "",
            supplierName: "",
            brandName: ""
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
        http.post("/ingredients", { name: this.state.ingredientName })
            .then(({ data: { payload } }) => {
                const ingredientName = payload.name;
            })
            .catch(err => {
                console.log(err.message);
            })

    }

    render() {
        return (
            <StyledForm onSubmit={this.handleSubmit}>
                <h1> Création d'un nouvel ingrédient</h1>
                <Form.Row>
                    <Form.Group as={Col} controlId="nomIngredient">
                        <Form.Label>Nom de l'ingrédient</Form.Label>
                        <Form.Control onChange={this.handleChange} name="ingredientName" placeholder="Nom de l'ingrédient" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="categoryIngredient">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control onChange={this.handleChange} name="categoryName" as="select">
                            <option>Choix...</option>
                            <option>Fruits et légumes</option>
                            <option>Boucherie</option>
                            <option>Produits laitiers</option>
                            <option>Boulangerie</option>
                            <option>Produits secs</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="quantityField">
                        <Form.Label>Quantité (en kg)</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" name="quantityNumber" placeholder="Quantité" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="priceField">
                        <Form.Label>Prix (€)</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" name="priceAndCurrency" placeholder="Prix" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="supplierField">
                        <Form.Label>Fournisseur</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" name="supplierName" placeholder="Fournisseur" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="brandField">
                        <Form.Label>Marque</Form.Label>
                        <Form.Control type="text" name="brandName" placeholder="Marque" />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit" style={{marginRight: "auto"}}>
                    Ajouter Ingrédient
  </Button>
            </StyledForm>

        )
    }
};


export default connect()(IngredientForm);