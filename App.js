import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'

const RootStack = createStackNavigator(
  {
    Deck: { screen: Deck },
    DeckList: { screen: DeckList },
    NewDeck: { screen: NewDeck },
    Quiz: { screen: Quiz }
  },
  {
    initialRouteName: 'DeckList',
  }
)

export default RootStack