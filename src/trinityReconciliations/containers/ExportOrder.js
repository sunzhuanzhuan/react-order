import React, { Component } from 'react';
import { Button,Row ,Col} from 'antd';
import ExportOrderFilter from '../components/exportOrder/Filter'
import {exportOrderListFunc} from '../constants/exportOrder/column'
import OrderTable from '../components/exportOrder/ExportTable'


export default class Test extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
    };
  }


  componentWillMount() {}

  render() {
    const column = exportOrderListFunc();
    let paginationObj = {
			// onChange: (current) => {
			// 	queryAction({ page: current, ...search.keys });
			// },
			total: parseInt(4),
			current: parseInt(1),
			pageSize: parseInt(2),
      showQuickJumper: true,
      showSizeChanger:true,
      pageSizeOptions:['1','10']
		};
    const dataTable=[{name:'哈哈哈哈',id:2},{name:'天天',id:3}]
    return <div>
     <Row>导出订单</Row>
     <div>收款平台/代理商:</div>
     <ExportOrderFilter/>
     <OrderTable
     columns={column}
     dataTable={dataTable}
     paginationObj={paginationObj}
     />
    </div>;
  }
}
