import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';
import { AccountTabsForm } from '../components/Account/AccountForm'
import AccountList from '../components/Account/AccountList'
import { Modal, Tabs, Spin, Button, Badge, message } from 'antd'
import TitleBox from '../base/TitleBox'

const baseSearch = { page: { currentPage: 1, pageSize: 10 }, form: {} }
function Account(props) {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [searchParam, setSearchParam] = useState(baseSearch)
  const [claimTotal, setClaimTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState(1)
  useEffect(() => {
    getAccountListAsync(searchParam)
    actions.TPGetFiltersMeta()
    getClaimAccountList()
  }, [])
  const { acconutReducers, actions } = props
  const { accountList, orderIndustryCategory = [] } = acconutReducers
  async function getAccountListAsync(params) {
    setLoading(true)
    await actions.TPGetAccountList(params)
    setSearchParam(params)
    setLoading(false)
  }
  //获取领取列表数
  async function getClaimAccountList() {
    const { data } = await actions.TPGetClaimAccountList({ page: { currentPage: 1, pageSize: 1 }, form: {} })
    setClaimTotal(data.total)
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

  const formProps = {
    searchAction, onReset, orderIndustryCategory, selectedTab
  }
  return (
    <div>
      <h2>账号列表</h2>
      <TitleBox title='筛选项' >
        <AccountTabsForm formProps={formProps} />
      </TitleBox>

      <Spin spinning={loading}>
        <a href="/order/task/account-receive" style={{ padding: '10px 0px', display: 'block' }}>
          <Badge count={claimTotal} >
            <Button type='primary' >账号领取</Button>
          </Badge>
        </a>
        <AccountList {...comProps} />
      </Spin>
      <Modal
        {...modalProps}
        visible={modalProps.visible}
        footer={null}
        destroyOnClose={true}
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
