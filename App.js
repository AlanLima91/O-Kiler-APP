import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SplashScreen } from 'expo'
import * as Font from 'expo-font'
import * as React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import RegisterScreen from './screens/Register'
import LoginScreen from './screens/Login'
import AuthProvider from './services/provider'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import NewGamePlayScreen from './screens/NewGamePlay'
const Stack = createStackNavigator()

export default function App ({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync () {
      try {
        SplashScreen.preventAutoHide()

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          HVD: require('./assets/fonts/HVD_Comic_Serif_Pro-webfont.ttf')
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hide()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NavigationContainer linking={LinkingConfiguration}>
        <AuthProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ title: 'O Killer', headerLeft: null, gesturesEnabled: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login', headerLeft: null, gesturesEnabled: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
            <Stack.Screen name="NewGamePlay" component={NewGamePlayScreen} options={{ title: 'Nouvelle Partie' }} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </View>
  )
}
App.propTypes = {
  skipLoadingScreen: PropTypes.bool
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
})
