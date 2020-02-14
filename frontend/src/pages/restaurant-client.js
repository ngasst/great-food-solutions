import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client as http } from '../utils/http';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';


export default function RestaurantClient() {
    const [restaurants, setRestaurants] = useState([]);
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

    const Table = styled.form` 
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
  padding: 15px;
`;

    const TitleList = styled(ListGroup)`
font-style: italic ;
font-size: 30px;
`;

    return (
        <>
            <Table>
                <h1>{restaurants[0] && restaurants[0].client.name}</h1>

                <TitleList horizontal>
                    <ListGroup.Item md="3"> Nom </ListGroup.Item>
                    <ListGroup.Item xs> Rue </ListGroup.Item>
                    <ListGroup.Item xs> Ville </ListGroup.Item>
                    <ListGroup.Item xs> Code Postal </ListGroup.Item>
                </TitleList>
                <ListGroup>
                {restaurants.map(restaurant =>
                    (<>
                        <ListGroup horizontal key={restaurant._id}>
                            <ListGroup.Item xs>{restaurant.name}</ListGroup.Item>
                            <ListGroup.Item xs>{restaurant.street}</ListGroup.Item>
                            <ListGroup.Item xs>{restaurant.city}</ListGroup.Item>
                            <ListGroup.Item xs>{restaurant.zipCode}</ListGroup.Item>
                        </ListGroup>
                    </>
                    )
                )}
                </ListGroup>
            </Table>
        </>
    )}