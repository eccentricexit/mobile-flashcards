import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Deck from './src/components/Deck'
import DeckList from './src/components/DeckList'
import Quiz from './src/components/Quiz'
import NewDeck from './src/components/NewDeck'

const RootStack = createStackNavigator({
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