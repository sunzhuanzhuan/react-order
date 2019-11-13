import React, { Component } from 'react'
import { Modal, Table, message, Icon, Typography, Button } from 'antd'
import { bindActionCreators } from 'redux'
import * as commonActions from '@/actions'
import * as actions from '../actions'
import { connect } from 'react-redux'
import TaskManageQuery from './TaskManageQuery';
import { getTaskQueryItems, getTaskCol, operateKeyMap } from '../constants';
import { getTotalWidth } from '../../util'
import TaskModal from './TaskModal'
import Scolltable from '@/components/Scolltable'
const { Title } = Typography;

class NewTaskManageList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      search: {
        page: {
          currentPage: 1,
          pageSize: 20
        }
      },
      listLoading: false,
      idObj: {}
    }
  }
  componentDidMount() {
    this.getList();
    this.props.actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })
    this.props.actions.TPGetOrderStatusLists();
    this.props.actions.TPGetExcuteStatusList();
  }

  dealQueryVal = (searchVal) => {
    const searchKeys = Object.keys(searchVal);
    searchKeys.forEach(item => {
      if(searchVal[item] === '')
        delete searchVal[item]
    })
    return searchVal
  }
  
  handleSearch = searchVal => {
    const search = {
      ...this.state.search,
      form: this.dealQueryVal(searchVal),
    }

    this.getList(search);
    this.setState({
      search
    })
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.TPGetAllMcnOrder(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  handleOperate = (type, idObj, settlementAmount, isAddLink) => {
    if(type === 'TPApprovedFristFailure') //一次质检不通过
    {
      const { search } = this.state;
      this.props.actions[type](idObj).then(() => {
        this.getList(search);
      });
      return 
    }
    this.setState({
      visible: true,
      type,
      idObj,
      isAddLink,
      settlementAmount
    })
  }

  handleOk = (values) => {
    const { actions } = this.props;
    const { type, idObj, search } = this.state;
    if(typeof actions[type] === 'function') {
      actions[type]({...values, ...idObj}).then(() => {
        this.getList(search);
      });
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { history, taskPoolData } = this.props
    const { listLoading, search, visible, type, isAddLink, settlementAmount } = this.state
    const { orderManageList: { total, list, pageNum, pageSize }, taskStatus, excuteStatus } = taskPoolData
    const pagination = {
      total,
      pageSize,
      current: pageNum,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['20', '50', '100', '200'],
      onChange: (currentPage) => {
        this.getList({
          page: { ...search.page, currentPage }
        })
      },
      onShowSizeChange: (currentPage, pageSize) => {
        this.getList({
          page: { pageSize, currentPage: 1 }
        })
      }
    };
    const scrollWidth = getTotalWidth(getTaskCol());

    return <div className='task-pool-page-container manage-page'>
      <Title level={4}>蜂窝订单管理</Title>
      <TaskManageQuery 
        queryOptions={{taskStatus, excuteStatus}}
        queryItems={getTaskQueryItems()}
        handleSearch={this.handleSearch} 
      />
      <Scolltable 
        scrollClassName={`.ant-table-body`} 
        widthScroll={scrollWidth}
      >
        <Table
          locale={{ emptyText: "还没有任务可以展示" }}
          rowKey='id'
          loading={listLoading}
          dataSource={list}
          pagination={pagination}
          columns={getTaskCol(this.handleOperate, excuteStatus)}
          scroll={{ x: scrollWidth }}
        />
      </Scolltable>
      { 
        visible ? <TaskModal 
          visible={visible}
          type={type}
          data={this.state}
          title={isAddLink ? operateKeyMap['addReceipt'] : operateKeyMap[type]}
          settlementAmount={settlementAmount}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
        /> : null
      }
    </div>
  }
}


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskManageList)
