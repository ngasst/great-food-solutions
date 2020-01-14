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

    return (
        <>
            <Table>
                <h1>{restaurants[0] && restaurants[0].client.name}</h1>

                <TitleList horizontal>
                    <ListGroup.Item style={{ width: "50%" }}> Name </ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> Street </ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> City </ListGroup.Item>
                    <ListGroup.Item style={{ width: "50%" }}> Zip code </ListGroup.Item>
                </TitleList>
                <ListGroup>
                {restaurants.map(restaurant =>
                    (<>
                        <ListGroup horizontal key={restaurant._id}>
                            <ListGroup.Item style={{ width: "50%" }}>{restaurant.name}</ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>{restaurant.street}</ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>{restaurant.city}</ListGroup.Item>
                            <ListGroup.Item style={{ width: "50%" }}>{restaurant.zipCode}</ListGroup.Item>
                        </ListGroup>
                    </>
                    )
                )}
                </ListGroup>
            </Table>
        </>
    )}