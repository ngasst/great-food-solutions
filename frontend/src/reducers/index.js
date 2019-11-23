import { combineReducers } from "redux";
export { billReducer } from "./bill";
export { clientReducer } from "./client";
export { ingredientReducer } from "./ingredient";
export { orderReducer } from "./order";
export { recipeReducer } from "./recipe";
export { restaurantReducer } from "./restaurant";

export const allReducers = combineReducers({
    bill: billReducer,
    client: clientReducer,
    ingredient: ingredientReducer,
    order: orderReducer,
    recipe: recipeReducer,
    restaurant: restaurantReducer
})