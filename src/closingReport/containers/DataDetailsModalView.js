import React, { Component } from 'react'
import { Modal, Empty } from 'antd'
import {
  Outline,
  BaseInfo,
  ExecutionLink,
  ExecutionPic,
  ExecutionData
} from '../components/dataDetails'
import './DataDetailsModal.less'
import Loading from '../base/Loading'
import { Agree, Refuse } from '@/closingReport/base/ApprovalStatus'

export default class DataDetailsModalView extends Component {
  constructor(props, context) {
    super(props, context)
    const { actions, data } = props
    this.state = { loading: true }
    // 请求数据
    actions.getPlatformDataInfo({
      order_id: data.order_id,
      platform_id: data.current.platform_id
    }).catch((err) => {
      this.setState({ error: true, errorMsg: '错误:' + err.errorMsg || '未知错误!' })
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  componentWillUnmount() {
    this.props.actions.clearPlatformData()
  }

  render() {
    const { data, platformData } = this.props
    const {
      total, // outline
      basic_information, // baseInfo
      execution_link,
      execution_screenshot, // executionPic
      execution_data
    } = platformData
    const title = <h2 className='data-details-header'>平台数据详情
      <small>订单ID：{data.order_id}</small>
    </h2>
    return <Modal
      centered
      destroyOnClose
      title={title}
      wrapClassName="closing-report-modal-pages data-details"
      visible
      width={800}
      onCancel={this.props.closed}
      onOk={this.props.closed}
    >
      <div style={{ minHeight: '588px' }}>
        {this.state.loading ?
          <Loading /> :
          this.state.error ?
            <Empty description={this.state.errorMsg} style={{ paddingTop: '130px' }} /> :
            <div>
              <Outline.View data={total} />
              <BaseInfo.View data={basic_information}>
                {parseInt(basic_information.status) === 1 && <Agree />}
                {parseInt(basic_information.status) === 2 &&
                <Refuse reason={basic_information.reason} />}
              </BaseInfo.View>
              <ExecutionLink.View data={execution_link}>
                {parseInt(execution_link.status) === 1 && <Agree top={10} />}
                {parseInt(execution_link.status) === 2 &&
                <Refuse top={10} reason={execution_link.reason} />}
              </ExecutionLink.View>
              <ExecutionPic.View data={execution_screenshot}>
                {parseInt(execution_screenshot.status) === 1 && <Agree />}
                {parseInt(execution_screenshot.status) === 2 &&
                <Refuse reason={execution_screenshot.reason} />}
              </ExecutionPic.View>
              <ExecutionData.View data={execution_data}>
                {parseInt(execution_data.status) === 1 && <Agree />}
                {parseInt(execution_data.status) === 2 && <Refuse reason={execution_data.reason} />}
              </ExecutionData.View>
            </div>
        }
      </div>
    </Modal>
  }
}
