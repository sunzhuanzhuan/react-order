import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './style.less'
// import moment from 'moment'
// moment.fn.toJSON = function () {return moment(this).format("YYYY-MM-DD HH:mm:ss")}

// 懒加载路由级组件
const Test = lazyLoadComponent(() => import('./containers/Test'))
const Export =lazyLoadComponent(()=>import('./containers/ExportOrder'))
const Payment =lazyLoadComponent(()=>import('./containers/Payment'))
const Summary= lazyLoadComponent(()=>import('./containers/Summary'))
const SummaryDetail = lazyLoadComponent(()=>import('./containers/SummaryDetail'))
const State = lazyLoadComponent(()=>import('./containers/Statement'))

class AccountEnterIndex extends Component {
	state = {}

	render() {
		return (
			<div className='account-manage' id='account-manage-container'>
				<Route path='/order/trinity/reconciliations/test' component={Test} />
        <Route path='/order/trinity/reconciliations/exportOrder' component={Export} />
        <Route path='/order/trinity/reconciliations/payment' component={Payment} />
        <Route path='/order/trinity/reconciliations/summary' component={Summary} />
        <Route path='/order/trinity/reconciliations/detail' component={SummaryDetail} />
        <Route path='/order/trinity/reconciliations/state' component={State} />
			</div>
		);
	}
}

export default AccountEnterIndex;



