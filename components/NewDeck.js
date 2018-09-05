import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { persistDeck, getState } from '../utils'
import { connect } from 'react-redux'
import { setState } from '../actions'
import { primary, white } from '../utils/colors'

class NewDeck extends Component {
  static navigationOptions = {
    title: 'Create New Deck',
    headerTitleStyle: {
      color: white
    },
    headerStyle: {
      backgroundColor: primary
    },
  }

  state = {
    deck: {
      name: '',
      questions: []
    }
  }

  handleSubmit = async () => {
    await persistDeck(this.state.deck)    
    const state = await getState()
    this.props.setState(state)
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>What is the title of the new deck?</Text>
        <TextInput
          placeholder="Deck title"
          onChangeText={(text) => {
            const { deck } = this.state
            deck.name = text
            this.setState({ deck })
          }}
        />
        <Button title='Submit' onPress={this.handleSubmit}/>
      </View>
    )
  }
}

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps, { setState })(NewDeck)