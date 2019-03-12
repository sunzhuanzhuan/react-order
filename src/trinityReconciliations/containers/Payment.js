import React, { Component } from 'react';
import { Button,Row ,Popconfirm} from 'antd';
import PaymentFilter from '../components/payment/Filter'
import {paymentListFunc} from '../constants/exportOrder/column'
import PaymentTable from '../components/payment/PaymentTable'


export default class Payment extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
    };
  }


  componentWillMount() {}
 
  render() {
    const column = paymentListFunc();
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
    

     </Row>
    </div>;
  }
}
