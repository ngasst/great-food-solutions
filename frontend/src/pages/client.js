import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../utils/http';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import RecipeClient from './recipe-client';
import RestaurantClient from './restaurant-client';

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

const Table = styled(Form)` 
padding: 35px;

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

        <RecipeClient style={{width: "100%"}} />
        <RestaurantClient style={{width: "100%"}}/>
        </Table>
        </StyledForm>
    )
}