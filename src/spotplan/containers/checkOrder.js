import React from 'react'
import { Row, Col, Pagination, Button, Anchor } from 'antd';
import CheckQuery from '../components/checkQuery'
import OrderItem from '../components/orderItem'
import Header from '../components/header'

export default class CheckOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      orderMaps: {}
    }
  }
  handleCheck = (order_id, price_id) => {
    const { orderMaps } = this.state;
    this.setState({
      orderMaps: {
        ...orderMaps,
        [order_id]: price_id
      }
    }, () => {
      console.log('%corderMaps: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', this.state.orderMaps);
    })

  }
  render() {
    const { handleSteps } = this.props;
    return <div className='splotplan-check-container'>
      <Header />
      <h3 style={{ marginTop: '20px' }}>订单列表</h3>
      <div className='check-table-container'>
        <CheckQuery />
        {[1, 2, 3].map((item, index) => (<OrderItem key={index} handleCheck={this.handleCheck} />))}
        <Pagination className='pagination'
          size="small" total={50}
          showSizeChanger
          showQuickJumper
        // pageSizeOptions
        />
      </div>
    </div>
  }
}
