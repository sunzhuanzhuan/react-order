import React, { Component } from 'react'
import { Modal, Table, message, Icon, Typography, Button } from 'antd'
import { bindActionCreators } from 'redux'
import * as commonActions from '@/actions'
import * as actions from '../actions'
import { connect } from 'react-redux'
import TaskManageQuery from './TaskManageQuery';
import { getTaskQueryItems, getTaskCol, operateKeyMap, taskStatus, excuteStatus, qualityStatus } from '../constants';
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
      listLoading: false
    }
    this.columns = []
    this.isOfflineRequest = false
  }

  // 下线
  offline = (id) => {
    // 判断是否有一个下线请求处理中
    /*if (this.isOfflineRequest) return
    this.isOfflineRequest = true*/
    const { actions } = this.props
    Modal.confirm({
      title: '确认要下线此蜂窝派任务吗?',
      content: "蜂窝派任务下线后，不可重新上线。已领取蜂窝派任务的博主，可执行。未消耗的余额，会在之后返还到您的蜂窝派任务账户余额中。",
      onOk: () => {
        return actions.TPOffline({ id }).then(() => {
          message.success('下线成功')
          this.getList()
        })
      }
    })
  }

  componentDidMount() {
    this.getList()
  }
  
  handleSearch = searchVal => {
    this.setState({
      searchVal
    })
  }

  getList = (params = {}) => {
    const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.TPTaskManageList(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  handleOperate = (type) => {
    this.setState({
      visible: true,
      type
    })
  }

  handleOk = () => {

  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { history, taskPoolData } = this.props
    const { listLoading, search, visible, type } = this.state
    const { taskManageList: { keys, source, total, pageNum, pageSize } } = taskPoolData
    const dataSource = keys.map(key => source[key])
    const pagination = {
      total,
      pageSize,
      current: pageNum,
      showQuickJumper: true,
      showSizeChanger: true,
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
    const scrollWidth = getTotalWidth(getTaskCol())

    return <div className='task-pool-page-container manage-page'>
      <Title level={4}>蜂窝任务管理</Title>
      <div style={{ padding: '0 0 16px 0' }}>
        <Button type="primary" onClick={() => {
          history.push('/order/task/create')
        }}>
          <Icon type="plus" />新建蜂窝派任务
        </Button>
      </div>
      <TaskManageQuery 
        queryOptions={{taskStatus, excuteStatus, qualityStatus}}
        queryItems={getTaskQueryItems()}
        handleSearch={this.handleSearch} 
      />
      <Scolltable 
        scrollClassName={`.ant-table-body`} 
        widthScroll={scrollWidth}
      >
        <Table
          locale={{ emptyText: "还没有任务可以展示" }}
          loading={listLoading}
          dataSource={dataSource}
          pagination={pagination}
          columns={getTaskCol(this.offline, this.handleOperate)}
          scroll={{ x: scrollWidth }}
        />
      </Scolltable>
      <TaskModal 
        visible={visible}
        type={type}
        title={operateKeyMap[type]}
        handleCancel={this.handleCancel}
        handleOk={this.handleOk}
      />
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
