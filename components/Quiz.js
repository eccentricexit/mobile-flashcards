import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello from Quiz</Text>
      </View>
    )
  }
}