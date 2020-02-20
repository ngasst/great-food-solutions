import React, { useState, useEffect } from 'react';
import { ingredient as http } from '../utils/http';
import { Form, Col, ListGroup, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';


const StyledForm = styled(Form)`
margin: 45px;
margin-bottom: 170px;
border: solid;
padding-top: 20px;
padding-bottom: 20px;
border-color: rgba(239, 66, 35, 0.75);


`;

const Table = styled.form` 
display: block;
  margin: auto;
  width: 90%;
  text-align: center;
  padding: 20px;
`;

const TitleList = styled(ListGroup)`
font-weight: bold;
text-align: center;
font-style: italic;
font-size: 1vw;
`;

export default function IngredientList({ history }) {
    const [ingredients, setIngredients] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [target, setTarget] = useState({});
    const [newIngredient, setNewIngredient] = useState({ id: "", name: "", price: "", number: 0, unitBase: "", category: "", supplier: "", brand: "" })

    useEffect(() => {
        getIngredient();
    }, [])

    function getIngredient() {
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
        let quantityNumber = 0;
        let quantityUnit = "";
        if (newIngredient.number === 0) {
            quantityNumber = target.quantity.number;
        } else {
            quantityNumber = newIngredient.number;
        }
        if (newIngredient.unitBase === "") {
            quantityUnit = target.quantity.unitBase;
        } else {
            quantityUnit = newIngredient.unitBase;
        }
        const ingredientInputs = {
            id: newIngredient.id,
            name: newIngredient.name,
            price: newIngredient.price,
            quantity: {
                number: quantityNumber,
                unitBase: quantityUnit
            },
            category: newIngredient.category,
            supplier: newIngredient.supplier,
            brand: newIngredient.brand
        };
        Object.keys(ingredientInputs).map(key => {
            if (ingredientInputs[key] === "") {
                return ingredientInputs[key] = target[key];
            }
            if (ingredientInputs[key] === "undefined") {
                return ingredientInputs[key] = "";
            } else return ingredientInputs[key];
        })
        if (!Object.values(ingredientInputs).includes("")) {
            http.put("ingredients", ingredientInputs)
                .then(() => {
                    setShowMod(false);
                    history.push("/ingredient-list");
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
                history.push("/ingredient-list");
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        if (name === "category") {
            const category = () => {
                switch (e.target.value) {
                    case "Fruits et légumes":
                        return "fruit and vegetables";
                    case "Viandes":
                        return "meat";
                    case "Produits laitier":
                        return "dairy";
                    case "Boulangerie":
                        return "bakery";
                    case "Produits alimentaires séchés":
                        return "dried food products";
                    default:
                        console.log("Non recognized category");
                }
            }
            setNewIngredient({ ...newIngredient, [name]: category() });
        } else {
            setNewIngredient({ ...newIngredient, [name]: e.target.value });
        }
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
            const quantity = {
                number: Number(e.target.getAttribute("name").split("-")[2]),
                unitBase: e.target.getAttribute("name").split("-")[3]
            };
            const category = e.target.getAttribute("name").split("-")[4];
            const supplier = e.target.getAttribute("name").split("-")[5];
            const brand = e.target.getAttribute("name").split("-")[6];
            setTarget({ id, name, price, quantity, category, supplier, brand });
            setShowRem(true);
        } else if (e.target.getAttribute("id").split("-")[1] === "m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const price = e.target.getAttribute("name").split("-")[1];
            const quantity = {
                number: Number(e.target.getAttribute("name").split("-")[2]),
                unitBase: e.target.getAttribute("name").split("-")[3]
            };
            const category = e.target.getAttribute("name").split("-")[4];
            const supplier = e.target.getAttribute("name").split("-")[5];
            const brand = e.target.getAttribute("name").split("-")[6];
            setTarget({ id, name, price, quantity, category, supplier, brand });
            setNewIngredient({ ...newIngredient, id });
            setShowMod(true);
        }
    }

    const toCreateIngredient = () => {
        history.push("/ingredient-form");
    }

    const categoryToFrench = (category) => {
        switch (category) {
            case "fruit and vegetables":
                return "Fruits et légumes";
            case "meat":
                return "Viandes";
            case "dairy":
                return "Produits laitier";
            case "bakery":
                return "Boulangerie";
            case "dried food products":
                return "Produits alimentaires séchés";
            default:
                console.log("Non recognized category");
        }
    }

    return (
        <StyledForm>
            <Table>
                <h1>Liste des ingredients</h1>

                <TitleList horizontal style={{ width: "100%" }}>
                    <ListGroup.Item style={{ width: "20%" }}>Nom</ListGroup.Item>
                    <ListGroup.Item style={{ width: "10%" }}>Prix (€)/u</ListGroup.Item>
                    <ListGroup.Item style={{ width: "10%" }}>Quantité</ListGroup.Item>
                    <ListGroup.Item style={{ width: "10%" }}> Unité</ListGroup.Item>
                    <ListGroup.Item style={{ width: "10%" }}>Categorie</ListGroup.Item>
                    <ListGroup.Item style={{ width: "10%" }}>Fournisseur</ListGroup.Item>
                    <ListGroup.Item style={{ width: "10%" }}>Marque</ListGroup.Item>
                    <ListGroup.Item style={{ width: "20%"}}></ListGroup.Item>

                </TitleList>
                <ListGroup>
                    {ingredients.map(ingredient =>
                        (<>
                            <ListGroup horizontal key={ingredient._id} style={{ width: "100%"}}>
                                <ListGroup.Item style={{ width: "20%"}}>{ingredient.name}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "10%" }}>{ingredient.price}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "10%" }}>{ingredient.quantity.number}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "10%" }}>{ingredient.quantity.unitBase}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "10%" }}>{categoryToFrench(ingredient.category)}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "10%" }}>{ingredient.supplier}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "10%" }}>{ingredient.brand}</ListGroup.Item>
                                <ListGroup.Item style={{ width: "20%" }}>
                                    <Button variant="secondary"style={{fontSize:"1vw", padding: "5px", margin: "1px"}}><span id={`${ingredient._id}-m`} name={`${ingredient.name}-${ingredient.price}-${ingredient.quantity.number}-${ingredient.quantity.unitBase}-${ingredient.category}-${ingredient.supplier}-${ingredient.brand}`} onClick={handleShow}>Modifier</span></Button>
                                    <Button variant="secondary" style={{fontSize:"1vw", padding: "5px", margin: "1px"}}><span id={`${ingredient._id}-s`} name={`${ingredient.name}-${ingredient.price}-${ingredient.quantity.number}-${ingredient.quantity.unitBase}-${ingredient.category}-${ingredient.supplier}-${ingredient.brand}`} onClick={handleShow}>Supprimer</span></Button>
                                </ListGroup.Item>
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
                                    <Form.Control onChange={handleChange} type="text" name="name" placeholder={target.name} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Prix (€)/u</Form.Label>
                                    <Form.Control onChange={handleChange} type="number" step="0.01" min="0" name="price" placeholder={target.price} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridQuantityNumber">
                                    <Form.Label>Quantité</Form.Label>
                                    <Form.Control onChange={handleChange} type="number" step="0.001" min="0" name="number" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridQuantityUnit">
                                    <Form.Label>Unité de mesure</Form.Label>
                                    <Form.Control as="select" onChange={handleChange} name="unitBase">
                                        <option value="">Choissez l'unité</option>
                                        <option>kg</option>
                                        <option>l</option>
                                        <option>piece</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCategory">
                                    <Form.Label>Catégorie</Form.Label>
                                    <Form.Control as="select" onChange={handleChange} name="category">
                                        <option value="">Choissez une catégorie</option>
                                        <option>Fruits et légumes</option>
                                        <option>Viandes</option>
                                        <option>Produits laitier</option>
                                        <option>Boulangerie</option>
                                        <option>Produits alimentaires séchés</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridQuantity">
                                    <Form.Label>Fournisseur</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="supplier" placeholder={target.supplier} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCategory">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="brand" placeholder={target.brand} />
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
                <Button variant="primary" style={{ margin:"20px"}} onClick={toCreateIngredient}>
Créer un nouveau ingrédient            </Button>
            </Table>
        </StyledForm>
    )
}