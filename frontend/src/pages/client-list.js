import React, { useState, useEffect } from 'react';
import { client as http } from '../utils/http';
import { Link } from 'react-router-dom';
import { Form, Col, ListGroup, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const StyledForm = styled(Form)`
margin: 45px;
margin-block-start: 1em;
border: solid;
padding: center;
padding-top: 20px;
padding-bottom: 20px;
border-color: rgba(239, 66, 35, 0.75);
margin-bottom: 170px;

`;

const Table = styled.form` 
display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  text-align: center;
  font-size: 2,5vw;
`;


export default function ClientList({history}) {
    const [clients, setClients] = useState([]);
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
                history.push("/clientlist");
            })
            .catch(err => {
                console.error(err);
            })
        }
    }


    const handleChange = (e) => {
        const name = e.target.name;
        setNewClient({...newClient, [name]: e.target.value});
    }
    const handleClose = () => {
        setShowMod(false);
    }
    const handleShow = (e) => {
        if(e.target.getAttribute("id").split("-")[1]==="s") {
            const id = e.target.getAttribute("id").split("-")[0];
            const name = e.target.getAttribute("name");
            setTarget({ id, name });
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
        <StyledForm>
        <Table>
            <h1>Liste des clients</h1>
            
            <ListGroup style={{ padding: "25px", alignItems: "center" }}>
            {clients.map(client =>
                (
                    <ListGroup horizontal key={client._id} style={{ width: "100%" }}>
                        <ListGroup.Item style={{ width: "70%" }}><Link className="link-router" to={`/client/${client._id}`}>{client.name}</Link></ListGroup.Item>
                        <Button variant="secondary" style={{ width: "20%", margin: "5px" }}><span id={`${client._id}-m`} name={client.name} onClick={handleShow}>Modifier</span></Button>
                    </ListGroup>
                )
            )}
            </ListGroup>
           
            <Modal show={showMod} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Mise à jour de {target.name}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={modifyClient}>
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
                </Form>
            </Modal>
            <Button variant="secondary" onClick={toCreateClient}>
                Créer un nouveau client
            </Button>
        </Table>
        </StyledForm>
    )}

