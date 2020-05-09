export const CLEAR_STATE = 'CLEAR_STATE';
export const TEXT_CHANGE = 'TEXT_CHANGE';
export const BOOL_CHANGE = 'BOOL_CHANGE';
export const SET_ERROR = 'SET_ERROR';
export const LOGGED_IN = `LOGGED_IN`;
export const LOGGED_OUT = `LOGGED_OUT`;

export const  initialState = {
    isLoggedIn: false,
    user: null
};
const reducer = (state, action) => {
    switch (action.type) {
        case LOGGED_IN:{
            let { user } = action;
            return {...state, isLoggedIn: true, user};
        }

        case LOGGED_OUT:{
            return {...state, ...initialState};
        }

        case TEXT_CHANGE: {
            for (var i = 0; i < state.length; i++) {
                if(state[i].name === action.name) 
                    state[i].value = action.text;
            }
            return [...state];
        }

        case SET_ERROR: {
            return {...state, error: action.error};
        }

        case BOOL_CHANGE: {
            return {...state, [action.name]: {...action,value:!state[action.name].value}};
        }

        case CLEAR_STATE: {
            return {...state, ...action.state};
        }

        default:
            return state;
    }
};

export default reducer;
