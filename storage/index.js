import { AsyncStorage } from 'react-native'
const STORE_KEY = '@mobile-flashcards-mts'

export const initStorage = async () => {
  const decks = getDefaultDecks()
  const initialState = {}
  decks.map(deck => {
    initialState[deck.key] = deck
  })
  await storeState(initialState)
}

export const getDecks = async () => {
  const state = await getState()
  const keys = Object.keys(state)
  if(!keys){ return [] }

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
    [deck.key]: deck
  }
  await storeState(newState)
}

const getState = async () => {
  return JSON.parse(await AsyncStorage.getItem(STORE_KEY))
}

const storeState = async (state) => {
  const serializedState = JSON.stringify(state)
  return await AsyncStorage.setItem(
    STORE_KEY, 
    serializedState
  ) 
}

const getDefaultDecks = () => {
  return [
    {key: 'MongoDB'},
    {key: 'React'},
    {key: 'React Native'},
    {key: 'Solidity'},
    {key: 'L2 Scaling'}    
  ]
}



