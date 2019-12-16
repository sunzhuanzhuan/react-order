import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { WachatList, CooperationList, CooperationForm } from '../components/Order'
import { Tabs, Modal } from 'antd';
import { bindActionCreators } from 'redux';
const { TabPane } = Tabs;
const Orders = (props) => {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const { actions } = props
  useEffect(() => {
    getPlatformOrderList()
  }, [])
  function onOk(callback) {
    setModalProps({ ...modalProps, visible: false })
    if (typeof (callback) === "function") {
      callback()
    }
  }
  function callback(key) {
    if (key == 2) {
      getPlatformOrderList()
    }
  }
  function getPlatformOrderList(params) {
    actions.getPlatformOrderList(params)
  }
  const comProps = {
    setModalProps,
    actions: actions,
  }
  const { platformOrderList } = props.orderReducers
  const platformProps = {
    platformOrderList
  }
  return (
    <div>
      订单管理
        <Tabs onChange={callback} defaultActiveKey='2' >
        <TabPane tab="微信公众号" key="1">
          <WachatList {...comProps} />
        </TabPane>
        <TabPane tab="合作平台" key="2">
          <CooperationForm />
          <CooperationList {...comProps} {...platformProps} />
        </TabPane>
      </Tabs>
      <Modal
        {...modalProps}
        visible={modalProps.visible}
        onOk={onOk}
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

