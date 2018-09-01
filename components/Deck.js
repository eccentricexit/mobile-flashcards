import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { setState } from '../actions'

class Deck extends Component {  
  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deck',{})
    const title = deck.name ? deck.name : 'A deck screen'
    return {
      title
    }
  }

  handleAddCard = async () => {
    const { navigation } = this.props
    const deck = navigation.getParam('deck',{})
    navigation.push('NewCard',{ deck })
  }

  handleStartQuiz = async () => {
    const { navigation } = this.props
    const deck = navigation.getParam('deck',{})
    navigation.push('Quiz',{ deck })
  }

  render () {
    const { navigation, state } = this.props
    const deckName = navigation.getParam('deck',{}).name
    const deck = state[deckName]
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello from Deck. This is {deck.name}</Text>
        <Text>{deck.questions ? deck.questions.length : 0} cards</Text>
        <Button title='Add Card' onPress={this.handleAddCard}/>
        <Button title='Start Quiz' onPress={this.handleStartQuiz}/>
      </View>
    )
  }
}

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps, { setState })(Deck)