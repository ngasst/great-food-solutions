import React, { useState, useEffect } from 'react';
import { ingredient as http } from '../utils/http';
import { Form, Col, ListGroup, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';


const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 1em;
border: solid;
padding: 15px;
border-color: rgba(239, 66, 35, 0.75);
`;

const Table = styled.form` 
display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  text-align: center;
  margin-block-start: 2.5em;
  padding: 15px;
`;

export default function Ingredient({ history }) {
    const [ingredients, setIngredients] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [target, setTarget] = useState({});
    const [newIngredient, setNewIngredient] = useState({ id: "", name: "", price: "", quantity: "", category: "", supplier: "", brand: "" })

    useEffect(() => {
        getIngredient();
    }, [])

    function getIngredient() {
        http.get("/ingredient")
            .then(({ data: { payload } }) => {
                setIngredients(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function modifyIngredient(e) {
        e.preventDefault();
        if(newIngredient.name!==target.name) {
            http.put("ingredient", newIngredient)
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
        setNewIngredient({ ...newIngredient, [name]: e.target.value });
    }
    const handleClose = () => {
        setShowRem(false);
        setShowMod(false);
    }
    const handleShow = (e) => {
        if (e.target.getAttribute("id").split("-")[1] === "s") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const price = e.target.getAttribute("name").split("-")[1];
            const quantity = e.target.getAttribute("name").split("-")[2];
            const category = e.target.getAttribute("name").split("-")[3];
            const supplier = e.target.getAttribute("name").split("-")[4];
            const brand = e.target.getAttribute("name").split("-")[5];
            setTarget({ id, name, price, quantity, category, supplier, brand });
            setShowRem(true);
        } else if (e.target.getAttribute("id").split("-")[1] === "m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const price = e.target.getAttribute("name").split("-")[1];
            const quantity = e.target.getAttribute("name").split("-")[2];
            const category = e.target.getAttribute("name").split("-")[3];
            const supplier = e.target.getAttribute("name").split("-")[4];
            const brand = e.target.getAttribute("name").split("-")[5];
            setTarget({ id, name, price, quantity, category, supplier, brand });
            setNewIngredient({ ...newIngredient, id });
            setShowMod(true);
        }
    }

    const toCreateIngredient = () => {
        history.push("/ingredient-form");
    }

    return (
        <StyledForm>
            <Table>
            <h1>Liste des ingredients</h1>
            <Form.Row horizontal>
                <Col md={2}> Nom </Col>
                <Col md={1}> prix </Col>
                <Col md={1}>Quantité</Col>
                <Col md={2}> Categorie </Col>
                <Col md={2}> Fournisseur </Col>
                <Col md={2}> Marque </Col>

            </Form.Row>
            <ListGroup>
                {ingredients.map(ingredient =>
                    (
                        <ListGroup horizontal key={ingredient._id} variant="secondary" style={{border:"groove"}}>
                            <Col md={2}>{ingredient.name}</Col>
                            <Col md={1}>{ingredient.price}</Col>
                            <Col md={1}>{ingredient.quantity}</Col>
                            <Col md={2}>{ingredient.category}</Col>
                            <Col md={2}>{ingredient.supplier}</Col>
                            <Col md={2}>{ingredient.brand}</Col>
                            <Col md={2}>
                            <Button variant="secondary"><span id={`${ingredient._id}-m`} name={`${ingredient.name}-${ingredient.price}-${ingredient.quantity}-${ingredient.category}-${ingredient.supplier}-${ingredient.brand}`} onClick={handleShow}>Modifier</span></Button>
                            <Button variant="secondary"><span id={`${ingredient._id}-s`} name={`${ingredient.name}-${ingredient.price}-${ingredient.quantity}-${ingredient.category}-${ingredient.supplier}-${ingredient.brand}`} onClick={handleShow}>Supprimer</span></Button>
                            </Col>
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
                                <Form.Label>Prix</Form.Label>
                                <Form.Control onChange={handleChange} type="Nom" name="price" placeholder={target.price} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridQuantity">
                                <Form.Label>Quantité</Form.Label>
                                <Form.Control onChange={handleChange} type="Nom" name="quantity" placeholder={target.quantity} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Catégorie</Form.Label>
                                <Form.Control onChange={handleChange} type="Nom" name="category" placeholder={target.category} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridQuantity">
                                <Form.Label>Fournisseur</Form.Label>
                                <Form.Control onChange={handleChange} type="Nom" name="supplier" placeholder={target.supplier} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Marque</Form.Label>
                                <Form.Control onChange={handleChange} type="Nom" name="brand" placeholder={target.brand} />
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
        </StyledForm>
    )
}