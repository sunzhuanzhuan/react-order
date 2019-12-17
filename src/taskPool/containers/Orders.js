import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { WachatList, CooperationList, CooperationForm } from '../components/Order'
import { Tabs, Modal, Spin } from 'antd';
import { bindActionCreators } from 'redux';
const { TabPane } = Tabs;
const Orders = (props) => {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [cooSearch, setCooSearch] = useState({ page: { currentPage: 1, pageSize: 10 } })
  const [loading, setLoading] = useState(true)
  const { actions } = props
  useEffect(() => {
    getPlatformOrderList()
  }, [])

  function callback(key) {
    if (key == 2) {
      getPlatformOrderList()
    }
  }
  async function getPlatformOrderList(params) {
    setLoading(true)
    const data = { ...cooSearch, ...params }
    setCooSearch(data)
    await actions.getPlatformOrderList(data)
    setLoading(false)
  }
  const comProps = {
    setModalProps,
    actions: actions,
  }
  const { platformOrderList } = props.orderReducers
  const platformProps = {
    platformOrderList,
    getPlatformOrderList
  }
  return (
    <div>
      订单管理
      <Spin spinning={loading}>
        <Tabs onChange={callback} defaultActiveKey='2' >
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

