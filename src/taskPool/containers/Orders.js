import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { WachatList, CooperationList, CooperationForm } from '../components/Order'
import { Tabs, Modal, Spin } from 'antd';
import { bindActionCreators } from 'redux';
const { TabPane } = Tabs;
const baseSearch = { page: { currentPage: 1, pageSize: 10 } }

const Orders = (props) => {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [cooSearch, setCooSearch] = useState(baseSearch)
  const [loading, setLoading] = useState(true)
  const { actions, orderReducers } = props
  useEffect(() => {
    getPlatformOrderListAsync()
  }, [])

  function callback(key) {
    if (key == 2) {
      getPlatformOrderListAsync()
    }
  }
  async function getPlatformOrderListAsync(params) {
    setLoading(true)
    setCooSearch(params)
    await actions.TPGetPlatformOrderList(params)
    setLoading(false)
  }
  //操作筛选项
  function searchAction(params) {
    getPlatformOrderListAsync({ ...params, ...baseSearch, })
  }
  //操作分页使用查询
  function changePage(params) {
    getPlatformOrderListAsync({ ...cooSearch, ...params })
  }



  const comProps = {
    setModalProps,
    actions: actions,
  }
  const { platformOrderList } = orderReducers
  const platformProps = {
    platformOrderList,
    searchAction,
    changePage,
    actions
  }
  return (
    <div>
      订单管理
      <Spin spinning={loading}>
        <Tabs onChange={callback} defaultActiveKey='1' >
          <TabPane tab="微信公众号" key="1">
            <WachatList {...comProps} />
          </TabPane>
          <TabPane tab="合作平台" key="2">
            <CooperationForm  {...platformProps} />
            <CooperationList {...comProps} {...platformProps} />
          </TabPane>
        </Tabs>
      </Spin>
      <Modal
        {...modalProps}
        visible={modalProps.visible}
        footer={null}
        onCancel={() => setModalProps({ ...modalProps, visible: false })}
      >
        {modalProps.content}
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  orderReducers: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

