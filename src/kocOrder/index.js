import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'

const KocList = lazyLoadComponent(() => import("./containers/list"))
const KocDetail = lazyLoadComponent(() => import("./containers/detail"))

class KocOrder extends Component {
  state = {}
  render() {
    return (
      <div>
        <Switch>
          <Route path="/order/koc/list" component={KocList} />
          <Route path="/order/koc/detail" component={KocDetail} />
        </Switch>
      </div>
    );
  }
}

export default KocOrder;
