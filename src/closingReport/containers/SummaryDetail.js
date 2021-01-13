import React, { Component } from 'react'
import {
  PageHeader,
  Button,
  Tabs,
  Divider,
  Modal,
  message,
  Empty,
  Checkbox, Alert, Upload
} from 'antd'
import OrderCard from '../components/OrderCard'
import { SH2 } from '@/base/SectionHeader'
import { linkTo } from '../../util/linkTo'
import { parseUrlQuery } from '../../util/parseUrl'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { connect } from 'react-redux'
import DetailModal from '../base/DetailModal'
import SelectOrders from './SelectOrders'
import SelectKocOrders from './SelectKocOrders'
import difference from 'lodash/difference'
import Loading from '../base/Loading'
import { judgeSPStatus } from "@/closingReport/util";
import Interface from '../constants/Interface'
const Cookie = require('js-cookie');


const TabPane = Tabs.TabPane

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
export default class Test extends Component {
  constructor(props) {
    super(props)
    let { summary_id } = parseUrlQuery()
    this.state = {
      summaryId: summary_id,
      loading: true,
      tableActive: 'all',
      detailModal: {
        show: false,
        data: {},
        type: ''
      },
      selectedRowKeys: [],
      selectedRowKeysKoc: [],
      addModal: false,
      cardChecked: [],
      indeterminate: false,
      checkAll: false,
      kolVisible: true,
      kocVisible: false
    }
    this.canExport = true;
    this.cardConfig = {
      orderActions: (data) => {
        //return { add, del, check }
        if (![1, 4, 6].includes(data.summary_status)) {
          return {
            checkbox: {
              disabled: true
            }
          }
        }
        // 当订单的投放数据审核状态为【待提交内审】【内审被拒，待修改】【品牌方审核被拒，待修改】时，
        // 订单操作逻辑同在 逻辑B 的基础上增加【提交审核】操作
        return {
          checkbox: {
            disabled: data.summary_status !== 1
          },
          add: true,
          del: data.summary_status === 1,
          check: {
            disabled: data.platform.some(platform => parseInt(platform.is_finish) === 2),
            callback: () => {
              this.reload()
            }
          }
        }
      },
      orderStatus: true,
      dateTimeRecord: true,
      platformConfig: (item, data, propsSource) => {
        // data.is_finish == 2 || data.modify_status == 1 || data.check_status == 6;
        //return { edit, del, check, view, props }
        // 待提交内审
        if (data.summary_status === 1) {
          let result = {}
          let source = propsSource['is_finish']
          let status = item['is_finish']
          result.props = source[status]
          result.del = parseInt(item.is_hand_record) === 1
          if (parseInt(status) === 2) {
            result.edit = true
          }
          result.view = !result.edit
          return result
        }
        // 内审被拒，待修改
        if (data.summary_status === 4) {
          let result = {}
          let source = propsSource['modify_status']
          let status = item['modify_status']
          result.props = source[status]
          result.del = item.check_status === 1 // 当前新增的平台可以删除(还没提交过审核)
          if (parseInt(status) === 1) {
            result.edit = true
          }
          result.view = !result.edit
          return result
        }
        // 品牌方审核被拒，待修改
        if (data.summary_status === 6) {
          let result = {}
          result.del = item.check_status === 1 // 当前新增的平台可以删除(还没提交过审核)
          result.edit = true
          result.view = !result.edit
          return result
        }
        return {
          view: true
        }
      }
    }
    const { actions } = this.props
    // 获取投放数据汇总单信息
    actions.getSummaryTotalInfo({ summary_id }).then(({ data }) => {
      data = data || {}
      actions.getCompanyPlatforms({ company_id: data.company_id })
    })
    actions.getSummaryOrderInfo({ summary_id }).then(() => {
      this.setState({ loading: false })
    })
  }

  reload = () => {
    const { actions } = this.props
    let { summary_id } = parseUrlQuery()
    this.setState({ loading: true })
    actions.getSummaryOrderInfo({ summary_id }).then(() => {
      this.setState({
        loading: false,
        cardChecked: [],
        indeterminate: false,
        checkAll: false
      })
    })
  }

  handleDetail = (type, item, data) => {
    this.setState({
      detailModal: type ? {
        show: true,
        data: { ...data, current: item },
        type: type
      } : {}
    })
  }

  addOrders = () => {
    const { closingReport: { companySource: { companyId, summaryName } } } = this.props
    const { selectedRowKeys, summaryId, selectedRowKeysKoc } = this.state
    if (!selectedRowKeys.length && !selectedRowKeysKoc.length) {
      return message.info('请选择订单')
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
        this.reload()
        this.setState({ addModal: false })
      }
    }).finally(_msg)
  }
  onCheckboxChange = (checkedValue) => {
    this.setState({
      cardChecked: checkedValue,
      indeterminate: !!checkedValue.length && checkedValue.length < this.statistics['status_1'].length,
      checkAll: checkedValue.length === this.statistics['status_1'].length
    })
  }
  onCheckAllChange = e => {
    this.setState({
      cardChecked: e.target.checked ? this.statistics['status_1'] : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  };

  getBatchOrders = (keys) => {
    const { closingReport: { summaryOrders } } = this.props
    const { source = {} } = summaryOrders
    return keys.map(key => source[key].order_id)
  }

  batchSubmitCheck = () => {
    let orders = this.getBatchOrders(this.state.cardChecked)
    let hide = message.loading('处理中...', 0)
    this.props.actions.getOrderIsFinish({ order_id: orders }).then(({ data }) => {
      if (data.flag === 2) {
        Modal.info({
          title: '请先将选中的订单数据完善之后再提交'
        })
      } else if (data.flag === 1) {
        Modal.confirm({
          title: '是否确认批量提交内审？',
          onOk: hide => {
            return this.props.actions.submitCheckSummaryByOrder({ order_id: orders }).then(({ data }) => {
              let check = (data || {}).check
              if (check) {
                return judgeSPStatus(check, true)
              }
              message.success('提交审核成功!')
              this.reload()
            }).finally(hide)
          }
        })
      }
    }).finally(() => {
      hide()
    })
  }
  batchDelete = () => {
    let orders = this.getBatchOrders(this.state.cardChecked)
    Modal.confirm({
      title: '删除后，订单内数据将全部清空。确认批量删除么?',
      onOk: hide => {
        return this.props.actions.deleteSummaryOrder({
          order_id: orders, summary_id: this.state.summaryId
        }).then(() => {
          message.success('删除成功!')
          this.reload()
        }).finally(hide)
      }
    })
  }

  exportData = () => {
    if (!this.canExport || this.state.loading) return;
    this.canExport = false
    const { actions } = this.props
    let { summary_id } = parseUrlQuery()
    let hide = message.loading('导出中...')
    actions.exportPlatformDataInfoExcel({ summary_id }).finally(() => {
      this.canExport = true
      hide()
    })
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
    if (!this.state.summaryId) {
      linkTo('/error')
    }
    const { closingReport: { companySource, summaryOrders, platformData }, actions, common } = this.props
    const { list = [], source = {} } = summaryOrders
    const { summaryName, creatorName, companyId } = companySource
    const { loading, detailModal, tableActive, selectedRowKeys, addModal, summaryId,
      indeterminate, cardChecked, checkAll, kolVisible, kocVisible } = this.state
    const connect = {
      actions,
      platformData,
      companySource
    }
    let statistics = this.statistics = {
      all: list,
      status_1: [],
      status_4: [],
      status_6: []
    }
    list.forEach((key) => {
      let item = source[key]
      switch (item.summary_status) {
        case 1:
          statistics.status_1.push(key)
          break
        case 4:
          statistics.status_4.push(key)
          break
        case 6:
          statistics.status_6.push(key)
          break
      }
    })
    const selectOrderProps = {
      common,
      closingReport: this.props.closingReport,
      actions,
      selectedRowKeys,
      companyId,
      onSelectChange: selectedRowKeys => {
        this.setState({ selectedRowKeys })
      }
    }
    const selectKocOrderProps = {
      common,
      closingReport: this.props.closingReport,
      actions,
      selectedRowKeys,
      companyId,
      onSelectChangeKoc: selectedRowKeys => {
        this.setState({ selectedRowKeysKoc: selectedRowKeys })
      }
    }
    let that = this;
    const props = {
      name: 'file',
      action: Interface.uploadExcle,
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
            message.success(`上传成功!`);
          } else {
            message.error(info.file.response.msg || '上传失败');
          }
        } else if (info.file.status === 'error') {
          console.log('333', info)
          message.error(`上传失败`);
        }
      },
    }
    return <div>
      <PageHeader
        onBack={() => this.props.history.push('/order/closing-report/list/summary-order')}
        title="投放数据汇总单详情页"
        extra={
          <div>
            <Button type='primary' ghost onClick={this.exportData} style={{ marginRight: '10px' }}>导出数据</Button>
            <Button type='primary' ghost onClick={() => this.setState({ addModal: true })}>添加订单</Button>
          </div>
        }
      >
        <div style={{ padding: '20px 15px' }}>
          <span>
            投放数据汇总单号：{summaryId}
          </span>
          <Divider type="vertical" />
          <span>
            投放数据汇总单名称：{summaryName}
          </span>
          <Divider type="vertical" />
          <span>
            创建人：{creatorName}
          </span>
        </div>
        <SH2 />
      </PageHeader>
      <Alert style={{ marginTop: '20px' }} message={
        <div style={{ height: '20px', lineHeight: '20px', }}>
          <a onClick={this.exportExcel} style={{ float: 'right', marginLeft: '20px' }} >导出koc订单</a>
          <span style={{ float: 'right' }} >
            <Upload {...props} showUploadList={false} >
              <a >导入koc订单数据</a>
            </Upload>
          </span>
        </div>}
      />
      {loading ? <Loading /> : <div>
        <Tabs
          animated={{ tabPane: false }}
          activeKey={tableActive}
          onChange={tableActive => this.setState({ tableActive })}
        >
          <TabPane tab={`全部 ${statistics['all'].length}`} key="all" />
          <TabPane tab={`待提交内审 ${statistics['status_1'].length}`} key="status_1" />
          <TabPane tab={`内审被拒,待修改 ${statistics['status_4'].length}`} key="status_4" />
          <TabPane tab={`品牌方审核被拒,待修改 ${statistics['status_6'].length}`} key="status_6" />
        </Tabs>
        {
          statistics[tableActive].length ?
            <div>
              {
                (statistics['status_1'].length > 0 && (tableActive === 'all' || tableActive === 'status_1')) ?
                  <div style={{ marginBottom: '10px' }}>
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={this.onCheckAllChange}
                      checked={checkAll}
                    >全选</Checkbox>
                    <Button
                      disabled={!cardChecked.length}
                      type='primary'
                      style={{ marginRight: '10px' }}
                      onClick={this.batchSubmitCheck}
                    >
                      批量提交审核
                    </Button>
                    <Button
                      disabled={!cardChecked.length}
                      type='primary'
                      ghost
                      onClick={this.batchDelete}
                    >
                      批量删除
                    </Button>
                  </div>
                  : null
              }
              <Checkbox.Group style={{ display: 'block' }} onChange={this.onCheckboxChange} value={cardChecked}>
                {statistics[tableActive].map(key => {
                  let item = source[key]
                  return <OrderCard
                    key={key}
                    {...connect}
                    display={this.cardConfig}
                    optional={companySource.platformByCompany}
                    data={item}
                    onDetail={this.handleDetail}
                  />
                })}</Checkbox.Group></div> : <Empty />
        }
        <DetailModal
          {...connect}
          {...detailModal}
          closed={() => this.handleDetail()}
        />
      </div>}
      {addModal && <Modal
        centered
        title={<h2 className='data-details-header'>添加订单
          <small>数据单ID：{summaryId}</small>
        </h2>}
        wrapClassName="closing-report-modal-pages data-details"
        visible
        width={1000}
        bodyStyle={{ minHeight: '600px' }}
        onCancel={() => this.setState({ addModal: false })}
        onOk={this.addOrders}
      >
        <div style={{ marginBottom: '20px' }}>
          <Button style={{ borderRadius: 0 }} className={kolVisible && 'selected'} onClick={this.selectKol}>预约订单</Button>
          <Button style={{ borderRadius: 0 }} className={kocVisible && 'selected'} onClick={this.selectKoc}>koc订单</Button>
        </div>
        {kolVisible && <SelectOrders {...selectOrderProps} />}
        {kocVisible && <SelectKocOrders {...selectKocOrderProps} />}

      </Modal>}
    </div>
  }
}
