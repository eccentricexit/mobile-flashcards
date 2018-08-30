import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Button } from 'react-native'

export default class DeckList extends Component {
  static navigationOptions = {
    title: 'My Decks',
  }
  render () {
    const decks = [
      {key: 'MongoDB'},
      {key: 'React'},
      {key: 'React Native'},
      {key: 'Solidity'},
      {key: 'L2 Scaling'},
      {key: 'New Deck'}
    ]

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

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})