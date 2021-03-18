import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuth } from '../services/provider'

const fullWidth = Dimensions.get('window').width

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
  const goToCreateGame = () => {
    props.navigation.navigate('NewGamePlay')
  }
  useEffect(() => {
    if (state && state.user) {
      //
    }
  }, [state])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.helpContainer}>
          <View style={styles.containerRound}>
            <Text>CRÉE UNE PARTIE AFIN DE TUER TES POTES</Text>
            <TouchableOpacity onPress={goToCreateGame} style={{ marginTop: 10 }}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.containerRound}>
            <Text>REJOINS UNE PARTIE SANGLANTE EXISTANTE</Text>
          </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  containerRound: {
    alignItems: 'center',
    backgroundColor: '#ff052f',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 20,
    minHeight: 100,
    width: fullWidth * 0.9
  },
  contentContainer: {
    paddingTop: 30
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
  }
})
