import React, { Component } from 'react'
import { Steps, Button, message, Modal, Input, Form, Alert, Upload } from 'antd'
import './CreateReport.less'
import SelectOrders from './SelectOrders'
import SelectKocOrders from './SelectKocOrders'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import OrderList from './OrderList'
import { parseUrlQuery } from '@/util/parseUrl'
import difference from 'lodash/difference'
import { linkTo } from '../../util/linkTo';
import { judgeSPStatus } from "@/closingReport/util";
import Interface from '../constants/Interface'
const Cookie = require('js-cookie');

const Step = Steps.Step

const steps = [{
  title: '选择订单',
  content: SelectOrders
}, {
  title: '完善订单数据',
  content: OrderList
}]
const stepsKoc = [{
  title: '选择订单',
  content: SelectKocOrders
}, {
  title: '完善订单数据',
  content: OrderList
}]

const mapStateToProps = (state) => ({
  common: state.commonReducers,
  closingReport: state.closingReportReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateReport extends Component {
  constructor(props) {
    super(props)
    let { company_id, summary_name = '' } = parseUrlQuery()
    this.state = {
      current: 0,
      companyId: company_id,
      reportId: null,
      summaryName: summary_name,
      validateStatus: '',
      selectedRowKeys: [],
      selectedRowKeysKoc: [],
      visible: !summary_name,
      kolVisible: true,
      kocVisible: false
    }
    const { actions } = this.props
    // 获取公司信息接口
    actions.getCompanyTotalInfo({ company_id })
  }

  componentWillUnmount() {
    // 清除reducer
    this.props.actions.resetCreateReportData()
  }

  // 提交审核
  submitCheck = () => {
    const {
      closingReport: {
        summaryOrders: { list, source },
        companySource: { summaryId }
      },
      actions
    } = this.props
    let validate = list.every(orderKey => {
      let order = source[orderKey]
      return order.platform.every(platform => parseInt(platform.is_finish) === 1)
    })
    if (validate) {
      Modal.confirm({
        title: '是否确认将本【投放数据汇总单】提交审核？',
        onOk: hide => {
          return actions.submitCheckSummary({ summary_id: summaryId }).then(({ data }) => {
            let check = (data || {}).check
            if (check) {
              return judgeSPStatus(check, true)
            }
            message.success('提交审核成功!')
            this.linkTo('/order/closing-report/detail/summary?summary_id=' + summaryId)
          }).finally(hide)
        }
      })

    } else {
      Modal.info({ title: '请先将所有订单的数据都完善之后再提交' })
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }
  onSelectChangeKoc = selectedRowKeys => {
    this.setState({ selectedRowKeysKoc: selectedRowKeys })
  }
  validateName = (summaryName) => {
    return summaryName.length > 0 && summaryName.length <= 30
  }
  changeName = (e) => {
    let val = e.target.value
    this.setState({
      summaryName: val,
      validateStatus: this.validateName(val) ? 'success' : 'error'
    })
  }
  handleOk = () => {
    if (this.validateName(this.state.summaryName)) {
      this.setState({ visible: false })
    } else {
      this.setState({ validateStatus: 'error' })
    }
  }
  handleCancel = (url = '/') => {
    linkTo(url)
  }

  temporarySave = () => {
    this.coreSave((summaryId) => {
      this.linkTo('/order/closing-report/detail/summary?summary_id=' + summaryId)
      // 页面刷新跳转到【投放数据汇总单列表】=》草稿 TAB页面
    })
  }

  linkTo = (url) => {
    this.props.history.push(url)
  }

  coreSave(callback) {
    const { closingReport: { companySource: { summaryId } } } = this.props
    const { selectedRowKeys, companyId, summaryName, selectedRowKeysKoc } = this.state
    if (!selectedRowKeys.length && !selectedRowKeysKoc.length) {
      if (summaryId) {
        callback(summaryId)
        return Promise.resolve()
      } else {
        message.info('请选择订单')
        return Promise.reject()
      }
    }
    let _msg = message.loading('保存中...')
    const { actions } = this.props
    return actions.addOrUpdateSummary({
      company_id: companyId,
      summary_id: summaryId,
      summary_name: summaryName,
      order_ids: selectedRowKeys,
      other_order_ids: selectedRowKeysKoc
    }).then(({ data }) => {
      if (data.order_ids) {
        this.setState({ selectedRowKeys: difference(this.state.selectedRowKeys, data.order_ids) })
        Modal.info({
          title: data.order_ids + '， 已被其他【投放数据汇总单】选中且保存了，已自动为您取消勾选'
        })
      } else {
        callback(data.summary_id)
      }
    }).finally(_msg)
  }

  next() {
    this.coreSave(() => {
      const current = this.state.current + 1
      this.setState({ current, selectedRowKeys: [], selectedRowKeysKoc: [] })
    })
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }
  selectKol = () => {
    this.setState({
      kolVisible: true,
      kocVisible: false
    })
  }
  selectKoc = () => {
    this.setState({
      kolVisible: false,
      kocVisible: true
    })
  }
  render() {
    const { closingReport: { companySource: { summaryId, companyName, companyPath, beSalesRealName } } } = this.props
    // 参数错误跳到error
    if (!this.state.companyId) {
      this.handleCancel('/error')
    }
    const { current, selectedRowKeys, summaryName, companyId, kolVisible, kocVisible, selectedRowKeysKoc } = this.state
    const C = steps[current].content
    const K = stepsKoc[current].content
    const footerWidth = this.props.common.ui.sliderMenuCollapse ? 40 : 200
    const store = {
      common: this.props.common,
      closingReport: this.props.closingReport,
      actions: this.props.actions
    }
    const select = {
      selectedRowKeys: selectedRowKeys,
      companyId,
      onSelectChange: this.onSelectChange
    }
    const selectKoc = {
      selectedRowKeysKoc: selectedRowKeysKoc,
      companyId,
      onSelectChangeKoc: this.onSelectChangeKoc
    }
    let selectedRowKeysAndKoc = selectedRowKeys.concat(selectedRowKeysKoc)
    let that = this;
    const props = {
      name: 'file',
      action: Interface.uploadExcle,
      data: { summary_id: summaryId },
      headers: {
        "X-Access-Token": Cookie.get('token') || '',
      },
      onChange(info) {
        that.setState({
          visible: false
        })
        if (info.file.status === 'uploading') {
          // message.loading('Loading...')
          console.log('111', info)
        }
        if (info.file.status === 'done') {
          let res = info.file.response
          if (res.code == 200) {
            message.success(`导入成功!`);
            const { actions } = that.props
            actions.getCompanyPlatforms({ company_id: companyId })
            actions.getSummaryOrderInfo({ summary_id: summaryId }).then(() => {
              that.setState({ loading: false })
            })
          } else {
            message.error(info.file.response.msg || '上传失败');
          }
        } else if (info.file.status === 'error') {
          console.log('333', info)
          message.error(`上传失败`);
        }
      },
    }
    return (
      <div className='closing-report-pages create-page'>
        <header className='create-page-steps'>
          <Steps current={current}>
            {kolVisible ? steps.map(item => <Step key={item.title} title={item.title} />) :
              stepsKoc.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </header>
        <main className='create-page-content'>
          <div className='content-statistic'>
            <p>投放数据汇总单</p>
            <b>名称</b><span>{summaryName || '-'}</span>
            <b>公司简称</b><span><a target='_blank' href={companyPath}>{companyName || '-'}</a></span>
            <b>所属销售</b><span>{beSalesRealName || '-'}</span>
          </div>
          {current == 0 && <div style={{ marginTop: '20px' }}>
            <Button style={{ borderRadius: 0 }} className={kolVisible && 'selected'} onClick={this.selectKol}>预约订单</Button>
            <Button style={{ borderRadius: 0 }} className={kocVisible && 'selected'} onClick={this.selectKoc}>koc订单</Button>
          </div>}
          {current === steps.length - 1 && <Alert style={{ marginTop: '20px' }} message={
            <div style={{ height: '20px', lineHeight: '20px', }}>
              <a href={`/api/summaryData/exportKocSummaryDataBySummaryId?summary_id=${summaryId}`} style={{ float: 'right', marginLeft: '20px' }} >导出koc订单</a>
              <span style={{ float: 'right' }} >
                <Upload {...props} showUploadList={false} >
                  <a >导入koc订单数据</a>
                </Upload>
              </span>
            </div>}
          />}
          {kolVisible && <div className="steps-content">
            <C {...select} {...store} />
          </div>}
          {kocVisible && <div className="steps-content">
            <K {...selectKoc} {...store} />
          </div>}
        </main>
        <footer className='create-page-action' style={{ width: `calc(100% - ${footerWidth}px)` }}>
          <div className="steps-action">
            {
              current < steps.length - 1
              && [
                <span className='action-item' key={1}>已选订单：<b>{selectedRowKeysAndKoc.length}</b>个</span>,
                <Button className='action-item' key={2} onClick={() => this.temporarySave()}>存草稿</Button>,
                <Button className='action-item' key={3} type="primary" onClick={() => this.next()}>下一步</Button>
              ]
            }
            {
              current === steps.length - 1
              &&
              [
                <span key={4} className='action-item text'>订单内数据完善后才能提交审核</span>,
                <Button key={5} className='action-item'
                  onClick={() => this.linkTo('/order/closing-report/detail/summary?summary_id=' + summaryId)}>存草稿</Button>,
                <Button key={6} className='action-item' type="primary"
                  onClick={this.submitCheck}>提交审核</Button>
              ]
            }
            {
              current > 0
              && (
                <Button className='action-item left' style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  上一步
                </Button>
              )
            }
          </div>
        </footer>
        <Modal
          title="创建投放数据汇总单"
          visible={this.state.visible}
          okButtonProps={{ disabled: !this.validateName(summaryName) }}
          onOk={this.handleOk}
          okText='下一步'
          onCancel={() => this.handleCancel('/loginSuccess')}
          maskClosable={false}
        >
          <Form.Item
            label='投放数据汇总单名称'
            validateStatus={this.state.validateStatus}
            help={this.state.validateStatus === 'error' ? '输入的名称长度不能超过30个字' : ''}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
          >
            <Input placeholder='请填写投放数据汇总单的名称，不超过30个字' value={summaryName} onChange={this.changeName} />
          </Form.Item>
        </Modal>
      </div>
    )
  }
}
