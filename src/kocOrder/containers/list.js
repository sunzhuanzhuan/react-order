import React from 'react'
import FilterForm from '../component/Filter'
import { Alert, Divider, Upload ,Table,message,Modal, Button } from 'antd';
import { Link } from "react-router-dom";

const Cookie = require('js-cookie');


const columns = [
  {
    title: '需求ID',
    dataIndex: 'id',
    key: 'id',
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
    dataIndex: 'address14',
    key: 'address14',
    fixed:'right',
    render:(val, record)=>{
      return  <Link to={`/order/koc/detail?id=${record.id}`}><a>查看详情</a> </Link>
    }
  },
];
const columnsReason=[{
  title: '平台',
    dataIndex: 'address111',
    key: 'address111',
    width:100
},{
  title: '账号名称',
    dataIndex: 'address112',
    key: 'address112',
    width:100
},{
  title: '失败原因',
    dataIndex: 'address113',
    key: 'address113',
    width:100
}]
class KocList extends React.Component {
  constructor() {
    super();
    this.state = {
      visible:false
    }
  }
  exportExcel=()=>{
    this.setState({
      visible:true
    })
  }
  handleOk=()=>{
    this.setState({
      visible:false
    })
  }
  handleCancel=()=>{
    this.setState({
      visible:false
    })
    return true
  }
  render() {
    let that = this
		const props = {
			name: 'file',
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			headers: {
				"X-Access-Token" : Cookie.get('token') || '',
      },
      onChange(info) {
        that.setState({
          visible:false
        })
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    return <div>
       <FilterForm/>
      <Alert message={
					<div style={{height: '20px', lineHeight: '20px'}}>
						<span style={{float:'right',display:'block'}}>	
              {/* <Upload {...props} showUploadList={false}>
								<a style={{margin: "0 10px",display:'block'}}>导入koc订单</a>
              </Upload> */}
              <a onClick={this.exportExcel} style={{float:'right'}} >导入koc订单</a>
              </span>
							<a style={{float:'right'}} >下载模板</a>
					</div>
				} />
       <Divider orientation="left">订单列表</Divider>
       <Table 
        scroll={{x:1560}}
        dataSource={[{id:1,age:12}]}
        rowKey={record => record.id}
        columns={columns} />
       <Modal
          title={<span>导入结果-成功4条，失败0条</span>}
          closable={false}
          visible={this.state.visible}
          footer={
            [
              <Button key="back" onClick={this.handleCancel}>关闭</Button>,
              <Upload {...props} key="submit"
              beforeUpload={this.handleOk}
              showUploadList={false}>
							<a style={{margin: "0 10px",display:'block'}}>导入koc订单</a>
              </Upload>
            ]}
        >
          <p>
          <Table 
            dataSource={[]}
            rowKey={record => record.id}
            columns={columnsReason} />
          </p>
    </Modal>
    </div>
  }
}

export default KocList
