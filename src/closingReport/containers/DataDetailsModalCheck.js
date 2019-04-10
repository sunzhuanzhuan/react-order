import React, { Component } from 'react'
import { Modal, Form, message, Empty } from 'antd'
import {
  Outline,
  BaseInfo,
  ExecutionLink,
  ExecutionPic,
  ExecutionData
} from '../components/dataDetails'
import './DataDetailsModal.less'
import DataDetailsReviewWrap from '../components/dataDetails/DataDetailsReviewWrap'
import Loading from '../base/Loading'

@Form.create()
export default class DataDetailsModalCheck extends Component {
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

  showConfirm = (values, successCallback) => {
    Modal.confirm({
      title: '是否确认提交审核？',
      onOk: () => {
        const { actions, data } = this.props
        return actions.checkPlatformData({
          ...values,
          order_id: data.order_id,
          platform_id: data.current.platform_id
        }).then(() => {
          message.success('保存成功!')
          this.props.closed()
          successCallback && successCallback()
        })
      }
    })
  }


  submit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let defaultValue = {
          'basic_information_status': 1,
          'execution_link_status': 1,
          'execution_screenshot_status': 1,
          'execution_data_status': 1
        }
        this.showConfirm({...defaultValue, ...values}, this.props.successCallback)
      }
    })
  }

  render() {
    const { form, data, platformData } = this.props
    const {
      total, // outline
      basic_information, // baseInfo
      execution_link,
      execution_screenshot, // executionPic
      execution_data
    } = platformData
    const props = {
      form
    }
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
      onOk={this.submit}
      okText='提交结果'
      maskClosable={false}
    >
      <div style={{ minHeight: '438px' }}>
        {this.state.loading ?
          <Loading /> :
          this.state.error ?
            <Empty description={this.state.errorMsg} style={{ paddingTop: '130px' }} /> :
            <Form>
              <Outline.View data={total} />
              <DataDetailsReviewWrap {...props} field='basic_information'>
                <BaseInfo.View data={basic_information} />
              </DataDetailsReviewWrap>
              {
                execution_link.data.length ? <DataDetailsReviewWrap {...props} field='execution_link'>
                  <ExecutionLink.View data={execution_link} />
                </DataDetailsReviewWrap> : null
              }
              {
                execution_screenshot.data.length ? <DataDetailsReviewWrap {...props} field='execution_screenshot'>
                <ExecutionPic.View data={execution_screenshot} />
              </DataDetailsReviewWrap> : null
              }
              <DataDetailsReviewWrap {...props} field='execution_data'>
                <ExecutionData.View data={execution_data} />
              </DataDetailsReviewWrap>
            </Form>
        }
      </div>
    </Modal>
  }
}
