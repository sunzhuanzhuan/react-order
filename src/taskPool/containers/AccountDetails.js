import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';
import { Modal, Spin, Collapse, } from 'antd'
import BreadCrumbs from '../base/BreadCrumbs'
import DetailsShow from '../components/Account/DetailsShow'
import ContentEvaluation from '../components/Account/ContentEvaluation'
import AuditResults from '../components/Account/AuditResults'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
const { Panel } = Collapse;
function AccountDetails(props) {
  const [modalProps, setModalProps] = useState({ title: '', content: '' })
  const [isLoading, setIsLoading] = useState(true)
  const searchParam = qs.parse(props.location.search.substring(1))
  useEffect(() => {
    getAccountDetailAsync()
  }, [])
  async function getAccountDetailAsync() {
    setIsLoading(true)
    await actions.TPGetAccountDetail(searchParam)
    setIsLoading(false)
  }

  const { actions, acconutReducers } = props
  const { accountDetail = {}, accountEstimateDetails = {} } = acconutReducers
  const contentProps = {
    ...searchParam, accountDetail, actions,
    accountEstimateDetails
  }
  const {
    auditState//审核状态   1：待审核（默认） 2：未通过 3：已通过
  } = accountDetail
  return (
    <div className='task-account-details'>
      <BreadCrumbs link='/order/task/account-manage' text={<h2>账号详情</h2>} />
      <Spin spinning={isLoading}>

        <Collapse defaultActiveKey={['1', '2']}>
          <Panel header="账号审核" key="1">
            <DetailsShow accountDetail={accountDetail} />
            {auditState == 1 ? <AuditResults accountDetail={accountDetail} actions={actions} {...searchParam} /> : null}
          </Panel>
          {auditState == 3 ? <Panel header="内容评估" key="2">
            <ContentEvaluation {...contentProps} />
          </Panel> : null}
        </Collapse>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountDetails))
