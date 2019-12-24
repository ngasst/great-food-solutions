import React, { useState, useEffect } from 'react';
import { client as http } from '../utils/http';
import { Form, Col, ListGroup, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

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

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 2.5em;
border: solid;
padding: 45px;
border-color: rgba(239, 66, 35, 0.75);
`;

export default function Ingredient({history}) {
    const [ingredients, setIngredients] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [target, setTarget] = useState({});
    const [newIngredient, setNewIngredient] = useState({id: "", name: "", price: ""})
    
    useEffect(() => {
        getIngredients();
    }, [])

    function getIngredients() {
        http.get("/ingredients")
            .then(({ data: { payload } }) => {
                setIngredients(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function modifyIngredient(e) {
        e.preventDefault();
        if(Object.keys(newIngredient).length >= 1) {
            http.put("ingredients", newIngredient)
            .then(() => {
                setShowMod(false);
                history.push("/ingredient");
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

    function removeIngredient() {
        http.delete(`/ingredients/${target.id}`)
            .then(() => {
                setShowRem(false);
                history.push("/ingredient");
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        setNewIngredient({...newIngredient, [name]: e.target.value});
    }
    const handleClose = () => {
        setShowRem(false);
        setShowMod(false);
    }
    const handleShow = (e) => {
        if(e.target.getAttribute("id").split("-")[1]==="s") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const price = e.target.getAttribute("name").split("-")[1];
            setTarget({ id, name, price });
            setShowRem(true);
        } else if(e.target.getAttribute("id").split("-")[1]==="m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const price = e.target.getAttribute("name").split("-")[1];
            setTarget({ id, name, price });
            setNewIngredient({ ...newIngredient, id });
            setShowMod(true);
        }
    }

    const toCreateIngredient = () => {
        history.push("/ingredient-form");
    }

    return (
        <Table>
            <h1>Liste des ingredients</h1>
            <TitleList horizontal>
                <ListGroup.Item style={{ width: "50%" }}> Nom </ListGroup.Item>
                <ListGroup.Item style={{ width: "50%" }}> Prix </ListGroup.Item>
            </TitleList>
            <ListGroup>
            {ingredients.map(ingredient =>
                (
                    <ListGroup horizontal key={ingredient._id}>
                        <ListGroup.Item style={{ width: "50%" }}>{ingredient.name}</ListGroup.Item>
                        <ListGroup.Item style={{ width: "50%" }}>{ingredient.price}</ListGroup.Item>
                        <ListGroup.Item style={{ width: "10%" }}><span id={`${ingredient._id}-s`} name={`${ingredient.name}-${ingredient.price}`} onClick={handleShow}>X</span></ListGroup.Item>
                        <ListGroup.Item style={{ width: "10%" }}><span id={`${ingredient._id}-m`} name={`${ingredient.name}-${ingredient.price}`} onClick={handleShow}>M</span></ListGroup.Item>
                    </ListGroup>
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
                    <Button variant="primary" onClick={removeIngredient}>
                        Oui
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showMod} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Mise à jour de {target.name}</Modal.Title>
                </Modal.Header>
                <StyledForm onSubmit={modifyIngredient}>
                    <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control onChange={handleChange} type="Nom" name="name" placeholder={target.name} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control onChange={handleChange} type="Nom" name="price" placeholder={target.price} />
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
            <Button variant="primary" onClick={toCreateIngredient}>
                Nouveau ingredient
            </Button>
        </Table>
    )}