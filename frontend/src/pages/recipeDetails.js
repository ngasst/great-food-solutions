import React, { useState, useEffect } from 'react';
import { Table, Form, Col, ButtonToolbar, Button } from 'react-bootstrap';
import { client } from '../utils/http';

export function RecipeDetails({recipe}) {
    const [state, setState] = useState({client:{}, ingredients:[]});
    useEffect(()=> {
        getClient();
        getIngredients();
    },[])

    function getClient() {
        client.get(`/clients/${recipe.client}`)
        .then(res  => {
            console.log(res)
            setState({...state, client: res.data.payload})})
        .catch(err => {
            console.error(err);
        })
    }

    function getIngredients() {
        client.get(`/ingredients/${recipe.ingredients}`)
        .then(res  => {
            console.log(res)
            setState({...state, ingredients: res.data.payload})})
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Base unit</th>
                    <th>Client</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                    <th>Order</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{recipe.name}</td>
                    <td>{recipe.baseUnit}</td>
                    <td>{state.client.name}</td>
                    <td>
                        <ul>
                        {state.ingredients.map((ingredient,i) => (
                            <li key={i}>{ingredient.name}</li>
                        ))}
                        </ul>
                    </td>
                    <td>
                        <ol>
                        {recipe.instructions.map((instructions,i) => (
                            <li key={i}>{instructions}</li>
                        ))}
                        </ol>
                    </td>
                    <td>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="Quantity" />
                            </Col>
                            <Col>
                                <ButtonToolbar>
                                    <Button variant="primary">Order</Button>
                                </ButtonToolbar>
                            </Col>
                        </Form.Row>
                    </Form>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}