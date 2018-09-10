import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const STORE_KEY = 'mobile-flashcards'

export const askNotifPermissionStatus = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  return status
}

const quizNotification = {
  title: 'Daily reminder',
  body: 'Just reminding you to complete at least one quiz today. :)',
  android: {
    sound: true,
    sticky: false,
    vibrate: true
  },
  ios: {
    sound: true,
    sticky: false,
    vibrate: true
  }
}

export const updateNotif = async () => {
  if (await !askNotifPermissionStatus()) {
    console.warn('No permission to use notifications')
    return
  }

  // cancel any existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync()
  const future = (new Date()).getTime() + 24 * 60 * 60 * 1000

  return await Notifications.scheduleLocalNotificationAsync(
    quizNotification,
    {
      time: future,
      repeat: 'day'
    }
  )
}

export const isStorageInitialized = async () => {
  const state = await getState()
  return state !== null
}

export const initStorage = async () => {
  const decks = getDefaultDecks()
  const initialState = {}
  decks.map(deck => {
    initialState[deck.name] = deck
  })
  await storeState(initialState)
}

export const getDecks = async () => {
  const state = await getState()
  const keys = Object.keys(state)
  if (!keys) { return [] }

  const decks = []
  keys.map(key => {
    decks.push(state[key])
  })

  return decks
}

export const persistDeck = async (deck) => {
  const prevState = await getState()
  const newState = {
    ...prevState,
    [deck.name]: deck
  }
  await storeState(newState)
}

export const getState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem(STORE_KEY)
    return JSON.parse(serializedState)
  } catch (e) {
    console.error('Error getting state:', e)
    return null
  }
}

export const storeState = async (state) => {
  const serializedState = JSON.stringify(state)
  return await AsyncStorage.setItem(
    STORE_KEY,
    serializedState
  )
}

const getDefaultDecks = () => {
  return [
    {name: 'MongoDB', questions: []},
    {name: 'React', questions: []},
    {name: 'React Native', questions: []},
    {name: 'Solidity', questions: []},
    {name: 'L2 Scaling', questions: []}
  ]
}
