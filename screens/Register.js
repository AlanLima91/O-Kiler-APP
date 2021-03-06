import React, { useState, useReducer } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import reducer, { TEXT_CHANGE } from '../components/reducer'
import * as Layout from '../constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import * as api from '../services/user'
import PropTypes from 'prop-types'
export default function RegisterScreen (props) {
  const { navigation } = props

  const [error, setError] = useState(null)
  const [haveChange, setHaveChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const fields = [
    { name: 'username', label: 'Username', placeholder: 'Username', value: '', required: true },
    { name: 'email', label: 'Email', placeholder: 'email', value: '', required: true },
    { name: 'password', label: 'Password', placeholder: 'Mot de passe', value: '', required: true, secure: true }
  ]

  const onSubmit = async () => {
    setLoading(true)
    try {
      const data = {}
      for (let i = 0; i < stateEncaiss.length; i++) {
        data[stateEncaiss[i].name] = stateEncaiss[i].value
      }
      const response = await api.register(data)
      setLoading(false)
      console.log(response)
      if (response.username) navigation.navigate('Login')
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  const [stateEncaiss, dispatch] = useReducer(reducer, fields)
  const changeText = (name, text) => {
    if (!haveChange) setHaveChange(true)
    dispatch({ type: TEXT_CHANGE, name, text })
  }

  const toLogin = () => {
    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Insciption</Text>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        {stateEncaiss.map((field, key) => {
          return (
            <PaperTextInput
              key={key}
              mode={'outlined'}
              label={field.label}
              placeholder={field.placeholder}
              secureTextEntry={field.secure}
              value={field.value}
              onChangeText={(text) => changeText(field.name, text)}
              required={field.required}
              style={{ backgroundColor: 'white', marginTop: 10 }}
            />
          )
        })}
        <TouchableOpacity disabled={!haveChange} style={{ justifyContent: 'center', marginTop: 20, marginLeft: 0, opacity: (haveChange) ? 1 : 0.3 }} onPress={() => onSubmit()}>
          <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={['#0093FF', '#00DEFF']} style={styles.button} >
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonSubmit}>Insciption</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={toLogin}>
          <Text style={{}}>
                        Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 15,
    paddingBottom: 13,
    paddingLeft: Layout.width * 0.07,
    paddingRight: Layout.width * 0.07,
    paddingTop: 13,
    width: '100%'
  },
  buttonSubmit: {
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  container: {
    backgroundColor: '#fafafa',
    flex: 1
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40
  },
  errorText: {
    color: '#E6265C',
    fontSize: 15
  }
})
