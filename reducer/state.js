import { SET_STATE } from '../actions/types'

export function state (state = {}, action) {
  switch (action.type) {
    case SET_STATE: {
      return action.payload
    }
    default:
      return state
  }
}