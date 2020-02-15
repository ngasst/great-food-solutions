import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipe as http } from '../utils/http';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const TitleList = styled(ListGroup)`
font-style: italic ;
font-size: 30px;
`;

export default function RecipeDetails() {
    const [recipes, setRecipes] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getRecipes();
        }
    }, [])

    function getRecipes() {
        http.get(`/recipes/recipeDetails/${id}`)
            .then(({ data: { payload } }) => {
                setRecipes(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

 
    return (
        <>
            <Form>
                <h1>{recipes.name}</h1>
                <TitleList horizontal style={{ width: "800px" }}>
                    <ListGroup.Item style={{ width: "25%" }}> Base unit </ListGroup.Item>
                    <ListGroup.Item style={{ width: "25%" }}> Client </ListGroup.Item>
                    <ListGroup.Item style={{ width: "25%" }}> Ingredient </ListGroup.Item>
                    <ListGroup.Item style={{ width: "25%" }}> Instructions </ListGroup.Item>
                </TitleList>
                <ListGroup>
                    {recipes.map(recipe =>
                        (<>
                            <ListGroup horizontal key={recipe._id} style={{ width: "800px" }}>
                                <ListGroup.Item style={{ width: "25%" }}>{recipe.baseUnit}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "25%" }}>{recipe.client}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "25%" }}>{recipe.ingredient}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "25%" }}>{recipe.instructions}</ListGroup.Item>
                            </ListGroup>
                        </>
                        )
                    )}
                </ListGroup>

            </Form>
        </>
    )
}
