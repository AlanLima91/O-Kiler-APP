/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PropTypes from 'prop-types'
import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/Home'
import { useAuth } from '../services/provider'
const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator ({ navigation }) {
  const { getAuthState } = useAuth()

  const checkIsLoggin = async () => {
    const user = await getAuthState()
    if (user === null) navigation.navigate('Login')
  }
  useEffect(() => {
    checkIsLoggin()
  }, [])

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />
        }}
      />
    </BottomTab.Navigator>
  )
}
BottomTabNavigator.propTypes = {
  navigation: PropTypes.object.isRequired
}
