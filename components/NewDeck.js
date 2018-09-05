import React, { Component } from 'react'
import { persistDeck, getState } from '../utils'
import { connect } from 'react-redux'
import { setState } from '../actions'
import { primary, white } from '../utils/colors'
import { 
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput
} from 'react-native'

class NewDeck extends Component {
  static navigationOptions = {
    title: 'Create New Deck',
    headerTitleStyle: {
      color: white
    },
    headerStyle: {
      backgroundColor: primary
    },
    headerTintColor: white
  }

  state = {
    deck: {
      name: '',
      questions: []
    }
  }

  handleSubmit = async () => {
    if(this.state.deck.name.length===0){
      alert('A name is required 🤷')
      return
    }

    await persistDeck(this.state.deck)    
    const state = await getState()
    this.props.setState(state)
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>What is the title of the new deck?</Text>
        <TextInput
          placeholder="Deck title"
          onChangeText={(text) => {
            const { deck } = this.state
            deck.name = text
            this.setState({ deck })
          }}
          style={styles.input}
        />
        <TouchableOpacity           
          onPress={this.handleSubmit}
          style={Platform.OS === 'ios' 
            ? styles.iosSubmitBtn 
            : styles.androidPrimaryBtn
          }
        >
          <Text style={styles.textBtn}>🎴 Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iosSubmitBtn: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 7,
    height: 45,    
  },
  androidPrimaryBtn: {
    backgroundColor: primary,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: 250,
    height: 65,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'stretch',
    elevation:2,
    marginTop:8
  },
  title: {
    fontSize: 42,
    paddingLeft:30,
    paddingRight:30,
    textAlign: 'center'
  },
  textBtn: {    
    fontSize:20,
    color: white,
    textAlign: 'center'
  },
  input: {
    fontSize: 30,
    marginTop:100,
    marginBottom:100,
    width:300
  }
})

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps, { setState })(NewDeck)