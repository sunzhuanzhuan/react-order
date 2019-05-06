import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'

// 懒加载路由级组件
const SpotplanAdd = lazyLoadComponent(() => import("./containers/spotplanAdd"))
const SpotplanList = lazyLoadComponent(() => import("./containers/spotplanList"))
const SpotplanDetail = lazyLoadComponent(() => import("./containers/spotplanDetail"))

class SpotPlan extends Component {
  state = {}
  render() {
    return (
      <div>
        <Switch>
          <Route path="/order/spotplan/add" component={SpotplanAdd} />
          <Route path="/order/spotplan/list" component={SpotplanList} />
          <Route path="/order/spotplan/detail" component={SpotplanDetail} />
          {/* <Route render={() => linkTo('/error', 'push')} /> */}
        </Switch>
      </div>
    );
  }
}

export default SpotPlan;
