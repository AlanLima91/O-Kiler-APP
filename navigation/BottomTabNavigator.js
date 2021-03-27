import React, { useEffect } from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PropTypes from 'prop-types'
// import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/Home'
import { useAuth } from '../services/provider'
// const BottomTab = createBottomTabNavigator()
// const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator ({ navigation }) {
  const { state, getAuthState } = useAuth()
  const checkIsLoggin = async () => {
    const user = await getAuthState()
    if (user === null) navigation.navigate('Login')
  }
  useEffect(() => {
    checkIsLoggin()
  }, [])
  if (!state?.user) return null
  return <HomeScreen navigation={navigation} />
}
BottomTabNavigator.propTypes = {
  navigation: PropTypes.object.isRequired
}
