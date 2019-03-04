import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import { allEditables } from '../constants/editables';
import account from './account'


import {
	getAccountInfo_success,
	getAudiencePortrait_success,
	fetchAccountBaseInfo_request,
	fetchAccountBaseInfoByUpdate_request,
	getAccountOnShelfStatus_success,
	updateFetchInfo,
	addFetchInfo,
	getSkuList_success,
	getSkuTypeList_success,
	getPrimaryAccountInfo_success,
	getUploadToken_success,
	getPlatformInfo_success,
	getRegionCode_success,
	getIndustryListForAccount_success,
	getUserInvoiceInfo_success,
	sensitiveWordsFilter_success,
	setAddSubmit
} from '../actions'

const handleEdit = (data) => {
	for (let key in data) {
		if (!data.hasOwnProperty(key)) continue
		if (data[key] == 1 && Object.keys(allEditables).find(str => str === key)) {
			delete data[key]
			delete data[allEditables[key]]
		}
	}
	return data
}
let initAccountData = () => {
	let account = {}
	Object.keys(allEditables).forEach(key => {
		account[key] = 1
	})
	return account
}

// 扁平化数据
let reduceData = (data) => {
	let { id, base, extend, strategy, cooperationCases, skuList, adminUser, user, audiencePortrait, feature } = data
	let value = Object.assign({}, base, extend, adminUser, user, feature)
	value = {
		...value,
		strategy, cooperationCases, skuList, audiencePortrait,
		...(base.onShelfStatus || {}),
		accountId: id
	}
	return value || {}
}

export const accountInfo = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		let { data } = action.payload
		return {
			...state,
			...reduceData(data)
		}
	},
	[combineActions(getAccountOnShelfStatus_success)]: (state, action) => {
		let { data } = action.payload
		return {
			...state,
			...data
		}
	},
	/*fetchAccountBaseInfo_success, */
	[combineActions(updateFetchInfo)]: (state, action) => {
		let data = { ...action.payload.data }
		data = handleEdit(data)
		return {
			...state,
			...data
		}
	},
	[combineActions(addFetchInfo)]: (state, action) => {
		let data = { ...action.payload.data }
		let { isNewFetch, value } = data
		if (isNewFetch) {
			return {
				...state,
				...initAccountData(),
				hasAddSubmit: true,
				...value
			}
		} else {
			return {
				...state,
				...handleEdit(value)
			}
		}
	},
	[combineActions(fetchAccountBaseInfo_request, fetchAccountBaseInfoByUpdate_request, setAddSubmit)]: (state) => {
		return {
			...state,
			hasAddSubmit: true
		}
	},
	[combineActions(getPrimaryAccountInfo_success)]: (state, action) => {
		return {
			...state,
			...{},
			...action.payload.data
		}
	},
	[combineActions(getPlatformInfo_success, getAudiencePortrait_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
	[combineActions(getUploadToken_success)]: (state, action) => {
		return {
			...state,
			token: { ...action.payload.data }
		}
	}
}, initAccountData())

export const priceInfo = handleActions({
	[combineActions(getSkuList_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
  [combineActions(getUserInvoiceInfo_success)]: (state, action) => {
    let [item = {}] = action.payload.data || []
    return {
      ...state,
      ...item
    }
  },
}, {})

export const priceTypeList = handleActions({
	[combineActions(getSkuTypeList_success)]: (state, action) => {
		return [
			...state,
			...action.payload.data
		]
	}
}, [])

export const regionCode = handleActions({
	[combineActions(getRegionCode_success)]: (state, action) => {
		return [
			...state,
			...action.payload.data
		]
	}
}, [])

export const industryListForAccount = handleActions({
	[combineActions(getIndustryListForAccount_success)]: (state, action) => {
		return [
			...state,
			...action.payload.data
		]
	}
}, [])
export const sensitiveWordsFilter = handleActions({
	[combineActions(sensitiveWordsFilter_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	}
}, {})

export default combineReducers({
	account,
	accountInfo,
	priceInfo,
	priceTypeList,
	regionCode,
	industryListForAccount,
	sensitiveWordsFilter
})
