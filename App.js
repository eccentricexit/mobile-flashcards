import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import { createStore } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'


const store = createStore(reducer)

const RootStack = createStackNavigator(
  {
    Deck: { screen: Deck },
    DeckList: { screen: DeckList },
    NewDeck: { screen: NewDeck },
    Quiz: { screen: Quiz },
    NewCard: { screen: NewCard }
  },
  {
    initialRouteName: 'DeckList',
  }
)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}

export default App