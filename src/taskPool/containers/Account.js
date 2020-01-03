import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';
import AccountForm from '../components/Account/AccountForm'
import AccountList from '../components/Account/AccountList'
import { Modal, Tabs, Spin, Button, Badge, message } from 'antd'
import TitleBox from '../base/TitleBox'
const baseSearch = { page: { currentPage: 1, pageSize: 10 } }
function Account(props) {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [searchParam, setSearchParam] = useState({ page: { currentPage: 1, pageSize: 10 } })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAccountListAsync()
    actions.TPGetAccountTabNumber()
  }, [])
  const { acconutReducers, actions } = props
  const { accountList, accountTabNumber = {} } = acconutReducers
  async function getAccountListAsync(params) {
    setLoading(true)
    await actions.TPGetAccountList(params)
    setSearchParam(params)
    setLoading(false)
  }

  //操作筛选项
  function searchAction(params) {
    getAccountListAsync({ ...baseSearch, ...params })
  }
  //操作分页使用查询
  function changePage(params) {
    getAccountListAsync({ ...searchParam, ...params })
  }
  //重置
  function onReset() {
    setSearchParam(baseSearch)
  }
  //上下架
  async function updateAccountStateMsgAsync(params) {
    await actions.TPUpdateAccountStateMsg(params)
    setModalProps({ visible: false })
    changePage()
    message.success('操作成功')
  }
  //批量通过
  async function batchUpdateAccountStateAsync(params) {
    await actions.TPBatchUpdateAccountState(params)
    setModalProps({ visible: false })
    changePage()
    message.success('操作成功')
  }
  const comProps = {
    accountList,
    setModalProps,
    searchParam,
    actions,
    changePage,
    updateAccountStateMsgAsync,
    batchUpdateAccountStateAsync
  }
  return (
    <div>
      <h2>账号列表</h2>
      <TitleBox title='筛选项' >
        <AccountForm searchAction={searchAction} onReset={onReset} />
      </TitleBox>

      <Spin spinning={loading}>
        <a href="/order/task/account-receive" style={{ padding: '10px 0px', display: 'block' }}>
          <Badge count={5} >
            <Button type='primary' >账号领取</Button>
          </Badge>
        </a>
        <AccountList {...comProps} />
      </Spin>
      <Modal
        {...modalProps}
        visible={modalProps.visible}
        footer={null}
        onCancel={() => setModalProps({ ...modalProps, visible: false })}
      >
        {modalProps.content && modalProps.content(comProps)}
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
