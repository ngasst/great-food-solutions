import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client as http } from '../utils/http';
import { Form, ListGroup, Button, Modal, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 1em;
border: solid;
padding-top: 20px;
padding-bottom: 20px;
border-color: rgba(239, 66, 35, 0.75);

`;

const Table = styled(Form)` 
display: block;
  margin: auto;
  width: 90%;
  text-align: center;
  font-size: 1vw;
`;

const TitleList = styled(ListGroup)`
font-weight: bold;
text-align: center;
font-style: italic ;
font-size: 2vw;
`;

const IngredientList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const InstructionList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledFormIngredient = styled.div`
margin: 45px;
margin-block-start: 1em;
border: solid;
padding: 15px;
border-color: rgba(239, 66, 35, 0.75);
`;

export default function RecipeClient({ history }) {
    const [recipes, setRecipes] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [removedIngredients, setRemovedIngredients] = useState([]);
    const [newInstructions, setNewInstructions] = useState([]);
    const [removedInstructions, setRemovedInstructions] = useState([]);
    const [category, setCategory] = useState("");
    const [defaultCategory, setDefaultCategory] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [target, setTarget] = useState({});
    const [newRecipe, setNewRecipe] = useState({});
    const { id } = useParams();
    const existingIng = [];
    const existingIns = [];
    useEffect(() => {
        if (id) {
            getRecipes();
        }
        if (category) {
            getIngredients();
        }
    }, [category])

    function getRecipes() {
        http.get(`/recipes/clients/${id}`)
            .then(({ data: { payload } }) => {
                setRecipes(payload);
            })
            .catch(err => {
                console.error(err);
            })
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

    function modifyRecipe(e) {
        e.preventDefault();
        const ingredients = [];
        const instructions = [];
        let recipeInputs = {};
        existingIng.length>0 && existingIng.map(ing => ingredients.push(ing));
        ingredient.length>0 && ingredient.map(ing => ingredients.push({ingredient: ing.id, quantity: ing.quantity}));
        existingIns.length>0 && existingIns.map(ins => instructions.push(ins));
        if(instructions.length>0 && instructions.length===existingIns.length) {
            newInstructions.map(ins => instructions.push(ins));
        }
        if(instructions.length===0) {
            newInstructions.map(ins => instructions.push(ins));
        }
        if(newRecipe.name) {
            recipeInputs = {
                id: newRecipe.id,
                name: newRecipe.name,
                instructions,
                ingredients
            }
        } else {
            recipeInputs = {
                id: newRecipe.id,
                name: target.name,
                instructions,
                ingredients
            }
        }
        // function isEquivalent(a, b) {
        //     var aProps = Object.getOwnPropertyNames(a);
        //     var bProps = Object.getOwnPropertyNames(b);
        //     if (aProps.length !== bProps.length) {
        //         console.log("b:", bProps)
        //         return false;
        //     }
        //     for (var i = 0; i < aProps.length; i++) {
        //         var propName = aProps[i];
        //         if (a[propName] !== b[propName]) {
        //             console.log("a:", aProps)
        //             return false;
        //         }
        //     }
        //     return true;
        // }
        http.put("/recipes", recipeInputs)
            .then(() => {
                history.push(`/client/${id}/recipes`);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function removeRecipe() {
        http.delete(`/recipes/${target.id}`)
            .then(() => {
                history.push(`/client/${id}/recipes`);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function addInstruction(e) {
        e.preventDefault();
        setNewInstructions([...newInstructions, '']);
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

    function removeInstruction(e, i) {
        e.preventDefault();
        setRemovedInstructions([...removedInstructions, { id: target.id, index: i }]);
    }

    function removeNewInstruction(e, i) {
        e.preventDefault();
        setNewInstructions(newInstructions.filter((el, idx) => idx !== i));
    }

    function removeIngredient(e, i) {
        e.preventDefault();
        setRemovedIngredients([...removedIngredients, { id: target.id, index: i }]);
    }

    function removeNewIngredient(e, i) {
        e.preventDefault();
        setIngredient(ingredient.filter((el, idx) => idx !== i));
    }

    const handleChange = (e) => {
        const name = e.target.name;
        setNewRecipe({ ...newRecipe, [name]: e.target.value });

    }

    function handleInstructionChange(e, index) {
        e.preventDefault();
        const value = e.target.value;
        const updatedInstructions = newInstructions.map((element, i) => {
            if (i === index) {
                return value;
            } else return element;
        });
        setNewInstructions(updatedInstructions);
    }

    function handleCategoryChange(e) {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setDefaultCategory("");
        setShowCategory(true);
    }

    const handleClose = () => {
        setShowRem(false);
        setShowMod(false);
        setRemovedInstructions([]);
        setRemovedIngredients([]);
        setNewRecipe({});
        setIngredient([]);
    }

    const handleCloseCategory = () => {
        setShowCategory(false);
        setDefaultCategory(true);
        setQuantity([]);
    }

    function handleQuantityChange(e) {
        e.preventDefault();
        const q = Number(e.target.value);
        const targetIngredient = e.target.name;
        if(q>0) {
            setQuantity([...quantity, {targetIngredient, quantity: q}]);
        }
    }

    const handleShow = (e) => {
        if (e.target.getAttribute("id").split("-")[1] === "s") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name");
            const recipe = recipes.filter(recipe => recipe._id === id);
            setTarget({ id, name, ingredients: recipe[0].ingredients, instructions: recipe[0].instructions });
            setShowRem(true);
        } else if (e.target.getAttribute("id").split("-")[1] === "m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name");
            const recipe = recipes.filter(recipe => recipe._id === id);
            setTarget({ id, name, ingredients: recipe[0].ingredients, instructions: recipe[0].instructions });
            setNewRecipe({ ...newRecipe, id });
            setShowMod(true);
        }
    }
    function displayExistingIngredients() {
        if (target.id) {
            return (
                recipes.filter(recipe => recipe._id === target.id)[0].ingredients.map((ingredient, i) => {
                    if (!removedIngredients.map(ing => ing.index).includes(i)) {
                        existingIng.push({ingredient: ingredient.ingredient._id, quantity: ingredient.quantity});
                        return (
                            <IngredientList key={i}>
                                <ListGroup>{`${ingredient.ingredient.name}, ${ingredient.quantity} ${ingredient.ingredient.quantity.unitBase}`}</ListGroup>
                                <button
                                    style={{
                                        backgroundColor: 'darkred',
                                        color: 'white',
                                        border: 'none',
                                        marginLeft: '0.5rem',
                                    }}
                                    onClick={e => removeIngredient(e, i)}
                                >
                                    x
                                </button>
                        </IngredientList>
                        )
                    }
                })
            )
        }
    }

    function displaySelectedIngredients() {
        if (ingredient.length > 0) {
            return (
                ingredient.map((ingredient, i) => (
                    <IngredientList key={i}>
                        <ListGroup>{`${ingredient.name}, ${ingredient.quantity} ${ingredient.unit}`}</ListGroup>
                        <button
                            style={{
                                backgroundColor: 'darkred',
                                color: 'white',
                                border: 'none',
                                marginLeft: '0.5rem',
                            }}
                            onClick={e => removeNewIngredient(e, i)}
                        >
                            x
                        </button>
                    </IngredientList>
                ))
            )
        }
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
        const existingIngIds = existingIng.map(ing => ing.id);
        if (findMatch === 0 && quantityObject.length>0 && !existingIngIds.includes(id)) {
            setIngredient([...ingredient, { id, name, quantity: quantityObject[0].quantity, unit }]);
            e.target.parentElement.setAttribute("disabled", "");
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
                                    <Button variant="secondary" style={{ margin: "5px" }}><span id={`${recipe._id}-m`} name={`${recipe.name}`} onClick={handleShow}>Modifier</span></Button>
                                    <Button variant="secondary" style={{ margin: "5px" }}><span id={`${recipe._id}-s`} name={`${recipe.name}`} onClick={handleShow}>Supprimer</span></Button></ListGroup.Item>

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
                                    <Form.Row>
                                        <Form.Label>Ingrédients</Form.Label>
                                    </Form.Row>
                                    {displayExistingIngredients()}
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
                                            <Modal show={showCategory} onHide={handleCloseCategory} size="xl" centered>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>{category}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>{displayIngredients()}</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCloseCategory}>
                                                        Fermer
                                            </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    ))}
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridInstruction">
                                    <Form.Row>
                                        <Form.Label>Instructions</Form.Label>
                                    </Form.Row>
                                    {target.id && recipes.filter(recipe => recipe._id === target.id)[0].instructions.map((instruction, i) => {
                                        if (!removedInstructions.map(ins => ins.index).includes(i)) {
                                            existingIns.push(instruction);
                                            return (
                                                    <InstructionList key={i}>
                                                        <ListGroup>{instruction}</ListGroup>
                                                        <button
                                                            style={{
                                                                backgroundColor: 'darkred',
                                                                color: 'white',
                                                                border: 'none',
                                                                marginLeft: '0.5rem',
                                                            }}
                                                            onClick={e => removeInstruction(e, i)}
                                                        >
                                                            x
                                                        </button>
                                                    </InstructionList>
                                            )
                                        }
                                    })}
                                    <Form.Row>
                                        <Button onClick={addInstruction}>Ajouter instructions</Button>
                                    </Form.Row>
                                    {newInstructions.map((instructions, index) => (
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
                                                onClick={e => removeNewInstruction(e, index)}
                                            >
                                                x
                                                </button>
                                        </div>
                                    ))}
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