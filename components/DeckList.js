import React, { Component } from 'react'
import { FlatList, View, Button, Text } from 'react-native'
import { getDecks, initStorage, isStorageInitialized, getState } from '../storage'
import { connect } from 'react-redux'
import { setState } from '../actions'

class DeckList extends Component {
  static navigationOptions = {
    title: 'My Decks'
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
    decks.push({key: 'New Deck'})

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={decks}
          renderItem={({item}) => <DeckListItem {...this.props} deck={item}/>}
        />
      </View>
    )
  }
}

const DeckListItem = (props) => {
  const { deck } = props

  if(deck.key === 'New Deck'){
    return (
      <Button
        title='New Deck'
        onPress={() => props.navigation.push('NewDeck')}
      />
    )
  }

  return (
    <Button
      title={deck.key}
      onPress={() => props.navigation.push('Deck',{ deck })}
    />
  )
}

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps, { setState })(DeckList)