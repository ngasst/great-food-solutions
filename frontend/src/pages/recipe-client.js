import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client as http } from '../utils/http';
import { Form, ListGroup, Button, Modal, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 1em;
border: solid;
padding: center;
padding-top: 20px;
padding-bottom: 20px;
border-color: rgba(239, 66, 35, 0.75);
`;

const Table = styled(Form)` 
display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  text-align: center;
  font-size: 1vw;
`;

const TitleList = styled(ListGroup)`
font-style: italic ;
font-size: 2vw;
`;


export default function RecipeClient({ history }) {
    const [recipes, setRecipes] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [target, setTarget] = useState({});
    const [newRecipe, setNewRecipe] = useState({ id: "", name: "", ingredient: "", instruction: "" })
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getRecipes();
        }
    }, [])

    function getRecipes() {
        http.get(`/recipes/clients/${id}`)
            .then(({ data: { payload } }) => {
                console.log(payload)
                setRecipes(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function modifyRecipe(e) {
        e.preventDefault();
        const recipeInputs = {
            name: newRecipe.name,
            ingredient: newRecipe.ingredient,
            instruction: newRecipe.instruction,
            zipcpriceode: newRecipe.price,
        };
        Object.keys(recipeInputs).map(key => {
            if (recipeInputs[key] === "") {
                return recipeInputs[key] = target[key];
            }
            if (recipeInputs[key] === "undefined") {
                return recipeInputs[key] = "";
            } else return recipeInputs[key];
        })
        if (!Object.values(recipeInputs).includes("")) {
            http.put("recipe", recipeInputs)
                .then(() => {
                    setShowMod(false);
                    history.push("/recipes/clients/${id}");
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    function removeRecipe() {
        http.delete(`/recipes/clients/${target.id}`)
            .then(() => {
                setShowRem(false);
                history.push("/recipes/clients/${id}");
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        setNewRecipe({ ...newRecipe, [name]: e.target.value });

    }

    const handleClose = () => {
        setShowRem(false);
        setShowMod(false);
    }

    const handleShow = (e) => {
        if (e.target.getAttribute("id").split("-")[1] === "s") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const ingredient = e.target.getAttribute("name").split("-")[1];
            const instruction = e.target.getAttribute("name").split("-")[2];
            const price = e.target.getAttribute("name").split("-")[3];
            setTarget({ id, name, ingredient, instruction, price });
            setShowRem(true);
        } else if (e.target.getAttribute("id").split("-")[1] === "m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const ingredient = e.target.getAttribute("name").split("-")[1];
            const instruction = e.target.getAttribute("name").split("-")[2];
            const price = e.target.getAttribute("name").split("-")[3];
            setTarget({ id, name, ingredient, instruction, price });
            setNewRecipe({ ...newRecipe, id });
            setShowMod(true);
        }
    }

    const toCreateRecipe = () => {
        history.push("/recipe-form");
    }

    return (
        <StyledForm>
            <Table>
                <h1>{recipes[0] && recipes[0].client.name}</h1>

                <TitleList horizontal style={{ width: "100%" }}>
                    <ListGroup.Item style={{ width: "10%" }}> Actif </ListGroup.Item>
                    <ListGroup.Item style={{ width: "17%" }}> Recette</ListGroup.Item>
                    <ListGroup.Item style={{ width: "17%" }}> Ingrédients </ListGroup.Item>
                    <ListGroup.Item style={{ width: "17%" }}> Instructions</ListGroup.Item>
                    <ListGroup.Item style={{ width: "17%" }}> Prix</ListGroup.Item>
                    <ListGroup.Item style={{ width: "22%" }}></ListGroup.Item>

                </TitleList>
                <ListGroup>
                    {recipes.map((recipe, i) =>
                        (<>
                            <ListGroup horizontal key={i} style={{ width: "100%" }}>
                                <ListGroup.Item style={{ width: "10%" }} >
                                    <input type="checkbox" name="isActif" />
                                </ListGroup.Item>
                                <ListGroup.Item style={{ width: "17%" }}>{recipe.name}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "17%" }}>
                                    <ul>
                                        {recipe.ingredients.map((ingredient, i) =>
                                            (
                                                <li key={i}>{ingredient.ingredient.name}</li>
                                            )
                                        )}
                                    </ul>
                                </ListGroup.Item>
                                <ListGroup.Item style={{ width: "17%" }}>
                                    <ol>
                                        {recipe.instructions.map((instruction, i) =>
                                            (
                                                <li key={i}>{instruction}</li>
                                            )
                                        )}
                                    </ol>
                                </ListGroup.Item>
                                <ListGroup.Item style={{ width: "17%" }}>To Be Calculated</ListGroup.Item>
                                <ListGroup.Item style={{ width: "22%" }}>
                                    <Button variant="secondary" style={{ padding: "5px" }}><span id={`${recipe._id}-m`} name={`${recipe.name}-${recipe.ingredient}-${recipe.instruction}`} onClick={handleShow}>Modifier</span></Button>
                                    <Button variant="secondary" style={{ padding: "5px" }}><span id={`${recipe._id}-s`} name={`${recipe.name}-${recipe.ingredient}-${recipe.instruction}`} onClick={handleShow}>Supprimer</span></Button></ListGroup.Item>

                            </ListGroup>
                        </>
                        )
                    )}
                </ListGroup>
                <Modal show={showRem} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{target.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirmez-vous la suppression ? (la suppression est irréversible)</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Non
                    </Button>
                        <Button variant="primary" onClick={removeRecipe}>
                            Oui
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showMod} onHide={handleClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Mise à jour de {target.name}</Modal.Title>
                    </Modal.Header>
                    <StyledForm onSubmit={modifyRecipe}>
                        <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="name" placeholder={target.name} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridIngredient">
                                    <Form.Label>Ingrédients</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="street" placeholder={target.street} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridInstruction">
                                    <Form.Label>Instructions</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="zipCode" placeholder={target.zipCode} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Prix</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="city" placeholder={target.city} />
                                </Form.Group>
                            </Form.Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Non
                        </Button>
                            <Button type="submit" variant="primary">
                                Mettre à jour
                        </Button>
                        </Modal.Footer>
                    </StyledForm>
                </Modal>
                <Button variant="secondary" onClick={toCreateRecipe} style={{ margin: "15px" }}>
                    Créer une nouvelle recette
            </Button>
            </Table>
        </StyledForm>
    )
}