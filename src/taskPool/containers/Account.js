import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';
import AccountForm from '../components/Account/AccountForm'
import AccountList from '../components/Account/AccountList'
import { Modal, Tabs, Spin } from 'antd'
const { TabPane } = Tabs;
function Account(props) {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [searchParam, setSearchParam] = useState({ page: { currentPage: 1, pageSize: 10 } })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAccountListAsync()
  }, [])
  const { acconutReducers, actions } = props
  const { accountList } = acconutReducers
  async function getAccountListAsync(params) {
    setLoading(true)
    await actions.getAccountList(params)
    setSearchParam(params)
    setLoading(false)
  }
  const comProps = {
    accountList,
    setModalProps,
    searchParam
  }
  console.log("TCL: Account -> accountList", accountList)

  return (
    <div>
      <AccountForm />
      <Spin spinning={loading}>
        <Tabs defaultActiveKey="1" >
          <TabPane tab={`全部（${11}）`} key="1">
            <AccountList {...comProps} />
          </TabPane>
          <TabPane tab={`待审核（${9}）`} key="2">
            <AccountList />
          </TabPane>
          <TabPane tab={`待评估（${0}）`} key="3">
            <AccountList />
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
  acconutReducers: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
