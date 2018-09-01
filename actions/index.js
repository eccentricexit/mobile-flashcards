import { SET_STATE } from '../actions/types'

export function setState (state) {
  return {
    type: SET_STATE,
    payload: state
  }
}
