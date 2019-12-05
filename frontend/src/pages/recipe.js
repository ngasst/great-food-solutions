import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../utils/http';
import App from '../Component/App';

 
export default function Recipe() {
    const [state, setState] = useState({recipes:[]});
    useEffect(()=>{
        getRecipes();
    },[]);

    function getRecipes() {
        client.get("/recipes")
            .then(({ data: { payload } }) => {
                setState({...state, recipes: payload})})
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
        <App />
        <div>
            <h1>Recipe</h1>
            <table>
                <thead>
                    <tr>
                        <td>Recipe name</td>
                        <td>Client list</td>
                    </tr>
                </thead>
                <tbody>
                    {state.recipes && state.recipes.map(recipe => 
                        (
                        <tr key={recipe._id}>
                            <td>{recipe.name}</td>
                            <td><Link className="link-router" to={`/client/${recipe.client._id}`}>{recipe.client.name}</Link></td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
}