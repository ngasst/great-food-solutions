import React, { useState, useEffect } from 'react';
import { ingredient as http } from '../utils/http';
import styled from 'styled-components';
import { ListGroup, Form, Col, Button, Modal } from 'react-bootstrap';

const Wrapper = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
​
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    input {
      margin: 1rem 0;
    }
  }
`;

const StyledFormRecipe = styled(Form)`
margin: 45px;
margin-block-start: 2.5em;
border: solid;
padding: 45px;
border-color: rgba(239, 66, 35, 0.75);
margin-bottom: 170px;
`;

const StyledFormIngredient = styled.div`
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

const IngredientList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: solid rgba(128,128,128, 0.5);
`

export default function RecipeForm({ history }) {
    const [recipeName, setRecipeName] = useState("");
    const [ingredient, setIngredient] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [client, setClient] = useState("");
    const [clients, setClients] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState("");
    const [category, setCategory] = useState("");
    const [instructions, setInstructions] = useState([]);
    const [unit, setUnit] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (category) {
            getIngredients();
        }
        getClients();
    }, [category])

    function handleRecipeNameChange(e) {
        const value = e.target.value
        setRecipeName(value);
    }

    function addCategoryList(e) {
        e.preventDefault();
        const count = categoryList.reduce((emptyCount, cat) => {
            if (cat === "" || categoryList.length === 0) {
                return emptyCount += 1;
            } return emptyCount;
        }, 0)
        if (count < 1) {
            setCategoryList([...categoryList, ""]);
        }
    }

    function removeIngredient(e, i) {
        e.preventDefault();
        setIngredient(ingredient.filter((el, idx) => idx !== i));
    }

    function handleCategoryChange(e) {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setDefaultCategory("");
        setShow(true);
    }

    function getIngredients() {
        const input = () => {
            switch (category) {
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
        http.get(`/ingredients?category=${input()}`)
            .then(({ data: { payload } }) => {
                setIngredients(payload);
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    function displayIngredients() {
        return (
            <StyledFormIngredient>
                <Table>
                    <Form.Row horizontal>
                        <Col md={2}>Nom</Col>
                        <Col md={1}>Prix (€)/u</Col>
                        <Col md={2}>Q.</Col>
                        <Col md={1}>U.</Col>
                        <Col md={2}>Fournisseur</Col>
                        <Col md={1}>Marque</Col>
                        <Col md={2}>Sél. quantité</Col>
                    </Form.Row>
                    <ListGroup>
                        {Array.isArray(ingredients) && ingredients.map(ingredient =>
                            (
                                <ListGroup horizontal key={ingredient._id} variant="secondary" style={{ border: "groove" }}>
                                    <Col md={2}>{ingredient.name}</Col>
                                    <Col md={1}>{ingredient.price}</Col>
                                    <Col md={2}>{ingredient.quantity.number}</Col>
                                    <Col md={1}>{ingredient.quantity.unitBase}</Col>
                                    <Col md={2}>{ingredient.supplier}</Col>
                                    <Col md={1}>{ingredient.brand}</Col>
                                    <Col md={2}>
                                        <Form.Control onChange={handleQuantityChange} type="number" step="0.001" min="0" name={ingredient._id} />
                                    </Col>
                                    <Button variant="secondary"><span id={ingredient._id} name={`${ingredient.name}-${ingredient.quantity.unitBase}`} onClick={handleIngredientChoice}>Ajouter</span></Button>
                                </ListGroup>
                            )
                        )}
                    </ListGroup>
                </Table>
            </StyledFormIngredient>
        )
    }

    function displaySelectedIngredients() {
        if (ingredient.length > 0) {
            return (
                ingredient.map((ingredient, index) => (
                    <IngredientList key={index}>
                        <ListGroup>{`${ingredient.name}, ${ingredient.quantity} ${ingredient.unit}`}</ListGroup>
                        <button
                            style={{
                                backgroundColor: 'darkred',
                                color: 'white',
                                border: 'none',
                                marginLeft: '0.5rem',
                            }}
                            onClick={e => removeIngredient(e, index)}
                        >
                            x
                        </button>
                    </IngredientList>
                ))
            )
        }
    }

    function handleIngredientChoice(e) {
        e.preventDefault();
        const id = e.target.getAttribute("id");
        const name = e.target.getAttribute("name").split("-")[0];
        const unit = e.target.getAttribute("name").split("-")[1];
        const reducedQuantity = quantity.reduce((acc, curr) => {
            if(acc.length>1) {
                acc = acc.filter(o => o.targetIngredient !== curr.targetIngredient)
            }
            acc.push(curr);
            return acc;
        },[])
        const quantityObject = reducedQuantity.filter(object => id === object.targetIngredient);
        const findMatch = ingredient.reduce((findOnce, ingredient) => {
            if (ingredient.id === id) {
                return findOnce += 1;
            } return findOnce;
        }, 0)
        if (findMatch === 0 && quantityObject.length>0) {
            setIngredient([...ingredient, { id, name, quantity: quantityObject[0].quantity, unit }]);
            e.target.parentElement.setAttribute("disabled", "");
        }
    }

    function handleQuantityChange(e) {
        e.preventDefault();
        const q = e.target.value;
        const targetIngredient = e.target.name;
        setQuantity([...quantity, {targetIngredient, quantity: q}]);
    }

    function addInstruction(e) {
        e.preventDefault();
        setInstructions([...instructions, '']);
    }

    function handleInstructionChange(e, index) {
        e.preventDefault();
        const value = e.target.value;
        const updatedInstructions = instructions.map((element, i) => {
            if (i === index) {
                return value;
            } else return element;
        });
        setInstructions(updatedInstructions);
    }

    function removeInstruction(e, i) {
        e.preventDefault();
        setInstructions(instructions.filter((el, idx) => idx !== i));
    }

    function getClients() {
        http.get("/clients")
            .then(({ data: { payload } }) => {
                setClients(payload);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    function handleClientChange(e) {
        const id = e.target.value;
        setClient(id);
    }

    function handleUnitChange(e) {
        const selectedUnit = e.target.value;
        setUnit(selectedUnit);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const ingredientIds = ingredient.map(ing => {
            return { ingredient: ing.id, quantity: ing.quantity };
        });
        const inputs = {
            name: recipeName,
            client,
            baseUnit: unit,
            ingredients: ingredientIds,
            instructions
        }
        http.post("/recipes", inputs)
            .then(({ data }) => {
                if (data.ok) {
                    history.push("/recipe-list");
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const handleClose = () => {
        setShow(false);
        setDefaultCategory(true);
    }

    return (
        <Wrapper>
            <StyledFormRecipe onSubmit={handleSubmit}>
                <h1>Création d'une nouvelle recette</h1>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="Nom" name="clientName" placeholder="Nom de la recette" onChange={handleRecipeNameChange} />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Row>
                                <Form.Label>Ingrédients</Form.Label>
                            </Form.Row>
                            <Button onClick={addCategoryList}>Ajouter ingrédients</Button>
                            {displaySelectedIngredients()}
                            {categoryList.map((cat, index) => (
                                <div
                                    styled={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'left',
                                    }}
                                    key={index}
                                >
                                    <Form.Control as="select" onChange={handleCategoryChange} name="category">
                                        <option value="" selected={defaultCategory}>Choissez une catégorie</option>
                                        <option>Fruits et légumes</option>
                                        <option>Viandes</option>
                                        <option>Produits laitier</option>
                                        <option>Boulangerie</option>
                                        <option>Produits alimentaires séchés</option>
                                    </Form.Control>
                                    <Modal show={show} onHide={handleClose} size="xl" centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{category}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{displayIngredients()}</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Fermer
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            ))}
                        </Col>
                        <Col>
                            <Form.Row>
                                <Form.Label>Instructions</Form.Label>
                            </Form.Row>
                            <Button onClick={addInstruction}>Ajouter instructions</Button>
                            {instructions.map((instructions, index) => (
                                <div
                                    styled={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                    key={index}
                                >
                                    <input
                                        type="text"
                                        onChange={e => handleInstructionChange(e, index)}
                                        value={instructions}
                                    />
                                    <button
                                        style={{
                                            backgroundColor: 'darkred',
                                            color: 'white',
                                            border: 'none',
                                            marginLeft: '0.5rem',
                                        }}
                                        onClick={e => removeInstruction(e, index)}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Row>
                                <Form.Label>Client</Form.Label>
                            </Form.Row>
                            <Form.Control as="select" onChange={handleClientChange} name="category">
                                <option value="">Selectionner le client</option>
                                {clients.map((client, index) => (
                                    <option key={index} value={client._id}>{client.name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Row>
                                <Form.Label>Unité</Form.Label>
                            </Form.Row>
                            <Form.Control as="select" onChange={handleUnitChange} name="category">
                                <option value="">Selectionner l'unité de base</option>
                                <option>kg</option>
                                <option>l</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>

                <Button variant="secondary" type="submit" style={{ marginRight: "auto" }}>
                    Ajouter Recette
                </Button>
            </StyledFormRecipe>
        </Wrapper>
    );
}