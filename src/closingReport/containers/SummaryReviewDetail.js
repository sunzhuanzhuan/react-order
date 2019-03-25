import React, { Component } from 'react'
import { PageHeader, Tabs, Divider, Empty } from 'antd'
import OrderCard from '../components/OrderCard'
import { SH2 } from '@/base/SectionHeader'
import { linkTo } from '../../util/linkTo'
import { parseUrlQuery } from '../../util/parseUrl'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { connect } from 'react-redux'
import DetailModal from '../base/DetailModal'
import Loading from '../base/Loading'


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
      tableActive: 'status_2',
      detailModal: {
        show: false,
        data: {},
        type: ''
      }
    }
    this.cardConfig = {
      orderActions: (data) => {
        return {}
      },
      orderStatus: true,
      dateTimeRecord: false,
      platformConfig: (item, data, propsSource) => {
        // data.is_finish == 2 || data.modify_status == 1 || data.check_status == 6;
        //return { edit, del, check, view, props }
        // 待内审
        if (data.summary_status === 2) {
          let result = {}
          let status = item['check_status']
          if (parseInt(status) === 1) {
            result.check = true
            result.props = {
              status: 'error',
              text: '待审核'
            }
          } else {
            result.props = {
              status: 'success',
              text: '已审核'
            }
          }
          result.view = !result.check
          return result
        }
        return {
          view: true
        }
      }
    }
    const { actions } = this.props
    // 获取结案数据单信息
    actions.getSummaryTotalInfo({ summary_id })
    actions.getSummaryOrderInfo({ summary_id }).then(() => {
      this.setState({ loading: false })
    })
  }

  reload = () => {
    const { actions } = this.props
    let { summary_id } = parseUrlQuery()
    this.setState({ loading: true })
    actions.getSummaryOrderInfo({ summary_id }).then(() => {
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
    if (!this.state.summaryId) {
      linkTo('/error')
    }
    const { closingReport: { companySource, summaryOrders, platformData }, actions } = this.props
    const { list = [], source = {} } = summaryOrders
    const { summaryName, creatorName } = companySource
    const { loading, detailModal, tableActive, summaryId } = this.state
    const connect = {
      actions,
      platformData,
      companySource
    }
    let statistics = {
      all: list,
      status_2: []
    }
    list.forEach((key) => {
      let item = source[key]
      switch (item.summary_status) {
        case 2:
          statistics.status_2.push(key)
          break
      }
    })
    return <div>
      <PageHeader
        onBack={() => this.props.history.push('/order/closing-report/list/review')}
        title="结案数据单审核详情"
      >
        <div style={{ padding: '20px 15px' }}>
          <span>
            结案数据单号：{summaryId}
          </span>
          <Divider type="vertical" />
          <span>
            结案数据单名称：{summaryName}
          </span>
          <Divider type="vertical" />
          <span>
            创建人：{creatorName}
          </span>
        </div>
        <SH2 />
      </PageHeader>
      {loading ? <Loading /> : <div>
        <Tabs
          animated={{ tabPane: false }}
          activeKey={tableActive}
          onChange={tableActive => this.setState({ tableActive })}
        >
          <TabPane tab={`含待内审订单 ${statistics['status_2'].length}`} key="status_2" />
          <TabPane tab={`全部 ${statistics['all'].length}`} key="all" />
        </Tabs>
        {
          statistics[tableActive].length ? statistics[tableActive].map(key => {
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
          successCallback={this.reload}
          closed={() => this.handleDetail()}
        />
      </div>}
    </div>
  }
}
