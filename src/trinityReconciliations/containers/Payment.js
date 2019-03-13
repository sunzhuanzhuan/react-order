import React, { Component } from 'react';
import { Button,Row ,Popconfirm} from 'antd';
import PaymentFilter from '../components/payment/Filter'
import {paymentListFunc} from '../constants/exportOrder/column'
import PaymentTable from '../components/payment/PaymentTable'
import ReqireTicket from '../components/payment/RequireTicket'

export default class Payment extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        applyPayment:[]
    };
  }


  componentWillMount() {}
 //选择查看详情
 handleSelectDetail=(record)=>{
  console.log(record);
  this.setState({
    applyPayment:record
  })
 }
  render() {
    const column = paymentListFunc(this.handleSelectDetail);
    let paginationObj = {
			onChange: (current) => {
        console.log(current)
				// queryAction({ page: current, ...search.keys });
			},
			total: parseInt(4),
			pageSize: parseInt(2),
      showQuickJumper: true,
      showSizeChanger:true,
      pageSizeOptions:['1','10']
		};
    const dataTable=[{name:'哈哈哈哈',id:2},{name:'天天',id:3}];
    
    return <div>
     <Row>申请周期付款</Row>
     <div>收款平台/代理商:</div>
     <PaymentFilter/>
     <PaymentTable
     columns={column}
     dataTable={dataTable}
     paginationObj={paginationObj}
     />
     <Row style={{textAlign:'center'}}>
        本次申请付款订单,申请付款总金额
     </Row>
     <Row style={{textAlign:'center'}}>
        其中包含：本期对账订单，对账总金额
     </Row>
     <Row style={{textAlign:'center'}}>
       扣减订单，扣减总金额，本次申请应付金额
     </Row>
     <Row style={{textAlign:'center'}}>
        <ReqireTicket/>
     </Row>
    </div>;
  }
}
