import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client as http } from '../utils/http';
import { Form, Button, Modal, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';


const StyledForm = styled(Form)`
border: solid;
border-color: rgba(239, 66, 35, 0.75);
margin-top: 25px;
`;

const Table = styled.form` 
 display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  text-align: center;
  padding: 25px;

`;


export default function RestaurantClient({ history }) {
    const [restaurants, setRestaurants] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [target, setTarget] = useState({});
    const [newRestaurant, setNewRestaurant] = useState({ id: "", name: "", street: "", zipCode: "", city: "", TVA: "",contact: "", emailContact:"", telContact:"", siteInternet: "", deliveryDay: "" })
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
            TVA: newRestaurant.TVA,
            contact: newRestaurant.contact,
            emailContact: newRestaurant.emailContact,
            telContact: newRestaurant.telContact,
            siteInternet: newRestaurant.siteInternet,
            deliveryDay: newRestaurant.deliveryDay
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
                    history.push("/restaurants/${target.id}");
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }

    function removeRestaurant() {
        http.delete(`/restaurants/${target.id}`)
            .then(() => {
                setShowRem(false);
                history.push(`/client/${id}`);
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
            const TVA = e.target.getAttribute("name").split("-")[4];
            const contact = e.target.getAttribute("name").split("-")[5];
            const emailContact = e.target.getAttribute("name").split("-")[6];
            const telContact = e.target.getAttribute("name").split("-")[7];
            const siteInternet = e.target.getAttribute("name").split("-")[8];
            const deliveryDay = e.target.getAttribute("name").split("-")[9];
            setTarget({ id, name, street, zipCode, city, TVA, contact, emailContact, telContact, siteInternet, deliveryDay });
            setShowRem(true);
        } else if (e.target.getAttribute("id").split("-")[1] === "m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name").split("-")[0];
            const street = e.target.getAttribute("name").split("-")[1];
            const zipCode = e.target.getAttribute("name").split("-")[2];
            const city = e.target.getAttribute("name").split("-")[3];
            const TVA = e.target.getAttribute("name").split("-")[4];
            const contact = e.target.getAttribute("name").split("-")[5];
            const emailContact = e.target.getAttribute("name").split("-")[6];
            const telContact = e.target.getAttribute("name").split("-")[7];
            const siteInternet = e.target.getAttribute("name").split("-")[8];
            const deliveryDay = e.target.getAttribute("name").split("-")[9];
            setTarget({ id, name, street, zipCode, city, TVA, contact, emailContact, telContact, siteInternet, deliveryDay });
            setNewRestaurant({ ...newRestaurant, id });
            setShowMod(true);
        }
    }

    const toCreateRestaurant = () => {
        history.push("/client-form");
    }

    return (

        <StyledForm>
            <Table>
                <h1>Restaurants</h1>
                {restaurants.map(restaurant =>
                    (<>
                        <Card key={restaurant._id}>
                        <Card.Header as={Col} controlId="formGridName" style={{fontSize: "20px", fontWeight: "bold"  }}>{restaurant.name}</Card.Header>
                            <Card border="light">
                                <Card.Header>Adresse</Card.Header>
                                <Card.Body style={{paddingBottom:"1px"}}>
                                    <Form.Group as={Col}><Form.Label style={{paddingRight:"30px"}}>Rue : {restaurant.street}</Form.Label>
                                    <Form.Label>Ville : {restaurant.city}</Form.Label>
                                    <Form.Label style={{paddingLeft:"30px"}}>Code postal :{restaurant.zipCode}</Form.Label></Form.Group>
                                </Card.Body>
                            </Card>
                            <Card border="light">
                            <Card.Header>Informations</Card.Header>
                            <Card.Body style={{paddingBottom:"1px"}}>
                                <Form.Group as={Col}><Form.Label style={{paddingRight:"30px"}}>Numéro de TVA : {restaurant.TVA}</Form.Label></Form.Group>
                                <Form.Group as={Col}><Form.Label style={{paddingRight:"30px"}}>Contact : {restaurant.contact}</Form.Label>
                                <Form.Label style={{paddingRight:"30px"}}>Adresse email : {restaurant.emailContact}</Form.Label>
                                <Form.Label style={{paddingLeft:"30px"}}>Numéro de téléphone : {restaurant.telContact}</Form.Label></Form.Group>
                                <Form.Group as={Col}><Form.Label style={{paddingRight:"30px"}}>Site Internet : {restaurant.siteInternet}</Form.Label></Form.Group>
                                <Form.Group as={Col}><Form.Label style={{paddingRight:"30px"}}>Informations de livraison : {restaurant.deliveryDay}</Form.Label></Form.Group>
                            </Card.Body>
                            </Card>
                         
                            <Form.Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button variant="secondary" style={{ margin: "15px" }}><span id={`${restaurant._id}-m`} name={`${restaurant.name}-${restaurant.street}-${restaurant.zipCode}-${restaurant.city}-${restaurant.TVA}-${restaurant.contact}-${restaurant.emailContact}-${restaurant.telContact}-${restaurant.siteInternet}`} onClick={handleShow}>Modifier</span></Button>
                                <Button variant="secondary" style={{ margin: "15px" }}><span id={`${restaurant._id}-s`} name={`${restaurant.name}-${restaurant.street}-${restaurant.zipCode}-${restaurant.city}${restaurant.TVA}-${restaurant.contact}-${restaurant.emailContact}-${restaurant.telContact}-${restaurant.siteInternet}`} onClick={handleShow}>Supprimer</span></Button>
                            </Form.Row>
                        </Card>
                    </>
                    )
                )}

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
                                    <Form.Label>Adresse</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="street" placeholder={target.street} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridZipCode">
                                    <Form.Label>Code postal</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="zipCode" placeholder={target.zipCode} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Ville</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="city" placeholder={target.city} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTVA">
                                    <Form.Label>Numéro de TVA</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="TVA" placeholder={target.TVA} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridContact">
                                    <Form.Label>Nom du contact</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="Nom du contact" placeholder={target.contact} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmailContact">
                                    <Form.Label>Email du contact </Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="emailContact" placeholder={target.emailContact} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTelContact">
                                    <Form.Label>Téléphone du contact</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="telContact" placeholder={target.telContact} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridSiteInternet">
                                    <Form.Label>Site internet</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="siteInternet" placeholder={target.siteInternet} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDeliveryDay">
                                    <Form.Label>Info de livraison</Form.Label>
                                    <Form.Control onChange={handleChange} type="text" name="deliveryDay" placeholder={target.deliveryDay} />
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
                <Button variant="primary" onClick={toCreateRestaurant} style={{ margin: "15px" }}>
                    Créer un nouveau restaurant   </Button>
            </Table>
        </StyledForm>


    )
}