
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
margin-bottom: 170px;
`;

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      name: "",
      street: "",
      zipCode: "",
      city: "",
      TVA: "",
      contact: "",
      emailContact: "",
      telContact: "",
      siteInternet: "",
      deliveryDay: "",
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
    http.post("/clients", { name: this.state.clientName })
      .then(({ data: { payload } }) => {
        http.post("/restaurants", {
          name: this.state.restaurantName,
          street: this.state.street,
          city: this.state.city,
          zipCode: this.state.zipCode,
          TVA: this.state.TVA,
          contact: this.state.contact,
          emailContact: this.state.emailContact,
          telContact: this.state.telContact,
          siteInternet: this.state.siteInternet,
          deliveryDay: this.state.deliveryDay,
          client: payload._id
        })
          .then(({ data }) => {
            if (data.ok || data.payload.includes("E11000")) {
              this.props.history.push("/client-list");
            } else {
              // const action = {
              //   type: "AUTH",
              //   token: this.props.token,
              //   message: `Client ${clientName} was not correctly registered !` 
              // }
              // this.props.dispatch(action);
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
        <Form.Group as={Col} controlId="formGridNameCLient">
            <Form.Label>Nom</Form.Label>
            <Form.Control onChange={this.handleChange} type="Nom" name="clientName" placeholder="Nom du Client" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Raison Social</Form.Label>
            <Form.Control onChange={this.handleChange} type="Nom" name="Name" placeholder="Nom" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Adresse Restaurant</Form.Label>
          <Form.Control onChange={this.handleChange} name="street" placeholder="Rue / Avenue / Boulevard" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCodePostal">
            <Form.Label>Code Postal</Form.Label>
            <Form.Control onChange={this.handleChange} name="zipCode" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridVille">
            <Form.Label>Ville</Form.Label>
            <Form.Control onChange={this.handleChange} name="city" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridTVA">
            <Form.Label>Numéro de TVA</Form.Label>
            <Form.Control onChange={this.handleChange} name="TVA" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridContact">
            <Form.Label>Nom du contact</Form.Label>
            <Form.Control onChange={this.handleChange} name="Nom du contact" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmailContact">
            <Form.Label>Email du contact</Form.Label>
            <Form.Control onChange={this.handleChange} name="Email du contact" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTelContact">
            <Form.Label>Numéro de téléphone du contact</Form.Label>
            <Form.Control onChange={this.handleChange} name="Numéro de téléphone" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridSiteInternet">
            <Form.Label>Site Internet</Form.Label>
            <Form.Control onChange={this.handleChange} name="Site Internet" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridDeliveryDay">
            <Form.Label>Informations de livraison</Form.Label>
            <Form.Control onChange={this.handleChange} name="Livraison" />
          </Form.Group>
        </Form.Row>

        <Button variant="secondary" type="submit" style={{ marginRight: "auto" }}>
          Ajouter Client et/ou Restaurants
        </Button>
      </StyledForm>

    )
  }
};

export default connect()(ClientForm);