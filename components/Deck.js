import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Deck extends Component {  
  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deck',{})
    const title = deck.name ? deck.name : 'A deck screen'
    return {
      title
    }
  }

  render () {
    const { navigation } = this.props
    const deck = navigation.getParam('deck',{})
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello from Deck. This is {deck.name}</Text>
      </View>
    )
  }
}