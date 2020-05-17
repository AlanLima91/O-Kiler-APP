import React, { useMemo, useReducer, useContext, useState, useRef, useEffect } from 'react';
import axios from "axios";
// import SInfo from 'react-native-sensitive-info';
import * as SecureStore from 'expo-secure-store';
import * as api from "./user";
//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, { initialState, LOGGED_IN, LOGGED_OUT } from "../components/reducer";
// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

const KEYCHAIN_SERVICE = "S1SVme5fIUQJnoCOrzyLHx4zhPdPznIm";
export const keys = [TOKEN_KEY, USER_KEY];
// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});
    // Get Auth state
    const getAuthState = async () => {
        try {
            //GET DATA
            let data = await getStorageData();
            
            if (data) await handleLogin(data, true);
            else await handleLogout();

            return data;
        } catch (error) {
            throw new Error(error);
            return null;
        }
    };

    // Handle Login
    const handleLogin = async (data, isJwt) => {
        try {
            let newData;
            if (isJwt) {
                setAuthorization(data.token);
                newData = await api.loginJWT(data);
                setStorageData(data);
            } else {
                newData = await api.login(data);
                await setStorageData(newData); //STORE DATA
                setAuthorization(newData.token); //AXIOS AUTHORIZATION HEADER
            }
            dispatch({ type: LOGGED_IN, user: newData.user }); //DISPATCH TO REDUCER

            return newData;
        } catch (error) {
            handleLogout();
            throw error;
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            await setStorageData(); //REMOVE DATA
            setAuthorization(null); //AXIOS AUTHORIZATION HEADER
            dispatch({ type: LOGGED_OUT });//DISPATCH TO REDUCER
        } catch (error) {
            throw new Error(error);
        }
    };

    const value = useMemo(() => {
        return { state, getAuthState, handleLogin, handleLogout};
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth };
export default AuthProvider;

// HELPERS ===================================
export const setAuthorization = (token) => {
    // Apply authorization token to every request if logged in
    if (!token) delete axios.defaults.headers.common["Authorization"];
    else axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getStorageData = async () => {
    try {
        let token = await SecureStore.getItemAsync(TOKEN_KEY, { keychainService: KEYCHAIN_SERVICE });
        let user = await SecureStore.getItemAsync(USER_KEY, { keychainService: KEYCHAIN_SERVICE });
        if (token !== null && user !== null) return { token, user: JSON.parse(user) };
        else return null;

    } catch (error) {
        console.log({ error1: error });
        throw new Error(error);
    }
};

export const setStorageData = async (data) => {
    try {
        if (!data) {
            for (var i = 0; i < keys.length; i++) {
                await SecureStore.deleteItemAsync(keys[i], {
                    keychainService: KEYCHAIN_SERVICE
                });
            }
        }
        else {
            // console.log("SInfo : ",SInfo);
            // SInfo.setInvalidatedByBiometricEnrollment(false);
            let { token, user } = data;
            let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]];
            for (var i = 0; i < data_.length; i++) {
                await SecureStore.setItemAsync(data_[i][0], data_[i][1], {
                    keychainService: KEYCHAIN_SERVICE
                });
            }
        }
    } catch (error) {
        throw new Error(error);
    }
};