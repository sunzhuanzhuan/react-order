/**
 * Created by lzb on 2019-12-03.
 */
/**
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import { Table, Tabs, Typography, Modal } from 'antd';
import Filters from '../components/Clue/Filters';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';
import { getColumns } from '../constants/config'
const { Title } = Typography;

const Clues = (props) => {
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})

  let search = {}
  const getList = (params = {}) => {
    search = { ...params }
    /*const { actions } = this.props
    let search = { ...this.state.search, ...params }
    this.setState({ listLoading: true, search })
    actions.getSummaryListByOrder(search).finally(() => {
      this.setState({ listLoading: false })
    })*/
  }

  const clickModal = (value, record) => {
    setRecord(record)
    setVisible(value)
  }
  const handleOk = () => {
    setVisible(false)
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const columns = getColumns(search.active || 1, clickModal)
  const { actions, history, taskPoolData } = props
  const { taskManageList: { keys, source, total, pageNum, pageSize } } = taskPoolData

  const dataSource = keys.map(key => source[key])
  const pagination = {
    total,
    pageSize,
    current: pageNum,
    showQuickJumper: true,
    showSizeChanger: true,
    onChange: (currentPage) => {
      getList({
        page: { currentPage }
      })
    },
    onShowSizeChange: (currentPage, pageSize) => {
      getList({
        page: { pageSize, currentPage: 1 }
      })
    }
  }

  return (
    < div className='task-pool-page-container tasks-page' >
      <Title level={4}>线索管理</Title>
      <Filters search={getList} />
      <Table
        loading={false}
        dataSource={[{ execution_evidence_code: '1' }]}
        scroll={{ x: 1800 }}
        pagination={pagination}
        columns={columns}
      />
      {
        visible ? <Modal
          title="线索处理"
          visible={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>确认已经处理字节跳动——{'"' + record.execution_evidence_code + '"'}的线索么？</p>
        </Modal> : null
      }
    </div >
  );
};



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

export default connect(mapStateToProps, mapDispatchToProps)(Clues)

