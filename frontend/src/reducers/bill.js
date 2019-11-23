export const billReducer = (state={}, action) => {
    switch (action.type) {
        case "A":
            return {...state, newState}
        default:
            return state;
    }
}