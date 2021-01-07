import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'

const List = lazyLoadComponent(() => import("./containers/list"))
const Detail = lazyLoadComponent(() => import("./containers/detailKoc"))

class KocOrder extends Component {
  state = {}
  render() {
    return (
      <div>
        <Switch>
          <Route path="/order/koc/list" component={List} />
          <Route path="/order/koc/detail" component={Detail} />
        </Switch>
      </div>
    );
  }
}

export default KocOrder;
