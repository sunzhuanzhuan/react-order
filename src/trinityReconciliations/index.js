import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './style.less'
// import moment from 'moment'
// moment.fn.toJSON = function () {return moment(this).format("YYYY-MM-DD HH:mm:ss")}

// 懒加载路由级组件
const Test = lazyLoadComponent(() => import('./containers/Test'))
const Export =lazyLoadComponent(()=>import('./containers/ExportOrder'))

class AccountEnterIndex extends Component {
	state = {}

	render() {
		return (
			<div className='account-manage' id='account-manage-container'>
				<Route path='/order/trinity/reconciliations/test' component={Test} />
        <Route path='/order/trinity/reconciliations/exportOrder' component={Export} />
			</div>
		);
	}
}

export default AccountEnterIndex;



