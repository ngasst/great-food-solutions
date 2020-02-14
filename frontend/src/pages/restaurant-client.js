import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client as http } from '../utils/http';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';

const Table = styled.form` 
height: 100%;
width: 100%;
text-align: center;
margin: auto;
align-content: "center";
  border: 15px;
  padding: 20px;
`;

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

 

    const TitleList = styled(ListGroup)`
font-style: italic ;
font-size: 30px;
`;

    return (
        <>
            <Table>
                <h1>{restaurants[0] && restaurants[0].client.name}</h1>

                <TitleList horizontal style={{width: "800px"}}>
                    <ListGroup.Item style={{width: "25%"}}> Nom </ListGroup.Item>
                    <ListGroup.Item style={{width: "25%"}}> Rue </ListGroup.Item>
                    <ListGroup.Item style={{width: "25%"}}> Ville </ListGroup.Item>
                    <ListGroup.Item style={{width: "25%"}}> Code Postal </ListGroup.Item>
                </TitleList>
                <ListGroup>
                {restaurants.map(restaurant =>
                    (<>
                        <ListGroup horizontal key={restaurant._id} style={{width: "800px"}}>
                            <ListGroup.Item style={{width: "25%"}}>{restaurant.name}</ListGroup.Item>
                            <ListGroup.Item style={{width: "25%"}}>{restaurant.street}</ListGroup.Item>
                            <ListGroup.Item style={{width: "25%"}}>{restaurant.city}</ListGroup.Item>
                            <ListGroup.Item style={{width: "25%"}}>{restaurant.zipCode}</ListGroup.Item>
                        </ListGroup>
                    </>
                    )
                )}
                </ListGroup>
            </Table>
        </>
    )}