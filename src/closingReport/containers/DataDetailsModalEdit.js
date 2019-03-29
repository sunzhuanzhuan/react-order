import React, { Component } from 'react'
import { Modal, Form, Button, message, Empty } from 'antd'
import {
  Outline,
  BaseInfo,
  ExecutionLink,
  ExecutionPic,
  ExecutionData
} from '../components/dataDetails'
import './DataDetailsModal.less'
import { Agree } from '../base/ApprovalStatus'
import Loading from '../base/Loading'
import { fieldConfig } from '../constants/config';
import { moment2dateStr } from '../util';


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
@Form.create()
export default class DataDetailsModalEdit extends Component {
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

  handleSubmitData = (value) => {
    let result = {}
    let {
      basic_information = [],
      execution_link = [],
      execution_screenshot = [],
      data = [],
      screenshot = []
    } = value
    result.basic_information = basic_information.map(item => ({
      id: item.id,
      value: item.input,
      checked: item.checked ? 1 : 2
    }))
    result.execution_link = execution_link.map(item => ({
      id: item.id,
      value: item.radio === 1 ? item.reference : item.link,
      radio: item.radio
    }))
    result.execution_screenshot = execution_screenshot.map(item => ({
      id: item.id,
      value: (item.value || []).map(file => file.url)
    }))
    result.data = data.map(item => ({
      id: item.id,
      value: fieldConfig(item.id) === 'datetime' ? moment2dateStr(item.input) : item.input,
      checked: item.checked ? 1 : 2
    }))
    result.screenshot = screenshot.map(item => ({
      id: item.id,
      value: (item.value || []).map(file => file.url)
    }))
    return result
  }

  save = () => {
    let values = this.props.form.getFieldsValue()
    values = this.handleSubmitData(values)
    const { actions, data } = this.props
    let hide = message.loading('保存中..', 0)
    actions.updatePlatformInfo({
      ...values,
      order_id: data.order_id,
      platform_id: data.current.platform_id
    }).then(() => {
      message.success('保存成功!')
    }).finally(() => {
      hide()
    })
  }

  showConfirm = (values) => {
    Modal.confirm({
      title: '提交之后数据再次修改，是否确认提交？',
      onOk: () => {
        values = this.handleSubmitData(values)
        const { actions, data } = this.props
        return actions.updatePlatformInfo({
          ...values,
          order_id: data.order_id,
          is_finish: 1,
          platform_id: data.current.platform_id
        }).then(() => {
          message.success('保存成功!')
          actions.submitPlatformInfo({
            id: data.id,
            platform_id: data.current.platform_id,
            status: data.summary_status
          })
          this.props.closed()
        })
      }
    })
  }


  submit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.showConfirm(values)
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
      execution_data,
      is_main
    } = platformData
    const props = {
      formItemLayout, form
    }
    const title = <h2 className='data-details-header'>平台数据详情
      <small>订单ID：{data.order_id}</small>
    </h2>
    const footer = <div className='data-details-footer'>
      {/*<Icon type="exclamation-circle" />*/}
      <span> </span>
      <Button onClick={this.save}>保存</Button>
      <Button type='primary' onClick={this.submit}>保存并提交</Button>
    </div>
    return <Modal
      centered
      destroyOnClose
      title={title}
      wrapClassName="closing-report-modal-pages data-details"
      visible
      width={800}
      onCancel={this.props.closed}
      footer={footer}
      maskClosable={false}
    >
      <div style={{ minHeight: '438px' }}>
        {this.state.loading ?
          <Loading /> :
          this.state.error ?
            <Empty description={this.state.errorMsg} style={{ paddingTop: '130px' }} /> :
            <Form>
              <Outline.View data={total} />
              {
                parseInt(basic_information.status) === 1 ?
                  <BaseInfo.View data={basic_information}><Agree /></BaseInfo.View> :
                  <BaseInfo.Edit data={basic_information} isMain={is_main} {...props} />
              }
              {
                parseInt(execution_link.status) === 1 ?
                  <ExecutionLink.View data={execution_link}><Agree top={10} /></ExecutionLink.View> :
                  <ExecutionLink.Edit data={execution_link} {...props} />
              }
              {
                parseInt(execution_screenshot.status) === 1 ?
                  <ExecutionPic.View data={execution_screenshot}><Agree /></ExecutionPic.View> :
                  <ExecutionPic.Edit data={execution_screenshot} {...props} />
              }
              {
                parseInt(execution_data.status) === 1 ?
                  <ExecutionData.View data={execution_data}><Agree /></ExecutionData.View> :
                  <ExecutionData.Edit data={execution_data}  {...props} />
              }
            </Form>
        }
      </div>
    </Modal>
  }
}
