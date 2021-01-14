import React from 'react'
import FilterForm from '../component/filterForm'
import { Alert, Divider, Upload, Table, message, Modal, Button } from 'antd';
import * as commonAction from "../../actions";
import * as actionKoc from "../actions";
import Interface from '../constants/Interface';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const Cookie = require('js-cookie');


const columns = [
  {
    title: '需求ID',
    dataIndex: 'requirement_id',
    key: 'requirement_id',
    width: 100
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    width: 100
  },
  {
    title: '所属品牌',
    dataIndex: 'brand_name',
    key: 'brand_name',
    width: 100
  }, {
    title: '所属项目',
    dataIndex: 'project_name',
    key: 'project_name',
    width: 100
  },
  {
    title: 'wby订单号',
    dataIndex: 'wby_order_id',
    key: 'wby_order_id',
    width: 100
  },
  {
    title: '外部订单号',
    dataIndex: 'koc_order_id',
    key: 'koc_order_id',
    width: 100
  }, {
    title: '订单状态',
    dataIndex: 'status_name',
    key: 'status_name',
    width: 100
  }, {
    title: 'PO',
    dataIndex: 'po_code',
    key: 'po_code',
    width: 100
  },
  {
    title: '所属销售',
    dataIndex: 'sale_name',
    key: 'sale_name',
    width: 100
  },
  {
    title: '执行人',
    dataIndex: 'executor_name',
    key: 'executor_name',
    width: 100
  }, {
    title: '平台',
    dataIndex: 'platform_name',
    key: 'platform_name',
    width: 100
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    width: 150
  },
  {
    title: '账号ID',
    dataIndex: 'weibo_id',
    key: 'weibo_id',
    width: 100
  }, {
    title: '创建人',
    dataIndex: 'creator_name',
    key: 'creator_name',
    width: 150
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200
  }, {
    title: '操作',
    dataIndex: 'address14',
    key: 'address14',
    fixed: 'right',
    render: (val, record) => {
      return <Link to={`/order/koc/detail?id=${record.id}`}><a>查看详情</a> </Link>
    }
  },
];
const columnsReason = [{
  title: '平台',
  dataIndex: 'platform_name',
  key: 'platform_name',
  width: 100
}, {
  title: '账号名称',
  dataIndex: 'weibo_name',
  key: 'weibo_name',
  width: 100
}, {
  title: '失败原因',
  dataIndex: 'error_msg',
  key: 'error_msg',
  width: 100
}]
class List extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      page: 1,
      pageSize: 50,
      successCount: 0,
      errorCount: 0,
      errorList: []
    }
    this.uploadMessage = null
  }
  exportExcel = () => {
    this.setState({
      visible: true
    })
  }
  handleOk = () => {
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
    return true
  }
  componentDidMount() {
    this.props.actions.getAllPlatform()
    this.props.actionKoc.getList({ page: 1, pageSize: 50 })
  }
  render() {
    let that = this
    let { successCount, errorCount, errorList } = this.state
    let { platforms } = this.props.commonReducers
    let { getList } = this.props.actionKoc
    let { list: { page, pageSize, rows = [], total } } = this.props
    const props = {
      name: 'file',
      action: Interface.uploadExcle,
      headers: {
        "X-Access-Token": Cookie.get('token') || '',
      },
      onChange(info) {
        that.setState({
          visible: false
        })
        if (info.file.status === 'uploading') {
          // message.loading('Loading...')
          console.log('111', info)
        }
        if (info.file.status === 'done') {
          let res = info.file.response
          console.log('222', res)
          if (res.code == 200 && res.data.errorCount == 0) {
            message.success(`上传成功!`);
          } else if (res.code == 200 && res.data.errorCount > 0) {
            that.setState({
              visible: true,
              successCount: res.data.successCount,
              errorCount: res.data.errorCount,
              errorList: res.data.errorList
            })

            that.props.actionKoc.getList({ page: 1, pageSize: 50 })
          } else {
            message.error(info.file.response.msg || '上传失败');
          }
        } else if (info.file.status === 'error') {
          console.log('333', info)
          message.error(`上传失败`);
        }
      },
    }
    const pagination = {
      total,
      pageSize: 50,
      current: page,
      showQuickJumper: true,
      onChange: (current) => {
        getList({ page: current, pageSize: 50 })
      },
    }
    return <div>
      <FilterForm
        getList={getList}
        platforms={platforms} />
      <Alert message={
        <div style={{ height: '20px', lineHeight: '20px' }}>
          <span style={{ float: 'right', display: 'block' }}>
            <Upload {...props} showUploadList={false}>
              <a style={{ margin: "0 10px", display: 'block' }}>导入koc订单</a>
            </Upload>
            {/* <a onClick={this.exportExcel} style={{ float: 'right' }} >导入koc订单</a> */}
          </span>
          <a style={{ float: 'right' }} >下载模板</a>
        </div>
      } />
      <Divider orientation="left">订单列表</Divider>
      <Table
        scroll={{ x: 1700 }}
        dataSource={rows}
        rowKey={record => record.id}
        pagination={pagination}
        columns={columns} />
      <Modal
        title={<span>导入结果-成功{successCount}条，失败{errorCount}条</span>}
        closable={false}
        visible={this.state.visible}
        footer={
          [
            <Button key="back" onClick={this.handleCancel}>关闭</Button>,
            <Upload {...props} key="submit"
              beforeUpload={this.handleOk}
              showUploadList={false}>
              <Button type="primary" style={{ margin: "0 10px", display: 'block' }}>导入koc订单</Button>
            </Upload>
          ]}
      >
        <p>
          <Table
            dataSource={errorList}
            rowKey={record => record.id}
            pagination={false}
            columns={columnsReason} />
        </p>
      </Modal>
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    commonReducers: state.commonReducers,
    list: state.kocReducers.list
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...commonAction }, dispatch),
  actionKoc: bindActionCreators({ ...actionKoc }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(List)
