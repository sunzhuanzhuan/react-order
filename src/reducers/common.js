import { combineReducers } from 'redux'
// import { handleAction, handleActions, combineActions } from 'redux-actions';
import { handleAction, handleActions } from 'redux-actions';
import { getAllPlatform_success } from '@/actions'

export const platforms = handleAction(getAllPlatform_success, (state, action) => {
	return [
		...action.payload.data
	]
}, [])
export const ui = handleAction('SET_SLIDER_MENU_COLLAPSE', (state, action) => {
	return {
    ...state,
    sliderMenuCollapse: action.payload
	}
}, {
  sliderMenuCollapse: true
})


export default combineReducers({
	platforms,
  ui
})
