import React, { Component } from 'react';
import { connect } from 'react-redux';
import { client as http } from '../utils/http';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 2.5em;
border: solid;
padding: 45px;
border-color: rgba(239, 66, 35, 0.75);
`;

class RecipeForm extends Component {
  

  render() {
    return (
        <StyledForm onSubmit={this.handleSubmit}>
        <h1> Création d'une nouvelle recette</h1>

<Form.Row>
    <Form.Group as={Col} controlId="recipeNameField">
      <Form.Label>Nom de la recette</Form.Label>
      <Form.Control type="nom" name="recipeName" placeholder="Nom de la recette"/>
    </Form.Group>

    <Form.Group as={Col} controlId="baseUnitField">
      <Form.Label>Unité</Form.Label>
      <Form.Control type="baseUnit" name="baseUnitInKgorL" placeholder="" as="select">
        <option>Choix...</option>
        <option>kg</option>
        <option>l</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="clientField">
      <Form.Label>Client</Form.Label>
      <Form.Control type="" name="" placeholder="" as=""/>
    </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Ingrédients</Form.Label>
    <Form.Control as="text" />
  </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Instructions</Form.Label>
    <Form.Control as="textarea" rows="10" />
  </Form.Group>
  </Form.Row>




  

  <Button variant="primary" type="submit">
    Ajouter Recette
  </Button>
  </StyledForm>
        


        )
    }
  };

export default connect()(RecipeForm);