import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import { persistDeck, getState } from '../utils'
import { connect } from 'react-redux'
import { setState } from '../actions'
import { primary, white } from '../utils/colors'

class NewDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deck',{})
    const title = deck.name ? `${deck.name} | New card` : 'New card'
    const headerTitleStyle = {
      color: white
    }
    const headerStyle = {
      backgroundColor: primary,
      
    }    
    return {
      title,
      headerStyle,
      headerTitleStyle,
      headerTintColor: white
    } 
  }

  state = {
    question: '',
    answer: ''
  }

  handleSubmit = async () => {
    const { navigation } = this.props
    const deck = navigation.getParam('deck',{})
    deck.questions.push(this.state)
    await persistDeck(deck)
    const state = await getState()
    this.props.setState(state)
    navigation.goBack()
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          placeholder="Enter the question"
          onChangeText={(text) => this.setState({ question: text })}
        />
        <TextInput
          placeholder="Enter the answer"
          onChangeText={(text) => this.setState({ answer: text.toLowerCase() })}
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