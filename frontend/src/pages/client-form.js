
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

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName:     "",
      restaurantName: "",
      street:         "",
      area:           "",
      zipCode:        "",
      city:           ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    this.setState({...this.state, [name]: e.target.value});
  };

  handleSubmit(e) {
    e.preventDefault();
    http.post("/clients", {name: this.state.clientName})
      .then(({ data: { payload } }) => {
        const clientName = payload.name;
        http.post("/restaurants", {
          name:     this.state.restaurantName,
          street:   this.state.street,
          city:     this.state.city,
          zipCode:  this.state.zipCode,
          client:   payload._id
        })
          .then(({ data }) => {
            if(data.ok) {
              const action = {
                type: "AUTH",
                token: this.props.token,
                message: `Client ${clientName} is correctly registered !` 
              }
              this.props.dispatch(action);
            }
          })
          .catch(err => {
            console.log(err.message);
          })
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h1>Création d'un nouveau client</h1>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nom</Form.Label>
            <Form.Control onChange={this.handleChange} type="Nom" name="clientName" placeholder="Nom du Client" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRestaurant1">
            <Form.Label>Restaurant</Form.Label>
            <Form.Control onChange={this.handleChange} type="Restaurant" name="restaurantName" placeholder="Restaurant" />
          </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Adresse Restaurant</Form.Label>
            <Form.Control onChange={this.handleChange} name="street" placeholder="Rue / Avenue / Boulevard" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCommune">
              <Form.Label>Commune</Form.Label>
              <Form.Control onChange={this.handleChange} name="area" as="select">
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
                <option>Anderlecht</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCodePostal">
              <Form.Label>Code Postal</Form.Label>
              <Form.Control onChange={this.handleChange} name="zipCode" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridVille">
              <Form.Label>Ville</Form.Label>
              <Form.Control onChange={this.handleChange} name="city" />
            </Form.Group>


          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Confirmer" />
          </Form.Group>

          <Button variant="secondary" type="submit" style={{marginRight: "auto"}}>
            Ajouter Client
        </Button>
      </StyledForm>

        )
      }
    };

export default connect()(ClientForm);