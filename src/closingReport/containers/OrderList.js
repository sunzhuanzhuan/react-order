import React, { Component } from "react"
import {  } from 'antd'
import OrderCard from '../components/OrderCard';
import DataDetailsModal from './DataDetailsModal';

export default class OrderList extends Component {
    componentWillMount() {}
    render() {
        return <div>
          <OrderCard/>
          <DataDetailsModal/>
        </div>
    }
}
