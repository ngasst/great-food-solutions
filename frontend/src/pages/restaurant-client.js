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
  margin-block-start: 2.5em;
  padding: center;
  font-size: 1vw;
`;

const TitleList = styled(ListGroup)`
font-style: italic ;
font-size: 2vw;
`;

export default function RestaurantClient({ history }) {
    const [restaurants, setRestaurants] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [target, setTarget] = useState({});
    const [newRestaurant, setNewRestaurant] = useState({ id: "", name: "", street: "", zipCode: "", city: "" })
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getRestaurants();
        }
    }, [])

    function getRestaurants() {
        http.get(`/restaurants/clients/${id}`)
            .then(({ data: { payload } }) => {
                setRestaurants(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function modifyRestaurant(e) {
        e.preventDefault();
        const restaurantInputs = {
            name: newRestaurant.name,
            street: newRestaurant.street,
            city: newRestaurant.city,
            zipcode: newRestaurant.zipCode,
        };
        Object.keys(restaurantInputs).map(key => {
            if (restaurantInputs[key] === "") {
                return restaurantInputs[key] = target[key];
            }
            if (restaurantInputs[key] === "undefined") {
                return restaurantInputs[key] = "";
            } else return restaurantInputs[key];
        })
        if (!Object.values(restaurantInputs).includes("")) {
            http.put("restaurants", restaurantInputs)
                .then(() => {
                    setShowMod(false);
                    history.push("/restaurants/clients/${id}");
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    function removeRestaurant() {
        http.delete(`/restaurants/clients/${target.id}`)
            .then(() => {
                setShowRem(false);
                history.push("/restaurants/clients/${id}");
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        setNewRestaurant({ ...newRestaurant, [name]: e.target.value });

    }

    const handleClose = () => {
        setShowRem(false);
        setShowMod(false);
    }

    const handleShow = (e) => {
        if (e.target.getAttribute("id").split("-")[1] === "s") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const street = e.target.getAttribute("name").split("-")[1];
            const zipCode = e.target.getAttribute("name").split("-")[2];
            const city = e.target.getAttribute("name").split("-")[3];
            setTarget({ id, name, street, zipCode, city });
            setShowRem(true);
        } else if (e.target.getAttribute("id").split("-")[1] === "m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const street = e.target.getAttribute("name").split("-")[1];
            const zipCode = e.target.getAttribute("name").split("-")[2];
            const city = e.target.getAttribute("name").split("-")[3];
            setTarget({ id, name, street, zipCode, city });
            setNewRestaurant({ ...newRestaurant, id });
            setShowMod(true);
        }
    }

    const toCreateRestaurant = () => {
        history.push("/client-form");
    }



    return (
        
            <StyledForm>
                <Table >
                    <h1>{restaurants[0] && restaurants[0].client.name}</h1>

                    <TitleList horizontal style={{ width: "1100px" }}>
                        <ListGroup.Item style={{ width: "20%" }}> Nom </ListGroup.Item>
                        <ListGroup.Item style={{ width: "20%" }}> Rue </ListGroup.Item>
                        <ListGroup.Item style={{ width: "20%" }}> Ville </ListGroup.Item>
                        <ListGroup.Item style={{ width: "20%" }}> Code Postal </ListGroup.Item>
                        <ListGroup.Item style={{ width: "20%" }}></ListGroup.Item>

                    </TitleList>
                    <ListGroup>
                        {restaurants.map(restaurant =>
                            (<>
                                <ListGroup horizontal key={restaurant._id} style={{ width: "1100px" }}>
                                    <ListGroup.Item style={{ width: "20%" }}>{restaurant.name}</ListGroup.Item>
                                    <ListGroup.Item style={{ width: "20%" }}>{restaurant.street}</ListGroup.Item>
                                    <ListGroup.Item style={{ width: "20%" }}>{restaurant.city}</ListGroup.Item>
                                    <ListGroup.Item style={{ width: "20%" }}>{restaurant.zipCode}</ListGroup.Item>
                                    <Col style={{ width: "20%", padding: "5px" }}>
                                        <Button variant="secondary" style={{padding:"5px"}}><span id={`${restaurant._id}-m`} name={`${restaurant.name}-${restaurant.street}-${restaurant.zipCode}-${restaurant.city}`} onClick={handleShow}>Modifier</span></Button>
                                        <Button variant="secondary"style={{padding:"5px"}}><span id={`${restaurant._id}-s`} name={`${restaurant.name}-${restaurant.street}-${restaurant.zipCode}-${restaurant.city}`} onClick={handleShow}>Supprimer</span></Button>
                                    </Col>
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
                            <Button variant="primary" onClick={removeRestaurant}>
                                Oui
                    </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showMod} onHide={handleClose} size="lg" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Mise à jour de {target.name}</Modal.Title>
                        </Modal.Header>
                        <StyledForm onSubmit={modifyRestaurant}>
                            <Modal.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control onChange={handleChange} type="text" name="name" placeholder={target.name} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridStreet">
                                        <Form.Label>adresse</Form.Label>
                                        <Form.Control onChange={handleChange} type="text" name="street" placeholder={target.street} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridZipCode">
                                        <Form.Label></Form.Label>
                                        <Form.Control onChange={handleChange} type="text" name="zipCode" placeholder={target.zipCode} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label></Form.Label>
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
                    <Button variant="primary" onClick={toCreateRestaurant} style={{margin:"15px"}}>
                        Nouveau Restaurant
            </Button>
                </Table>
            </StyledForm>

    
    )
}