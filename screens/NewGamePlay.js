import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput as PaperTextInput } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select'
import PropTypes from 'prop-types'
import { newGamePlay } from '../services/gameplay'
import * as Layout from '../constants/Layout'

const pickerSelectStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    borderColor: 'purple',
    borderRadius: 8,
    borderWidth: 0.5,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingVertical: 8
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingVertical: 12
  }
})
const allDuration = [
  { label: 'Jour', value: 'day' },
  { label: 'Semaine', value: 'week' },
  { label: 'Heures', value: 'hours' }
]
export default function NewGamePlayScreen (props) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')

  const onSubmit = async () => {
    if (name.length === 0) {
      setError('Le champs name doit être remplit')
      return
    } else if (duration.length === 0) {
      setError('Vous devez ajouter une durée')
      return
    }
    setLoading(true)
    try {
      const data = { duration, name }
      await newGamePlay(data)
      setLoading(false)
      setError(null)
      props.navigation.navigate('Home', { reload: true })
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  const onDurationChange = (value) => {
    setDuration(value)
  }

  const onNameChange = (value) => {
    setName(value)
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>Crée une nouvelle partie</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <PaperTextInput
        mode={'outlined'}
        label={'Nom de la partie'}
        placeholder={'Nom'}
        maxLength={50}
        value={name}
        onChangeText={onNameChange}
        required={true}
        style={{ backgroundColor: 'white', marginTop: 10 }}
      />
      <View style={{ marginTop: 10 }}>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          onValueChange={onDurationChange}
          items={allDuration}
        />
      </View>
      <TouchableOpacity style={{ justifyContent: 'center', marginTop: 20, marginLeft: 0 }} onPress={onSubmit}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#0093FF', '#00DEFF']}
          style={styles.button}
        >
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.buttonSubmit}>VALIDER</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  )
}

NewGamePlayScreen.propTypes = {
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
    fontWeight: '700'
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
