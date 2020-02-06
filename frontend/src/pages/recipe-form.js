import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';


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

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 2.5em;
border: solid;
padding: 45px;
border-color: rgba(239, 66, 35, 0.75);
`;

function RecipeForm() {

    const [ingredient, setIngredient] = useState([]);
    function addIngredient(e) {
        e.preventDefault();
        setIngredient([...ingredient, '']);
    }
    function handleChange(e, index) {
        e.preventDefault();
        const value = e.target.value;
        const updatedIngredient = ingredient.map((element, i) => {
            if (i === index) {
                return value;
            } else return element;
        });
        setIngredient(updatedIngredient);
    }
    function removeIngredient(e, i) {
        e.preventDefault();
        setIngredient(ingredient.filter((el, idx) => idx !== i));
    }

    const [quantity, setQuantity] = useState([]);
    function addQuantity(e) {
        e.preventDefault();
        setQuantity([...quantity, '']);
    }
    function handleChange(e, index) {
        e.preventDefault();
        const value = e.target.value;
        const updatedQuantity = quantity.map((element, i) => {
            if (i === index) {
                return value;
            } else return element;
        });
        setQuantity(updatedQuantity);
    }
    function removeQuantity(e, i) {
        e.preventDefault();
        setQuantity(quantity.filter((el, idx) => idx !== i));
    }


    const [instructions, setInstructions] = useState([]);

    function addInstruction(e) {
        e.preventDefault();
        setInstructions([...instructions, '']);
    }

    function handleChange(e, index) {
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


    return (
        <Wrapper>
            <StyledForm>
                <h1>Création d'une nouvelle recette</h1>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="Nom" name="clientName" placeholder="Nom de la recette" />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    <Form.Row>
                        <Form.Label>Ingrédients</Form.Label>
                    </Form.Row>
                        <Form.Row>
                            <Col>
                    <Button onClick={addIngredient}>Ingrédient</Button>
                    {ingredient.map((ingredient, index) => (
                        <div
                            styled={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'left',
                            }}
                            key={index}
                        >
                            <input
                                type="text"
                                onChange={e => handleChange(e, index)}
                                value={ingredient}
                            />
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
                        </div>
                    ))}
</Col>
<Col>
                    <Button onClick={addQuantity}>Quantité</Button>
                    {quantity.map((quantity, index) => (
                        <div
                            styled={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'right',
                            }}
                            key={index}
                        >
                            <input
                                type="text"
                                onChange={e => handleChange(e, index)}
                                value={quantity}
                            />
                            <button
                                style={{
                                    backgroundColor: 'darkred',
                                    color: 'white',
                                    border: 'none',
                                    marginLeft: '0.5rem',
                                }}
                                onClick={e => removeQuantity(e, index)}
                            >
                                x
            </button>
                        </div>
                    ))}
                    </Col>
                    </Form.Row>
                </Form.Group>

                <Form.Group>
                <Form.Row>
                        <Form.Label>Instructions</Form.Label>
                    </Form.Row>
                    <Button onClick={addInstruction}>Instructions</Button>
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
                                onChange={e => handleChange(e, index)}
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
                </Form.Group>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Confirmer" />
          </Form.Group>

          <Button variant="secondary" type="submit" style={{marginRight: "auto"}}>
            Ajouter Recette
        </Button>
            </StyledForm>
        </Wrapper>
    );
}
export default connect()(RecipeForm);