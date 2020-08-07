import { AUTH_ERROR, GET_PROJECTS, LOAD_USER, LOGIN, LOGOUT } from '../types';

export default (state, action) => {
    const { payload, type } = action;
    switch(type){
        case LOGIN: 
        case LOAD_USER:
        return {
            ...state,
            isAuthenticated: true,
            user: payload.user,
            loading: false
        }
        case AUTH_ERROR: 
        case LOGOUT: 
        return {
            ...state,
            isAuthenticated: false,
            user: null,
            loading: false
        }

        case GET_PROJECTS:
            return {
                ...state,
                projects: payload,
                loading: false
            }

        default: return state;
    }
}