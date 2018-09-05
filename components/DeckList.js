import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setState } from '../actions'
import { initStorage, isStorageInitialized, getState } from '../utils'
import { primary, primaryText, white, primaryLight } from '../utils/colors'
import { 
  TouchableOpacity,
  FlatList,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

class DeckList extends Component {
  static navigationOptions = {
    title: 'My Decks',
    headerTitleStyle: {
      color: white
    },
    headerStyle: {
      backgroundColor: primary
    },
  }

  state = {
    isLoading: true
  }  

  async componentDidMount () {
    if(await !isStorageInitialized()){
      await initStorage()
    }

    this.props.setState(await getState())
    this.setState({isLoading: false })
  }    

  render () {
    const { isLoading } = this.state

    if(isLoading){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            Loading... 
          </Text>
        </View>
      )
    }

    const decks = []
    if(this.props.state && Object.keys(this.props.state).length > 0){
      Object.keys(this.props.state).map(key => {
        decks.push(this.props.state[key])
      })
    }
    decks.push({name: 'New Deck'})

    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <FlatList
          data={decks}
          keyExtractor={item => item.name}
          style={styles.container}
          ItemSeparatorComponent = {ItemSeparator}
          renderItem={({item}) => (
            <DeckListItem {...this.props} deck={item} style={styles.item}/>
          )}
        />
      </View>
    )
  }
}

const ItemSeparator = () => {
  return (
    <View
      style={styles.separator}
    />
  );
}

const DeckListItem = (props) => {
  const { deck } = props

  if(deck.name === 'New Deck'){
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidPrimaryBtn}
        onPress={() => props.navigation.push('NewDeck')}
      >
        <Text style={styles.newDeck}> ➕ New Deck</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
    style={Platform.OS === 'ios' 
      ? styles.iosSubmitBtn 
      : styles.androidSecondaryBtn
    }
      onPress={() => props.navigation.push('Deck',{ deck })}
    >
      <Text style={styles.deck}>{deck.name}</Text>
      <Text style={styles.textMuted}>{deck.questions.length} cards</Text>
    </TouchableOpacity>
  )
}

function mapStateToProps ({ state }) {
  return { state }
}

const androidPrimaryBtn = {
  backgroundColor: primary,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  height: 85,
  borderRadius: 2,
  justifyContent: 'center',
  alignItems: 'stretch',
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
  newDeck: {
    color: primaryText,
    fontSize: 22,
    textAlign: 'center',
  },
  deck: {
    fontSize: 22,
    textAlign: 'center',
  },
  textMuted: {
    fontSize: 15,
    textAlign: 'center',
    color: primaryLight
  },
  separator: {
    height: 1,
  }
})

export default connect(mapStateToProps, { setState })(DeckList)