import React, { Component } from 'react';
import { connect } from 'react-redux';
import { client as http } from '../utils/http';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 2.5em;
border: solid;
padding: 45px;
border-color: rgba(239, 66, 35, 0.75);
`;

const Wrapper = styled.div`
  height: 100vh;
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

const[instructions, setInstructions] = useState([]);
​
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


class RecipeForm extends Component {
  
  }
render() {
  return (
    <Wrapper>
      <StyledForm onSubmit={this.handleSubmit}>
        <h1> Création d'une nouvelle recette</h1>

        <Form.Row>
          <Form.Group as={Col} controlId="recipeNameField">
            <Form.Label>Nom de la recette</Form.Label>
            <Form.Control type="nom" name="recipeName" placeholder="Nom de la recette" />
          </Form.Group>

          <Form.Group as={Col} controlId="baseUnitField">
            <Form.Label>Unité</Form.Label>
            <Form.Control type="baseUnit" name="baseUnitInKgorL" placeholder="" as="select">
              <option>Choix...</option>
              <option>kg</option>
              <option>l</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="clientField">
            <Form.Label>Client</Form.Label>
            <Form.Control type="" name="" placeholder="" as="" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingrédients</Form.Label>
            <Form.Control as="text" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Instructions</Form.Label>

            <button onClick={addInstruction}>Add instruction</button>
            {instructions.map((instruction, index) => (
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
                  value={instruction}
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
            </button>
              </div>
            ))}
            <Form.Control as="textarea" rows="10" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Ajouter Recette
  </Button>
      </StyledForm>

    </Wrapper>

  )
};

export default connect()(RecipeForm);