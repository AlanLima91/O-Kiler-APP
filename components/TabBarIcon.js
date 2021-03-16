import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import * as React from 'react'

import Colors from '../constants/Colors'

export default function TabBarIcon (props) {
  if (props.type === 'Feather') {
    return (
      <Feather
        name={props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  } else if (props.type === 'Entypo') {
    return (
      <Entypo
        name={props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  } else {
    return (
      <Ionicons
        name={props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    )
  }
}
