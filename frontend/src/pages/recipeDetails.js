import React, { useState, useEffect } from 'react';
import { Table, Form, Col, ButtonToolbar, Button } from 'react-bootstrap';
import { client as http } from '../utils/http';

export function RecipeDetails({recipe}) {
    const [client, setClient] = useState({});
    const [ingredients, setIngredients] = useState([]);
    useEffect(()=> {
        getRecipe();
    },[])

    function getRecipe() {
        const rID = recipe._id;
        http.get(`/recipes/${rID}`)
        .then(({ data: { payload } })  => {
            console.log(payload)
            setClient(payload.client);
            setIngredients(payload.ingredients);
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Base unit</th>
                    <th>Client</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                    <th>Order</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{recipe.baseUnit}</td>
                    <td>{client.name}</td>
                    <td>
                        <ul>
                        {ingredients.map((ingredient,i) => (
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