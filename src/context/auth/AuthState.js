import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import { firebase, provider } from '../../firebase/config'
import { LOGIN, LOAD_USER, AUTH_ERROR, LOGOUT } from '../types'
import M from 'materialize-css/dist/js/materialize.min.js'

const AuthState = (props) => {

    const initalState = {
        loading: true,
        isAuthenticated: false,
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initalState);

    const login = async () => {
        try {
            const res = await firebase.auth().signInWithPopup(provider);

            dispatch({
                type: LOGIN,
                payload: res
            })
 
        } catch (err) {
            console.error(err)
            dispatch({
                type: AUTH_ERROR,
            })
        }
    }

    const logout = async () => {
        try {
            await firebase.auth().signOut();
            M.toast({ html: 'Logged Out!' });
            dispatch({
                type: LOGOUT,
            })
        } catch (err) {
            console.error(err);
            dispatch({
                type: AUTH_ERROR,
            })
        }
    }

    const loadUser = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                dispatch({
                    type: LOAD_USER,
                    payload: { user }
                })
            }
        })
    }

    return (
        <AuthContext.Provider value={{
            loading: state.loading,
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            login,
            logout,
            loadUser
        }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState
