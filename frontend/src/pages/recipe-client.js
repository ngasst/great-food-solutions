import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client as http } from '../utils/http';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';


export default function RecipeClient() {
    const [recipes, setRecipes] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getRecipes();
        }
    }, [])

    function getRecipes() {
        http.get(`/recipes/clients/${id}`)
            .then(({ data: { payload } }) => {
                setRecipes(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const Table = styled.form` 
display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  text-align: center;
  margin-block-start: 2.5em;
  padding: 30px;
`;

    const TitleList = styled(ListGroup)`
font-style: italic ;
font-size: 30px;
`;

    return (
        <>
            <Table>
                <h1>{recipes[0] && recipes[0].client.name}</h1>

                <TitleList horizontal>
                    <ListGroup.Item style={{ width: "50%" }}> Actif </ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> Recette</ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> Ingrédient </ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> Instructions</ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> Emballage </ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> HPP</ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> Prix</ListGroup.Item>
                </TitleList>
                <ListGroup>
                {recipes.map((recipe, i) =>
                    (<>
                        <ListGroup horizontal key={i}>
                            <ListGroup.Item style={{ width: "50%" }} >
                                <input type="checkbox" name="isActif" />
                            </ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>{recipe.name}</ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>
                                <ul>
                                    {recipe.ingredients.map((ingredient, i) =>
                                        (
                                            <li key={i}>{ingredient.name}</li>
                                        )
                                    )}
                                </ul>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>
                                <ol>
                                    {recipe.instructions.map((instruction, i) =>
                                        (
                                            <li key={i}>{instruction}</li>
                                        )
                                    )}
                                </ol>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>To Be Defined</ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>To Be Defined</ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>To Be Calculated</ListGroup.Item>
                        </ListGroup>
                    </>
                    )
                )}
                </ListGroup>
            </Table>
        </>
    )}