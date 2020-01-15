// import React from 'react';
// import styled from 'styled-components';
// import Form from 'react-bootstrap/Form';
// import { Col, Button } from 'react-bootstrap';

// const Wrapper = styled.div`
//   height: auto;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-flow: column nowrap;
// ​
//   form {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-flow: column nowrap;
//     input {
//       margin: 1rem 0;
//     }
//   }
// `;

// const StyledForm = styled(Form)`
// margin: 45px;
// margin-block-start: 2.5em;
// border: solid;
// padding: 45px;
// border-color: rgba(239, 66, 35, 0.75);
// `;

// function IngredientForm () {

//     const [name, setName] = useState([]);
//     function addName(e) {
//         e.preventDefault();
//         setName([...name, '']);
//     }
//     function handleChange(e, index) {
//         e.preventDefault();
//         const value = e.target.value;
//         const updateName = name.map((element, i) => {
//             if (i === index) {
//                 return value;
//             } else return element;
//         });
//         setName(updateName);
//     }
//     function removeName(e, i) {
//         e.preventDefault();
//         setName(name.filter((el, idx) => idx !== i));
//     }

//     const [Category, setCategory] = useState([]);
//     function addCategory(e) {
//         e.preventDefault();
//         setQuantity([...quantity, '']);
//     }
//     function handleChange(e, index) {
//         e.preventDefault();
//         const value = e.target.value;
//         const updatedcategory = Category.map((element, i) => {
//             if (i === index) {
//                 return value;
//             } else return element;
//         });
//         setCategory(updatedCategory);
//     }
//     function removeCategory(e, i) {
//         e.preventDefault();
//         setQuantity(quantity.filter((el, idx) => idx !== i));
//     }


//     const [quantity, setQuantity] = useState([]);

//     function addQuantity(e) {
//         e.preventDefault();
//         setQuantity([...quantity, '']);
//     }

//     function handleChange(e, index) {
//         e.preventDefault();
//         const value = e.target.value;
//         const updateQuantity = quantity.map((element, i) => {
//             if (i === index) {
//                 return value;
//             } else return element;
//         });

//         setQuantity(updateQuantity);
//     }

//     function removeQuantity(e, i) {
//         e.preventDefault();
//         setQuantity(quantity.filter((el, idx) => idx !== i));
//     }

//     const [price, setPrice] = useState([]);

//     function addPrice(e) {
//         e.preventDefault();
//         setPrice([...price, '']);
//     }

//     function handleChange(e, index) {
//         e.preventDefault();
//         const value = e.target.value;
//         const updatePrice = price.map((element, i) => {
//             if (i === index) {
//                 return value;
//             } else return element;
//         });

//         setPrice(updatePrice);
//     }

//     function removePrice(e, i) {
//         e.preventDefault();
//         setPrice(price.filter((el, idx) => idx !== i));
//     }


//         return (
//             <Wrapper>
//             <StyledForm>
//                 <h1> Création d'un nouvel ingrédient</h1>
//                 <Form.Row>
//                     <Form.Group as={Col} controlId="nomIngredient">
//                         <Form.Label>Nom de l'ingrédient</Form.Label>
//                     {ingredient.map((ingredient, index) => (

//                             <form
//                                 type="text"
//                                 onChange={e => handleChange(e, index)}
//                                 value={ingredient}
//                             />
//                     ))}
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="categoryIngredient">
//                         <Form.Label>Catégorie</Form.Label>
//                         {ingredient.map((category, index) => (

//                         <form as='select' type="text" name="categoryName" placeholder="Catégorie" >

//                             <option>Choix...</option>
//                             <option>Fruits et légumes</option>
//                             <option>Boucherie</option>
//                             <option>Produits laitiers</option>
//                             <option>Boulangerie</option>
//                             <option>Produits secs</option>
//                         </form>
//                         )
//                     </Form.Group>
//                 </Form.Row>
//                 <Form.Row>
//                     <Form.Group as={Col} controlId="quantityField">
//                         <Form.Label>Quantité (en kg)</Form.Label>
//                         <Form.Control type="number" name="quantityNumber" placeholder="Quantité" />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="priceField">
//                         <Form.Label>Prix (€)</Form.Label>
//                         <Form.Control type="number" name="priceAndCurrency" placeholder="Prix" />
//                     </Form.Group>
//                 </Form.Row>
//                 <Form.Row>
//                     <Form.Group as={Col} controlId="supplierField">
//                         <Form.Label>Fournisseur</Form.Label>
//                         <Form.Control type="text" name="supplierName" placeholder="Fournisseur" />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="brandField">
//                         <Form.Label>Marque</Form.Label>
//                         <Form.Control type="text" name="brandName" placeholder="Marque" />
//                     </Form.Group>
//                 </Form.Row>
//                 <Button variant="secondary" type="submit" style={{marginRight: "auto"}}>
//             Ajouter Ingrédient
//         </Button>
//                 </StyledForm>
//                 </Wrapper>


//         )
//     };
// export default IngredientForm;