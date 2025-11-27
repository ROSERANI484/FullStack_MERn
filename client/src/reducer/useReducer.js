export const initialState = false;

export const reducer = (state, action) => {
    switch (action.type) {
        case "USER":
            return true;
        case "LOGOUT":
            return false;
        default:
            return state;
    }
};
