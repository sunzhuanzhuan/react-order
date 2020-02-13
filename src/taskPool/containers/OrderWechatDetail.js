import React, { useState, useEffect } from 'react'
import TitleBox from '../base/TitleBox'
import { Col, Row, Descriptions, Spin, Modal } from 'antd'
import BreadCrumbs from '../base/BreadCrumbs'
import { connect } from 'react-redux'
import * as actions from '@/taskPool/actions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import DataCurve from '../components/Order/DataCurve'
import './OrderWechatDetail.less';
import qs from 'qs'
import numeral from 'numeral'
const getNumber = (value) => {
  return numeral(value).format(',')
}
function OrderWechatDetail(props) {
  const { actions, orderReducers } = props
  const [modalProps, setModalProps] = useState({ title: '' })
  const { orderMcnDetailInfo = {}, dataCurvelist = [], approveReasonAll } = orderReducers
  const { first = {}, second = {}, cancel = {} } = approveReasonAll
  const [isLoading, setIsLoading] = useState(true)
  const searchParam = qs.parse(props.location.search.substring(1))
  useEffect(() => {
    getOrderDetail()
    TPQueryApproveReasonAsync()
  }, [])
  async function TPQueryApproveReasonAsync() {
    await actions.TPQueryApproveReason({
      mcnOrderId: searchParam.id,
    })
  }
  async function getOrderDetail() {
    const { data } = await actions.TPOrderInfo({ mcnOrderId: searchParam.id })
    actions.TPQueryDataCurve({ mcnOrderId: searchParam.id })
    setIsLoading(false)
  }
  const baseInfo = [
    { label: '任务名称', content: orderMcnDetailInfo.orderName },
    { label: '发布平台', content: orderMcnDetailInfo.platformName },
    { label: '图文发布位置', content: orderMcnDetailInfo.locationInfo },

    { label: '任务ID', content: orderMcnDetailInfo.adOrderNumber },
    { label: '订单ID', content: orderMcnDetailInfo.orderNumber },
    { label: '领取时间', content: orderMcnDetailInfo.receiveAt },

    { label: '所属公司', content: orderMcnDetailInfo.companyName },
    { label: '订单状态', content: <div className='red-text'>{orderMcnDetailInfo.orderStateDesc}</div> },
    { label: '预计推送时间', content: orderMcnDetailInfo.expectedPublishedTime },
    { label: '行业分类', content: orderMcnDetailInfo.industryName, span: 2 },
    { label: '阅读单价', content: `${orderMcnDetailInfo.unitPrice}元/阅读` },
    { label: '任务模式', content: <div className='red-text'>{orderMcnDetailInfo.taskPatternDesc}</div>, span: 2 },
    { label: '发布保留时长', content: `${orderMcnDetailInfo.retainTime}小时` },
    { label: '', content: '', span: 2 },
    { label: '申请阅读数', content: <div className='red-text'>{getNumber(orderMcnDetailInfo.expectActionNum)}</div> },

  ]
  const orderInfo = [
    { label: '订单状态', content: orderMcnDetailInfo.orderStateDesc, span: 3 },
    { label: '订单冻结金额', content: `${getNumber(orderMcnDetailInfo.maxAmount)}元`, span: 3 },
    { label: '消耗预算', content: `${getNumber(orderMcnDetailInfo.realAmount)}元`, span: 3 },
    { label: '实际结算', content: `${getNumber(orderMcnDetailInfo.paymentAmount)}元`, span: 3 },
  ]

  function openArticleImg() {
    setModalProps({
      visible: true,
      title: '文章快照',
      content: <div className='article-img'><img src={orderMcnDetailInfo.snapshotUrl} width='400px' height='400px' /></div>
    })
  }
  const articleInfo = [
    { label: '文章快照', content: <a onClick={openArticleImg}>查看</a> },
    { label: '文章链接', content: <a href={orderMcnDetailInfo.contentUrl} target='_blank'>查看</a>, span: 2 },
  ]
  //订单备注
  const approveTypeMap = {
    1: {
      title: '一检不合格原因',
      content: [
        { label: '原因', content: first.approveReason, span: 3 },
      ]
    },
    2: {
      title: '二检不合格原因',
      content: [
        { label: '原因', content: second.approveReason, span: 3 },
        { label: '备注', content: second.remark, span: 3 },
        {
          label: '图片', content: <img src={second.url}
            width="300px" height='300px'
          />, span: 3
        },
      ]
    },
    3: {
      title: '取消结算原因',
      content: [
        { label: '填写理由', content: cancel.approveReason, span: 3 },
        {
          label: '附件/截图', content: <img src={cancel.url}
            alt='附件/截图'
            width="300px" height='300px' />, span: 3
        },
      ]
    }
  }
  //订单备注弹窗
  function showModal(type) {
    const approveType = approveTypeMap[type]
    setModalProps({
      visible: true,
      title: approveType.title,
      content: <Descriptions>
        {approveType.content.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
      </Descriptions>
    })
  }
  return (
    <Spin spinning={isLoading} >
      <div className='order-wechat-detail'>
        <BreadCrumbs link='/order/task/orders-manage/1' text={<h2>订单详情</h2>} />
        <TitleBox title='基本信息' >
          <Descriptions>
            {baseInfo.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
          </Descriptions>
        </TitleBox>
        <TitleBox title='订单状态' >
          <Descriptions>
            {orderInfo.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
          </Descriptions>
        </TitleBox>
        <TitleBox title='博主信息' >
          <Row className='account'>
            <Col span={6}> 博主名称
            <div className='account-name cursor-pointer ' onClick={() => window.open(`/order/task/account-details?accountId=${orderMcnDetailInfo.accountId}`, '_target')}>
                <img src={orderMcnDetailInfo.avatarUrl} alt='博主头像' />
                <a>{orderMcnDetailInfo.snsName}</a>
              </div>
            </Col>
            <Col span={6}>Account ID
              <div className='account-name'>
                {orderMcnDetailInfo.accountId}
              </div>
            </Col>
          </Row>
        </TitleBox>
        <TitleBox title='文章信息' >
          <Descriptions>
            {articleInfo.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
          </Descriptions>
          <ContentRow list={[{ name: '数据曲线：', content: <DataCurve data={dataCurvelist} /> }]} />
        </TitleBox>
        <TitleBox title='订单备注' >
          <Descriptions>
            {first.approveReason ?
              <Descriptions.Item span={3} label='一检不合格原因'>
                <a onClick={() => showModal(1)} >查看</a>
              </Descriptions.Item> : null}
            {second.approveReason ? <Descriptions.Item span={3} label='二检不合格原因'>
              <a onClick={() => showModal(2)} >查看</a>
            </Descriptions.Item>
              : null}
            {cancel.approveReason ? <Descriptions.Item span={3} label='取消结算原因'>
              <a onClick={() => showModal(3)} >查看</a>
            </Descriptions.Item>
              : null}
          </Descriptions>
        </TitleBox>
        <Modal
          visible={modalProps.visible}
          footer={null}
          onCancel={() => setModalProps({ ...modalProps, visible: false })}
          {...modalProps}
        >
          {modalProps.content}
        </Modal>
      </div>
    </Spin>
  )
}
const mapStateToProps = (state) => ({
  orderReducers: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderWechatDetail))
const ContentRow = ({ list = [] }) => {
  return list.map(item => <Row key={item.name} style={{ paddingBottom: 6, color: 'rgba(0, 0, 0, 0.85)', fontSize: 13 }}>
    <Col span={2}>{item.name}</Col>
    <Col span={22}>{item.content}</Col>
  </Row>)
}
