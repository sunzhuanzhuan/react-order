import React,{Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import lazyLoadComponent from '@/components/LazyLoadComponent'

const KocList = lazyLoadComponent(() => import("./containers/list"))

class KocOrder extends Component {
  state = {}
  render() {
    return (
      <div>
        <Switch>
          <Route path="/order/koc/list" component={KocList} />
        </Switch>
      </div>
    );
  }
}

export default KocOrder;
