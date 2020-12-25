import React from 'react'
import FilterForm from '../component/Filter'
import { Alert, Divider, Upload ,Table} from 'antd';
const Cookie = require('js-cookie');


const columns = [
  {
    title: '需求ID',
    dataIndex: 'name',
    key: 'name',
    width:100
  },
  {
    title: '需求名称',
    dataIndex: 'age',
    key: 'age',
    width:100
  },
  {
    title: '所属品牌',
    dataIndex: 'address',
    key: 'address',
    width:100
  },{
    title: '所属项目',
    dataIndex: 'name1',
    key: 'name1',
    width:100
  },
  {
    title: 'wby订单号',
    dataIndex: '账号名称2',
    key: 'age2',
    width:100
  },
  {
    title: '外部订单号',
    dataIndex: 'address3',
    key: 'address3',
    width:100
  }, {
    title: '订单状态',
    dataIndex: 'address4',
    key: 'address4',
    width:100
  },{
    title: 'PO',
    dataIndex: 'name5',
    key: 'name5',
    width:100
  },
  {
    title: '所属销售',
    dataIndex: '账号名称6',
    key: 'age6',
    width:100
  },
  {
    title: '执行人',
    dataIndex: 'address7',
    key: 'address7',
    width:100
  },{
    title: '平台',
    dataIndex: '账号名称8',
    key: 'age8',
    width:100
  },
  {
    title: '账号名称',
    dataIndex: 'address9',
    key: 'address9',
    width:100
  },
  {
    title: '账号ID',
    dataIndex: 'address12',
    key: 'address12',
    width:100
  },{
    title: '创建人',
    dataIndex: '账号名称13',
    key: 'age13',
    width:100
  },
  {
    title: '创建时间',
    dataIndex: 'address11',
    key: 'address11',
    width:100
  },{
    title: '操作',
    dataIndex: 'address11',
    key: 'address11',
    fixed:'right',
    render:()=>{
      return <a>查看详情</a>
    }
  },
];
class KocList extends React.Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  render() {

		const props = {
			name: 'file',
			// action: Interface.navGroupUrl.import,
			headers: {
				"X-Access-Token" : Cookie.get('token') || '',
      },
    }
    return <div>
       <FilterForm/>
      <Alert message={
					<div style={{height: '20px', lineHeight: '20px'}}>
						<span style={{float:'right',display:'block'}}>	
              <Upload {...props}>
								<a style={{margin: "0 10px",display:'block'}}>导入koc订单</a>
							</Upload>
              </span>
							<a onClick={this.exportExcel} style={{float:'right'}} >下载模板</a>
					</div>
				} />
       <Divider orientation="left">订单列表</Divider>
       <Table scroll={{x:1500}} dataSource={[{name:1,age:12}]} columns={columns} />;
    </div>
  }
}

export default KocList
