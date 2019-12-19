import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';
import AccountForm from '../components/Account/AccountForm'
import AccountList from '../components/Account/AccountList'
import { Modal, Tabs, Spin, Button, Badge } from 'antd'
import TitleBox from '../base/TitleBox'
const baseSearch = { page: { currentPage: 1, pageSize: 10 } }
const { TabPane } = Tabs;
function Account(props) {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [searchParam, setSearchParam] = useState({ page: { currentPage: 1, pageSize: 10 } })
  const [loading, setLoading] = useState(true)
  const [defaultSearchKey, setDefaultSearchKey] = useState()
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

  //操作筛选项
  function searchAction(params) {
    getAccountListAsync({ ...baseSearch, ...params })
  }
  //操作分页使用查询
  function changePage(params) {
    getAccountListAsync({ ...searchParam, ...params, ...defaultSearchKey })
  }
  //重置
  function onReset() {
    setSearchParam(baseSearch)
  }

  const comProps = {
    accountList,
    setModalProps,
    searchParam,
    actions,
    changePage,
  }
  return (
    <div>
      <h2>账号列表</h2>
      <TitleBox title='筛选项' >
        <AccountForm searchAction={searchAction} onReset={onReset} />
      </TitleBox>
      <div style={{ position: 'relative' }}>
        <a href="/order/task/account-receive" style={{ position: 'absolute', left: 99, zIndex: 999, top: -10 }}>
          <Badge count={5} >
            <Button type='primary' >账号领取</Button>
          </Badge>
        </a>
      </div>
      <Spin spinning={loading}>
        <TitleBox title='账号列表' >
          <AccountList {...comProps} />
        </TitleBox>
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
