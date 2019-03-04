import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import {
	getAccountInfo_success,
	updateFetchInfo
} from '../actions'
import { allEditables } from "@/accountManage/constants/editables";

const handleEdit = (_data) => {
	let data = { ..._data }
	for (let key in data) {
		if (!data.hasOwnProperty(key)) continue
		if (parseInt(data[key]) === 1 && Object.keys(allEditables).find(str => str === key)) {
			delete data[key]
			delete data[allEditables[key]]
		}
	}
	return data
}
let initEditable = () => {
	let obj = {}
	Object.keys(allEditables).forEach(key => {
		obj[key] = 1
	})
	return obj
}

// 账号id
export const id = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { id } = action.payload.data
		return id
	}
}, '')

// 账号基本信息
export const base = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { base = {} } = action.payload.data
		return {
			...state,
			...base
		}
	},
	[combineActions(updateFetchInfo)]: (state, action) => {
		let data = action.payload.data
		data = handleEdit(data)
		return {
			...state,
			...data
		}
	}
}, initEditable())
// 账号拓展信息
export const extend = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { extend = {} } = action.payload.data
		return {
			...state,
			...extend
		}
	}
}, {})
// 受众画像
export const audiencePortrait = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { audiencePortrait = {} } = action.payload.data
		return {
			...state,
			...audiencePortrait
		}
	}
}, {})
// 策略
export const strategy = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { strategy = {} } = action.payload.data
		return {
			...state,
			...strategy
		}
	}
}, {})
// sku
export const skuList = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { skuList = [] } = action.payload.data
		return [
			...state,
			...skuList
		]
	}
}, [])
// 特征数据
export const feature = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { feature = {} } = action.payload.data
		return {
			...state,
			...feature
		}
	}
}, {})
// 合作案例
export const cooperationCases = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { cooperationCases = [] } = action.payload.data
		return [
			...state,
			...cooperationCases
		]
	}
}, [])

export default combineReducers({
	id,
	base,
	extend,
	audiencePortrait,
	strategy,
	cooperationCases,
	skuList,
	feature
})
