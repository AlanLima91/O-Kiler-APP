import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home';
import AnswerScreen from '../screens/Answer';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import AuthProvider ,{ useAuth } from "../services/provider";

export default function BottomTabNavigator({navigation, route}) {
  const {getAuthState} = useAuth();

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
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
          }}
        />
        <BottomTab.Screen
          name="Answer"
          component={AnswerScreen}
          options={{
            title: 'Questions',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
          }}
        />
    </BottomTab.Navigator>
  );
}