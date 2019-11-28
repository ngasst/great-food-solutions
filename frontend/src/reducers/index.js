import { combineReducers } from "redux";
import { billReducer } from "./bill";
import { clientReducer } from "./client";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order";
import { recipeReducer } from "./recipe";
import { restaurantReducer } from "./restaurant";

export const allReducers = combineReducers({
    bill: billReducer,
    client: clientReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    recipe: recipeReducer,
    restaurant: restaurantReducer
});
