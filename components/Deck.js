import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setState } from '../actions'
import { primary, primaryLight, white } from '../utils/colors'
import { 
  TouchableOpacity,
  FlatList,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

class Deck extends Component {  
  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deck',{})
    const title = deck.name ? deck.name : 'A deck screen'
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
        <Text style={styles.deckTitle}>📔</Text>
        <Text style={styles.deckTitle}>{deck.name}</Text>
        <Text style={styles.cardCount}>{deck.questions ? deck.questions.length : 0} cards</Text>        
        <TouchableOpacity 
          onPress={this.handleAddCard}
          style={Platform.OS === 'ios' 
            ? styles.iosSubmitBtn 
            : styles.androidPrimaryBtn
          }
        >
          <Text style={{
              color: white,
              textAlign: 'center',
              fontSize:20
            }}
          >
            Add Card
          </Text>
        </TouchableOpacity>

        {deck.questions.length > 0 &&           
          <TouchableOpacity 
            onPress={this.handleStartQuiz}
            style={Platform.OS === 'ios' 
              ? styles.iosSubmitBtn 
              : styles.androidSecondaryBtn
            }
          >
            <Text style={{
                fontSize:20,
                textAlign: 'center',
              }}
            >Start Quiz</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

const androidPrimaryBtn = {
  backgroundColor: primary,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  width:250,
  height: 84,
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'stretch',
  elevation:2,
  marginBottom:16
}

const androidSecondaryBtn = {
  ...androidPrimaryBtn,
  backgroundColor: white
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
  androidPrimaryBtn, 
  androidSecondaryBtn,
  deckTitle:{
    fontSize: 42,
    marginBottom: 12    
  },
  cardCount:{
    fontSize: 22,
    color: primaryLight,
    marginBottom:100
  }
})

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps, { setState })(Deck)