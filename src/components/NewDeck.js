import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class NewDeck extends Component {
  static navigationOptions = {
    title: 'Create New Deck',
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello from Create New Deck</Text>
      </View>
    )
  }
}