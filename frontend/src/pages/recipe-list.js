import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../utils/http';
import styled from 'styled-components';
import {ListGroup, Form, Button} from 'react-bootstrap';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 1em;
border: solid;
padding: center;
padding-top: 20px;
padding-bottom: 20px;
border-color: rgba(239, 66, 35, 0.75);
margin-bottom: 170px;
`;

const Table = styled(Form)` 
display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  text-align: center;
  padding: center;
`;

const TitleList = styled(ListGroup)`
font-style: italic, bold ;
font-size: 3vw;
`;

export default function RecipeList({history}) {
    const [state, setState] = useState({ recipes: [] });
    useEffect(() => {
        getRecipes();
    }, []);

    function getRecipes() {
        client.get("/recipes")
            .then(({ data: { payload } }) => {
                setState({ ...state, recipes: payload })
            })
            .catch(err => {
                console.error(err);
            })
    }
    const toCreateRecipe = () => {
        history.push("/recipe-form");
    }

    return (
        <StyledForm>
            <Table>
            <h1>Liste des recettes</h1>

                <TitleList horizontal>
                    <ListGroup.Item style={{width: "65%"}} variant="flush"> Recettes </ListGroup.Item>
                    <ListGroup.Item style={{width: "65%"}} variant="flush"> Clients</ListGroup.Item>
                </TitleList>
                <ListGroup>
                    {state.recipes && state.recipes.map((recipe, i) =>
                        (
                        <ListGroup key={i} horizontal>
                            <ListGroup.Item style={{width: "60%"}} variant="flush"><Link className="link-router" to={`/client/${recipe.client._id}`}>{recipe.name}</Link></ListGroup.Item>
                            <ListGroup.Item style={{width: "60%"}} variant="flush"><Link className="link-router" to={`/client/${recipe.client._id}`}>{recipe.client.name}</Link></ListGroup.Item>
                        </ListGroup>
                        )
                    )}
                </ListGroup>
                <Button variant="secondary" onClick={toCreateRecipe} style={{ margin: "15px" }}>
                    Créer une nouvelle recette
            </Button>
            </Table>
        </StyledForm>
    );
}