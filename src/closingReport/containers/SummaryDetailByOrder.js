import React, { Component } from 'react'
import { PageHeader, Divider, Empty, Upload, Alert, message } from 'antd'
import OrderCard from '../components/OrderCard'
import { SH2 } from '@/base/SectionHeader'
import { linkTo } from '../../util/linkTo'
import { parseUrlQuery } from '../../util/parseUrl'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { connect } from 'react-redux'
import DetailModal from '../base/DetailModal'
import Loading from '../base/Loading'
import Interface from '../constants/Interface'
const Cookie = require('js-cookie');

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
    let { summary_id, order_id } = parseUrlQuery()
    this.state = {
      summaryId: summary_id,
      orderId: order_id,
      loading: true,
      detailModal: {
        show: false,
        data: {},
        type: ''
      }
    }
    this.cardConfig = {
      orderActions: (data) => {
        //return { add, del, check }
        if (![1, 4, 6].includes(data.summary_status)) {
          return {}
        }
        // 当订单的投放数据审核状态为【待提交内审】【内审被拒，待修改】【品牌方审核被拒，待修改】时，
        // 订单操作逻辑同在 逻辑B 的基础上增加【提交审核】操作
        return {
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
      data && actions.getCompanyPlatforms({ company_id: data.company_id })
    })
    actions.getSummaryOrderInfo({ summary_id, order_id }).then(() => {
      this.setState({ loading: false })
    })
  }

  reload = () => {
    let { summary_id, order_id } = parseUrlQuery()
    const { actions } = this.props
    this.setState({ loading: true })
    actions.getSummaryOrderInfo({ summary_id, order_id }).then(() => {
      this.setState({ loading: false })
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


  render() {
    if (!this.state.summaryId || !this.state.orderId) {
      linkTo('/error')
    }
    const { closingReport: { companySource, summaryOrders, platformData }, actions } = this.props
    const { list = [], source = {} } = summaryOrders
    const { summaryName, creatorName } = companySource
    const { loading, detailModal, summaryId } = this.state
    const connect = {
      actions,
      platformData,
      companySource
    }
    let that = this;
    const props = {
      name: 'file',
      action: Interface.uploadExcle,
      data: { summary_id: that.state.summary_id },
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
          <a href={`/api/summaryData/exportKocSummaryDataBySummaryId?summary_id=${summaryId}`} style={{ float: 'right', marginLeft: '20px' }} >导出koc订单</a>
          <span style={{ float: 'right' }} >
            <Upload {...props} showUploadList={false} >
              <a >导入koc订单数据</a>
            </Upload>
          </span>
        </div>}
      />
      {loading ? <Loading /> : <div style={{ marginTop: '20px' }}>
        {
          list.length ? list.map(key => {
            let item = source[key]
            return <OrderCard
              key={key}
              {...connect}
              display={this.cardConfig}
              optional={companySource.platformByCompany}
              data={item}
              onDetail={this.handleDetail}
            />
          }) : <Empty />
        }
        <DetailModal
          {...connect}
          {...detailModal}
          closed={() => this.handleDetail()}
        />
      </div>}
    </div>
  }
}
