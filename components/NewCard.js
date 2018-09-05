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
        <Text style={{marginBottom: 20, fontSize: 50}} >📄</Text>
        <TextInput
          placeholder="Enter the question"
          onChangeText={(text) => this.setState({ question: text })}
          style={styles.question}
        />
        <TextInput
          placeholder="Enter the answer"
          onChangeText={(text) => this.setState({ answer: text.toLowerCase() })}
          style={styles.answer}
        />
        <TouchableOpacity 
          onPress={this.handleSubmit}
          style={Platform.OS === 'ios' 
            ? styles.iosSubmitBtn 
            : styles.androidPrimaryBtn
          }
        >
          <Text style={styles.textBtn}>Submit</Text>
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
    marginTop:24
  },
  textBtn: {    
    fontSize:20,
    color: white,
    textAlign: 'center'
  },
  question: {
    fontSize: 18,
    marginTop:80,    
    width: '80%',
  },
  answer: {
    fontSize: 18,
    marginTop:30,
    marginBottom: 100,
    width: '80%'
  }
})

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps, { setState })(NewDeck)