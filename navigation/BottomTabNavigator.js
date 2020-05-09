import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home';
import LinksScreen from '../screens/Links';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import AuthProvider ,{ useAuth } from "../services/provider";

function BottomTabNavigator({navigation, route}) {
  const {getAuthState} = useAuth();
  const checkIsLoggin = async () => {
    const user = await getAuthState();
    console.log(user);
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
            title: 'Get Started',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
          }}
        />
        <BottomTab.Screen
          name="Links"
          component={LinksScreen}
          options={{
            title: 'Resources',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
          }}
        />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation, route }) {
  navigation.setOptions({ headerTitle: "O Killer" });
  return (
        <AuthProvider>
          <Stack.Navigator
            initialRouteName='Home'
            headerMode='none'
            mode='modal'
            screenOptions={{
              animationTypeForReplace: 'pop',
              gestureEnabled: false,
            }}
          >
            <Stack.Screen name='Home' component={BottomTabNavigator} navigation={navigation} route={route} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            
          </Stack.Navigator>
        </AuthProvider>
      
  );
}