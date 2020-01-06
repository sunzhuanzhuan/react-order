import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';
import AccountReceiveList from '../components/Account/AccountReceiveList'
import AccountReceiveForm from '../components/Account/AccountReceiveForm'
import { Modal, Spin, Icon, message } from 'antd'
import BreadCrumbs from '../base/BreadCrumbs'
const baseSearch = { page: { currentPage: 1, pageSize: 10 }, form: {} }
function AccountReceive(props) {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [searchParam, setSearchParam] = useState(baseSearch)
  useEffect(() => {
    getClaimAccountListAsync(searchParam)
  }, [])
  async function getClaimAccountListAsync(params) {
    setIsLoading(true)
    await actions.TPGetClaimAccountList(params)
    setIsLoading(false)
    setSearchParam(params)
  }
  //操作筛选项
  function searchAction(params) {
    getClaimAccountListAsync({ ...baseSearch, ...params })
  }
  //操作分页使用查询
  function changePage(params) {
    getClaimAccountListAsync({ ...searchParam, ...params })
  }
  //重置
  function onReset() {
    setSearchParam(baseSearch)
  }
  async function claimAccountAsync(ids, type) {
    const { data } = await actions.TPClaimAccount({ accountId: ids })
    if (type == 'batch') {
      Modal.success({
        title: '成功领取/领取总数',
        content: `${data.claimSuccessNum}/${data.claimTotalNum}`,
      });
    } else {
      message.success('领取成功')
    }
    changePage()
  }

  const { actions, acconutReducers } = props
  const { claimAccountList } = acconutReducers
  return (
    <div>
      <BreadCrumbs link='/order/task/account-manage' text={<h2>账号领取</h2>} />
      <AccountReceiveForm searchAction={searchAction} onReset={onReset} />
      <Spin spinning={isLoading}>
        <AccountReceiveList claimAccountList={claimAccountList} actions={actions} changePage={changePage} claimAccountAsync={claimAccountAsync} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountReceive)

