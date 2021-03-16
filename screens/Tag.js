import React, { useState, useReducer, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import reducer, { TEXT_CHANGE, BOOL_CHANGE } from '../components/reducer'
import { TextInput as PaperTextInput } from 'react-native-paper'
import * as Layout from '../constants/Layout'
import * as api from '../services/tag'
export default function TagScreen () {
  const [error, setError] = useState(null)
  const [haveChange, setHaveChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const fields = [
    { name: 'tag', label: 'Tag', placeholder: 'Tag', value: '' }
  ]
  const onSubmit = async () => {
    if (stateEncaiss[0].value.length === 0) {
      setError('Le champs tag doit être remplit')
      return
    }
    setLoading(true)
    try {
      const data = { name: stateEncaiss[0].value }
      const response = await api.newTag(data)
      for (var i = 0; i < stateEncaiss.length; i++) {
        changeText(stateEncaiss[i].name, '')
      }
      const newTags = tags
      newTags.push(response)
      setLoading(false)
      setError(null)
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

  const getAllTags = async () => {
    try {
      const response = await api.getTags()
      setTags(response.tags)
    } catch (e) {
      setError(e.message)
    }
  }

  const onRemove = async (i) => {
    try {
      const response = await api.deleteTag(tags[i]._id)

      const temp = [...tags]
      temp.splice(i, 1)
      setTags(temp)
    } catch (e) {
      setError(e.message)
    }
  }
  useEffect(() => {
    getAllTags()
  }, [])
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>Tags</Text>
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
            <Text style={styles.buttonSubmit}>VALIDER</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.tagList}>
        <Text>Tags actifs :</Text>
        <View>
          {tags.map((tag, i) => {
            return (
              <View key={i} style={styles.tagItems}>
                <Text>{tag.name}</Text>
                <TouchableOpacity onPress={() => onRemove(i)}>
                  <Entypo name="circle-with-cross" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
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
  },
  tagItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  tagList: {
    marginTop: 20
  }
})
