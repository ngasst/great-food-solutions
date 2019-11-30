import React, { useState, useEffect } from 'react';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';
import { RecipeDetails } from './recipeDetails';
import { client } from '../utils/http';
 
export default function Recipe() {
    const [state, setState] = useState({recipes:[]});
    useEffect(()=>{
        getRecipes();
    },[]);

    function getRecipes() {
        client.get("/recipes")
            .then(res  => {
                setState({...state,recipes: res.data.payload})})
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div>
            <h1>Recipe</h1>
            <Tab.Container id="list-group-tabs-example">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                        {state.recipes.map(recipe => (
                            <ListGroup.Item action href={`#${recipe._id}`} key={recipe._id}>
                            {recipe.name}
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                        {state.recipes.map(recipe => (
                            <Tab.Pane eventKey={`#${recipe._id}`} key={recipe._id}>
                                <RecipeDetails recipe={recipe} />
                            </Tab.Pane>
                        ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}