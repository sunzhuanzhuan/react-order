import React, { Component } from 'react';
import { Tabs,Row ,Popconfirm} from 'antd';
import SummaryFilter from '../components/summary/Filter'
import {summaryListFunc,summaryShiListFunc} from '../constants/exportOrder/column'
import SummaryTable from '../components/summary/SummaryTable';
import qs from 'qs'


const TabPane = Tabs.TabPane;



export default class Summary extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }


  componentWillMount() {}
 //选择查看详情
 handleSelectDetail=(record)=>{
  this.props.history.push({
    pathname: '/order/trinity/reconciliations/detail',
    search: `?${qs.stringify({ id: record.id})}`,
  });
 }
 handleOut=(record)=>{
   console.log(record)
 }
 
  render() {
    const column = summaryListFunc(this.handleSelectDetail,this.handleOut);
    const shiColum = summaryShiListFunc()
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
    const dataTable=[{name:'哈哈哈哈',id:2,summary_sheet_name:'1'},{name:'天天',id:3,summary_sheet_name:'2'}];
    
    return <div>
     <Row>汇总单列表【平台/代理商:hahah】</Row>
     <Tabs defaultActiveKey="1">
      <TabPane tab="全部" key="1">
        <SummaryFilter/>
        <SummaryTable
      columns={column}
      dataTable={dataTable}
      paginationObj={paginationObj}
      />
      </TabPane>
      <TabPane tab="对账完成" key="2">
        <SummaryFilter/>
        <SummaryTable
      columns={column}
      dataTable={dataTable}
      paginationObj={paginationObj}
      />
      </TabPane>
      <TabPane tab="已释放" key="3">
        <SummaryFilter/>
        <SummaryTable
      columns={shiColum}
      dataTable={dataTable}
      paginationObj={paginationObj}
      />
      </TabPane>
    </Tabs>,
     
     
    </div>;
  }
}
