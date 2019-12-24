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

export default function Client({history}) {
    const [clients, setClients] = useState([]);
    const [showRem, setShowRem] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [target, setTarget] = useState({});
    const [newClient, setNewClient] = useState({id: "", name: ""})
    
    useEffect(() => {
        getClients();
    }, [])

    function getClients() {
        http.get("/clients")
            .then(({ data: { payload } }) => {
                setClients(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

    function modifyClient(e) {
        e.preventDefault();
        if(newClient.name!==target.name) {
            http.put("clients", newClient)
            .then(() => {
                setShowMod(false);
                history.push("/client");
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

    function removeClient() {
        http.delete(`/clients/${target.id}`)
            .then(() => {
                setShowRem(false);
                history.push("/client");
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        setNewClient({...newClient, [name]: e.target.value});
    }
    const handleClose = () => {
        setShowRem(false);
        setShowMod(false);
    }
    const handleShow = (e) => {
        if(e.target.getAttribute("id").split("-")[1]==="s") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name");
            setTarget({ id, name });
            setShowRem(true);
        } else if(e.target.getAttribute("id").split("-")[1]==="m") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name");
            setTarget({ id, name });
            setNewClient({ id, name });
            setShowMod(true);
        }
    }

    const toCreateClient = () => {
        history.push("/client-form");
    }

    return (
        <Table>
            <h1>Liste des clients</h1>
            <TitleList horizontal>
                <ListGroup.Item style={{ width: "50%" }}> Nom </ListGroup.Item>
            </TitleList>
            <ListGroup>
            {clients.map(client =>
                (
                    <ListGroup horizontal key={client._id}>
                        <ListGroup.Item style={{ width: "50%" }}>{client.name}</ListGroup.Item>
                        <ListGroup.Item style={{ width: "10%" }}><span id={`${client._id}-s`} name={client.name} onClick={handleShow}>X</span></ListGroup.Item>
                        <ListGroup.Item style={{ width: "10%" }}><span id={`${client._id}-m`} name={client.name} onClick={handleShow}>M</span></ListGroup.Item>
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
                    <Button variant="primary" onClick={removeClient}>
                        Oui
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showMod} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Mise à jour de {target.name}</Modal.Title>
                </Modal.Header>
                <StyledForm onSubmit={modifyClient}>
                    <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control onChange={handleChange} type="Nom" name="name" required placeholder={target.name} />
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
            <Button variant="primary" onClick={toCreateClient}>
                Nouveau client
            </Button>
        </Table>
    )}

