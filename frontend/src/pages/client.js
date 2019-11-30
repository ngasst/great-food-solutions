import React, { useState, useEffect } from 'react';
import { client as http } from '../utils/http';
 
export default function Client() {
    const [recipes, setRecipes] = useState([]);
    useEffect(()=>{
        getRecipes();
    },[])

    function getRecipes() {
        const clientID = window.location.pathname.split("/")[2];
        http.get(`/recipes/clients/${clientID}`)
            .then(({ data: { payload } }) => {
                setRecipes(payload);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <div>
            <h1>Client</h1>
            <table>
                <thead>
                    <tr>
                        <td>Actif</td>
                        <td>Recette</td>
                        <td>Ingredients</td>
                        <td>Instructions</td>
                        <td>Emballage</td>
                        <td>HPP</td>
                        <td>Prix</td>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map(recipe => 
                        (
                        <tr key={recipe._id}>
                            <td>
                                <input type="checkbox" name="isActif" checked />
                            </td>
                            <td>{recipe.name}</td>
                            <td>
                                <ul>
                                {recipe.ingredients.map((ingredient,i) => 
                                    (
                                        <li key={i}>{ingredient.name}</li>
                                    )
                                )}
                                </ul>
                            </td>
                            <td>
                                <ol>
                                {recipe.instructions.map((instruction,i) => 
                                    (
                                        <li key={i}>{instruction}</li>
                                    )
                                )}
                                </ol>
                            </td>
                            <td>To Be Defined</td>
                            <td>To Be Defined</td>
                            <td>To Be Calculated</td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}