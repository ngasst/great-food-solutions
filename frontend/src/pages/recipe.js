import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../utils/http';
import styled from 'styled-components';
import ListGroup from 'react-bootstrap/ListGroup';


export default function Recipe() {
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

    const Table = styled.form` 
display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  text-align: center;
  margin-block-start: 2.5em;
  padding: 15px;
`;

const TitleList = styled(ListGroup)`
font-style: italic ;
font-size: 30px;
`;

    return (
        <>
            <Table>
            <h1>Liste des recettes chez GFS</h1>

                <TitleList horizontal variant="flush">
                    <ListGroup.Item style={{width: "65%"}}> Recettes </ListGroup.Item>
                    <ListGroup.Item style={{width: "65%"}}> Client</ListGroup.Item>
                </TitleList>
                <ListGroup>
                    {state.recipes && state.recipes.map((recipe, i) =>
                        (
                        <ListGroup key={i} horizontal variant="flush">
                            <ListGroup.Item style={{width: "60%"}}>{recipe.name}</ListGroup.Item>
                            <ListGroup.Item style={{width: "60%"}}><Link className="link-router" to={`/client/${recipe.client._id}`}>{recipe.client.name}</Link></ListGroup.Item>
                        </ListGroup>
                        )
                    )}
                </ListGroup>
            </Table>
        </>
    );
}