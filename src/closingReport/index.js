import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './style.less'
// moment.fn.toJSON = function () {return moment(this).format("YYYY-MM-DD HH:mm:ss")}

// 懒加载路由级组件
const Test = lazyLoadComponent(() => import('./containers/Test'))
const CreateReport = lazyLoadComponent(() => import('./containers/CreateReport'))
const SummaryListByOrder = lazyLoadComponent(() => import('./containers/SummaryListByOrder'))
const SummaryReviewList = lazyLoadComponent(() => import('./containers/SummaryReviewList'))
const SummaryDetail = lazyLoadComponent(() => import('./containers/SummaryDetail'))


class ClosingReport extends Component {
	state = {}

	render() {
		return (
			<div className='closing-report-container'>
				<Route path='/order/closing-report/test' component={Test} />
				<Route path='/order/closing-report/create' component={CreateReport} />
				<Route path='/order/closing-report/list/summary-order' component={SummaryListByOrder} />
        <Route path='/order/closing-report/detail/summary' component={SummaryDetail} />
        <Route path='/order/closing-report/detail/order' component={Test} />
        <Route path='/order/closing-report/list/review' component={SummaryReviewList} />
        <Route path='/order/closing-report/detail/review-summary' component={Test} />
			</div>
		);
	}
}

export default ClosingReport;



