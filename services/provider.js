import React, { useMemo, useReducer, useContext } from 'react'
import { setAxiosToken } from './axiosAPI'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as api from './user'
import PropTypes from 'prop-types'
// IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, { initialState, LOGGED_IN, LOGGED_OUT } from '../components/reducer'
// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'

export const keys = [TOKEN_KEY, USER_KEY]
// CONTEXT ===================================
const AuthContext = React.createContext()

function AuthProvider (props) {
  const [state, dispatch] = useReducer(reducer, initialState || {})
  // Get Auth state
  const getAuthState = async () => {
    try {
      // GET DATA
      const data = await getStorageData()

      if (data) await handleLogin(data, true)
      else await handleLogout()

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  // Handle Login
  const handleLogin = async (data, isJwt) => {
    try {
      let newData
      if (isJwt) {
        setAxiosToken(data.token)
        newData = await api.loginJWT(data)
        setStorageData(data)
      } else {
        newData = await api.login(data)
        await setStorageData(newData) // STORE DATA
        setAxiosToken(newData.token) // AXIOS AUTHORIZATION HEADER
      }
      dispatch({ type: LOGGED_IN, user: newData.user }) // DISPATCH TO REDUCER

      return newData
    } catch (error) {
      handleLogout()
      throw error
    }
  }

  // Handle Logout
  const handleLogout = async () => {
    try {
      await setStorageData() // REMOVE DATA
      setAxiosToken(null) // AXIOS AUTHORIZATION HEADER
      dispatch({ type: LOGGED_OUT })// DISPATCH TO REDUCER
    } catch (error) {
      throw new Error(error)
    }
  }

  const value = useMemo(() => {
    return { state, getAuthState, handleLogin, handleLogout }
  }, [state])

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.object.isRequired
}
const useAuth = () => useContext(AuthContext)
export { AuthContext, useAuth }
export default AuthProvider

export const getStorageData = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY)
    const user = await AsyncStorage.getItem(USER_KEY)
    if (token !== null && user !== null) return { token, user: JSON.parse(user) }
    else return null
  } catch (error) {
    console.log({ error1: error })
    throw new Error(error)
  }
}

export const setStorageData = async (data) => {
  try {
    if (!data) {
      for (var i = 0; i < keys.length; i++) {
        await AsyncStorage.removeItem(keys[i])
      }
      return
    }
    const { token, user } = data
    const data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]]
    for (var y = 0; y < data_.length; y++) {
      await AsyncStorage.setItem(data_[y][0], data_[y][1])
    }
  } catch (error) {
    throw new Error(error)
  }
}
