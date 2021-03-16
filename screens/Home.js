import React, { useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native-gesture-handler'
import { MonoText } from '../components/StyledText'
import { useAuth } from '../services/provider'

export default function HomeScreen (props) {
  const { handleLogout, state } = useAuth()
  const handleLogoutPress = async () => {
    try {
      await handleLogout()
      props.navigation.navigate('Login')
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (state && state.user) {
      if (state.user.tags.length === 0) {
        props.navigation.navigate('Profile')
      }
    }
  }, [state])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              // eslint-disable-next-line no-undef
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Open up the code for this screen:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change any of the text, save the file, and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleLogoutPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
HomeScreen.navigationOptions = {
  header: null
}

function DevelopmentModeNotice () {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    )

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    )
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    )
  }
}

function handleLearnMorePress () {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/')
}

// eslint-disable-next-line no-unused-vars
function handleHelpPress () {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  )
}

const styles = StyleSheet.create({
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  },
  developmentModeText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 20,
    textAlign: 'center'
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  getStartedText: {
    color: 'rgba(96,100,109, 1)',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center'
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 15
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    color: '#2e78b7',
    fontSize: 14
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  welcomeImage: {
    height: 80,
    marginLeft: -10,
    marginTop: 3,
    resizeMode: 'contain',
    width: 100
  }
})
