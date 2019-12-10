import React, { useState } from 'react'
import { connect } from 'react-redux'
import WachatList from '../components/Order/WachatList'
import { Tabs, Modal } from 'antd';
const { TabPane } = Tabs;
const Orders = (porps) => {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  function onOk(callback) {
    setModalProps({ ...modalProps, visible: false })
    if (typeof (callback) === "function") {
      callback()
    }
  }
  function callback() {

  }
  const comProps = {
    setModalProps
  }
  return (
    <div>
      订单管理
        <Tabs onChange={callback} >
        <TabPane tab="微信公众号" key="1">
          <WachatList {...comProps} />
        </TabPane>
        <TabPane tab="合作平台" key="2">
          {/* <CooperationList /> */}
        </TabPane>
      </Tabs>
      <Modal
        {...modalProps}
        visible={modalProps.visible}
        onOk={onOk}
        onCancel={() => setModalProps({ ...modalProps, visible: false })}
      >
        {modalProps.content}
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

