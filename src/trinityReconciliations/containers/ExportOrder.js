import React, { Component } from 'react';
import { Button,Row ,Popconfirm} from 'antd';
import ExportOrderFilter from '../components/exportOrder/Filter'
import {exportOrderListFunc} from '../constants/exportOrder/column'
import OrderTable from '../components/exportOrder/ExportTable'


export default class ExportOrder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
    };
  }


  componentWillMount=()=> {
    
  }
  handleCancelSelect=()=>{
   
      this.setState({
        selectedRowKeys: [],
      })
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const column = exportOrderListFunc();
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
    const rowSelection = {
      onChange:this.onSelectChange,
      selectedRowKeys:this.state.selectedRowKeys
     
    };
    return <div>
     <Row>导出订单</Row>
     <div>收款平台/代理商:</div>
     <ExportOrderFilter/>
     <OrderTable
     columns={column}
     dataTable={dataTable}
     paginationObj={paginationObj}
     rowSelection={rowSelection}
     />
     <Row style={{textAlign:'center'}}>
     <Popconfirm title="Are you sure delete this task?"
      onConfirm={this.handleCancelSelect} onCancel={this.cancel} okText="Yes" cancelText="No">
     <Button>取消</Button>
    </Popconfirm>
     
     <Button type="primary" style={{margin:'0 20px'}}>导出打款单</Button>

     </Row>
    </div>;
  }
}
