import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

// 更新页面抓取账号信息
export const {
	___Action___,
	___Action____success
} = createHttpAction('___Action___', Interface.test, {
	method: 'get',
});

export const updateFetchInfo = createAction('updateFetchInfo', (data) => {
	return { data };
})
