import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'
import './style.less'
// import moment from 'moment'
// moment.fn.toJSON = function () {return moment(this).format("YYYY-MM-DD HH:mm:ss")}

// 懒加载路由级组件
const Test = lazyLoadComponent(() => import('./containers/Test'))


class ClosingReport extends Component {
	state = {}

	render() {
		return (
			<div>
				<Route path='/order/closing-report/test' component={Test} />
			</div>
		);
	}
}

export default ClosingReport;



