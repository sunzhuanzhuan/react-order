import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';


import {
  ___Action____success,
} from '../actions'

export const ___Reducers___ = handleActions({
	[combineActions(___Action____success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	}
}, {})

export default combineReducers({
  ___Reducers___
})
