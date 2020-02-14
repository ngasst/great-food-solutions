import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../utils/http';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';


const Table = styled(Form)` 
height: 100%;
width: 80%;
text-align: center;
margin: auto;
  width: 600px;
  border: 15px;
  padding: 20px;
`;

const ButtonClient = styled(Button)`
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px;
  border-radius: 3px;
`;

export const Client = () => {
    const [state, setState] = useState({});
    const { id } = useParams();
    useEffect(() => {
        getClient();
    }, []);
    function getClient() {
        client.get(`/clients/${id}`)
            .then(({ data: { payload } }) => {
                setState({ payload })
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <Table>
            <h1>{state.payload && state.payload.name}</h1>
            <Link className="link-router" to={`/client/${id}/recipes`}><ButtonClient>Recipes</ButtonClient></Link>
            <Link className="link-router" to={`/client/${id}/restaurants`}><ButtonClient>Restaurants</ButtonClient></Link>
        </Table>
    )
}