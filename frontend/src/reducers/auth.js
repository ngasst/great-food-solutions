export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "AUTH":
            return { ...state, token: action.token, msg: action.message };
        default:
            return state;
    }
};