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
import { askNotifPermissionStatus, updateNotif } from './utils'
import { Permissions } from 'expo'

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
    initialRouteName: 'DeckList'
  }
)

class App extends Component {
  async componentDidMount () {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    console.info('permission status:', status)
    if (status === 'undetermined') {
      if (await askNotifPermissionStatus() !== 'granted') {
        alert("You won't receive any notifications.")
      }
    } else if (status === 'granted') {
      console.info('notifId', await updateNotif())
    }
  }

  render () {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}

export default App
