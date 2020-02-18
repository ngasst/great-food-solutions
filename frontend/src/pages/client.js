import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../utils/http';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
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
        <StyledForm>
        <Table>
            <h1>{state.payload && state.payload.name}</h1>
            <Link style={{ padding: "25px"}} className="link-router" to={`/client/${id}/recipes`}><ButtonClient style={{ width: "300px"}} >Recettes</ButtonClient></Link>
            <Link style={{ padding: "25px"}}className="link-router" to={`/client/${id}/restaurants`}><ButtonClient style={{ width: "300px"}} >Restaurants</ButtonClient></Link>
        </Table>
        </StyledForm>
    )
}