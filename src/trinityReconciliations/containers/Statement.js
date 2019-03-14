import React, { Component } from 'react';
import { Row ,Popconfirm} from 'antd';
import {stateListFunc} from '../constants/exportOrder/column'
import StateTable from '../components/statement/StateTable';
import Filter from '../components/statement/Filter'
import qs from 'qs'





export default class Summary extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }


  componentWillMount() {}
 //选择查看详情
 handleDelete=(record)=>{
  console.log(record)
 }

  render() {
    const column = stateListFunc(this.handleDelete);
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
    const dataTable=[{name:'哈哈哈哈',id:2,statement_name:'1'},{name:'天天',id:3,statement_name:'2'}];
    
    return <div>
      <Row>对账单导入记录【所属平台:,总对账单数量:】</Row>
      <Filter/>
     
     <StateTable
     columns={column}
     dataTable={dataTable}
     paginationObj={paginationObj}
     />
     
    </div>;
  }
}
