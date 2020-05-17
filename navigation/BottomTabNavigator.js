import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home';
import AnswerScreen from '../screens/Answer';
import TagScreen from '../screens/Tag';
import LoginScreen from '../screens/Login';
import ProfileScreen from '../screens/Profile';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import AuthProvider ,{ useAuth } from "../services/provider";

export default function BottomTabNavigator({navigation, route}) {
  const {getAuthState,handleLogout} = useAuth();

  const checkIsLoggin = async () => {
    const user = await getAuthState();
    if (user === null) navigation.navigate("Login");
  }
  useEffect(()=> {
    checkIsLoggin();
  },[]);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" type="Entypo" />,
          }}
        />
        <BottomTab.Screen
          name="Answer"
          component={AnswerScreen}
          options={{
            title: 'Questions',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-help-circle" />,
          }}
        />
        <BottomTab.Screen
          name="Tags"
          component={TagScreen}
          options={{
            title: 'Tags',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="hash" type="Feather" />,
          }}
        />
    </BottomTab.Navigator>
  );
}