
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 1em;
`;



class ClientForm extends Component {
  render() {
    return (
      <StyledForm>
        <h1> Création d'un nouveau client</h1>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="Nom" placeholder="Nom du Client" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRestaurant1">
            <Form.Label>Restaurant</Form.Label>
            <Form.Control type="Restaurant" placeholder="Restaurant" />
          </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Addresse Restaurant</Form.Label>
            <Form.Control placeholder="Rue / Avenue / Boulevard" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCommune">
              <Form.Label>Commune</Form.Label>
              <Form.Control as="select">
                <option>Choix...</option>
                <option>Saint-Gilles</option>
                <option>Etterbeek</option>
                <option>Woluwe-Saint-Pierre</option>
                <option>Woluwe-Saint-Lambert</option>
                <option>Ixelles</option>
                <option>Kraainem</option>
                <option>Saint-Josse</option>
                <option>Bruxelles</option>
                <option>Uccle</option>
                <option>Forest</option>
                <option>Auderghem</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCodePostal">
              <Form.Label>Code Postal</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridVille">
              <Form.Label>Ville</Form.Label>
              <Form.Control />
            </Form.Group>


          </Form.Row>

          <Form.Group id="formGridCheckbox" style={{textAlign: 'center'}}>
            <Form.Check type="checkbox" label="Confirmer" />
          </Form.Group>

          <Button variant="secondary" type="submit" style={{texlignLast: 'center'}}>
            Ajouter Client
        </Button>
      </StyledForm>

        )
      }
    };
    
    
    
export default ClientForm;