/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { useAuth } from '../services/provider'
import { getAllGamePlay } from '../services/player'
import { joinedGamePlay } from '../services/gameplay'

const fullWidth = Dimensions.get('window').width

export default function HomeScreen (props) {
  const { handleLogout } = useAuth()
  const [gamePlay, setGamePlay] = useState([])
  const [keyJoined, setKeyJoined] = useState(null)
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
  const handleKeyJoined = (value) => {
    setKeyJoined(value)
  }
  const callAllGamePlay = async () => {
    try {
      const gamePlay = await getAllGamePlay()
      setGamePlay(gamePlay.gameplays)
    } catch (e) {
      console.error(e)
    }
  }
  const joinedGame = async () => {
    try {
      await joinedGamePlay({ keyJoined: keyJoined.toUpperCase() })
      alert('Félicitation vous avez rejoint une nouvelle partie.')
      setKeyJoined(null)
      callAllGamePlay()
    } catch (e) {
      alert('Fail to joined' + e.message)
    }
  }
  const goToGame = (id) => {
    alert('Go To Game : ' + id)
    // props.navigation.navigate('Gameplay', { id: id })
  }
  useEffect(() => {
    callAllGamePlay()
  }, [])
  const convertStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'started':
        return 'En cours'
      case 'finished':
        return 'Terminé'
      default:
        return 'En attente'
    }
  }

  const getColorStatus = (status) => {
    switch (status) {
      case 'pending':
        return '#0000ff'
      case 'started':
        return '#33cc33'
      case 'finished':
        return '#c2c2d6'
      default:
        return '#0000ff'
    }
  }
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
            <Text>REJOINS UNE PARTIE SANGLANTE</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 20,
                borderColor: '#000',
                borderWidth: 2,
                paddingLeft: 10
              }}
            >
              <TextInput
                placeholder={'Rentre ton code'}
                value={keyJoined}
                onChangeText={handleKeyJoined}
                style={{ height: 40 }}
              />
              <TouchableOpacity
                onPress={joinedGame}
                style={{
                  backgroundColor: '#ff6666',
                  borderRadius: 20,
                  marginLeft: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 10
                }}
              >
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {gamePlay.map((games) => {
              return (
                <TouchableWithoutFeedback key={games.id} onPress={() => goToGame(games.id)}>
                  <View style={styles.containerRoundGame}>
                    <View>
                      <Text numberOfLines={1} style={styles.titleGame}>
                        {games.name}
                      </Text>
                    </View>
                    <View style={[styles.statusBulle, { backgroundColor: getColorStatus(games.gameplayState) }]}>
                      <Text style={{ color: '#fff' }}>{convertStatus(games.gameplayState)}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            })}
          </View>
          <TouchableOpacity onPress={handleLogoutPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Déconnexion</Text>
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
    borderRadius: 15,
    justifyContent: 'center',
    marginBottom: 20,
    minHeight: 100,
    width: fullWidth * 0.9
  },
  containerRoundGame: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 15,
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
  },
  statusBulle: {
    borderRadius: 20,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'absolute'
  },
  titleGame: {
    color: '#fff',
    fontFamily: 'HVD',
    fontSize: 23,
    lineHeight: 30,
    paddingHorizontal: 10
  }
})
