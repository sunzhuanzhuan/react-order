import React, { useState, useEffect } from 'react'
import TitleBox from '../base/TitleBox'
import { Steps, Col, Row, Descriptions, Divider } from 'antd'
import { getOrderStep, MEDIUM_REJECT, PARTNER_REJECT, deliverySeatMap, deliverySexMap, mediaTypeMap, putTypeMap } from '../constants/orderConfig'
import api from '@/api'
import numeral from 'numeral'
import BreadCrumbs from '../base/BreadCrumbs'

import qs from 'qs'
const { Step } = Steps;
function CooperationDetail() {
  const [orderDetail, setOrderDetail] = useState({ qualifications: [] })
  const searchParams = qs.parse(window.location.search.substring(1))
  const { orderId } = searchParams
  const { qualifications = [], otherOrderState, unitPrice } = orderDetail

  useEffect(() => {
    getPlatformOrderDetail()
  }, [])
  async function getPlatformOrderDetail() {
    const { data } = await api.post('/operator-gateway/cooperationPlatform/v2/platformOrderDetail', { adOrderId: orderId })
    setOrderDetail(data)
  }
  const taskConfig = [
    { name: '内容正文', content: orderDetail.content },
    { name: '图文', content: <div><a href={orderDetail.imageUrl}>{orderDetail.imageName}</a></div> },
    { name: '视频', content: <a href={orderDetail.vedioUrl}>{orderDetail.vedioName}</a> },
    {
      name: '所属公司资质',
      content: <div> {qualifications.map((one, index) => <>
        <a key={one.name} href={one.fileUrl}>{one.fileName}</a>
        {qualifications.length > index + 1 ? <Divider type="vertical" /> : null}
      </>
      )}</div>
    },
  ]

  const orderFile = [
    { name: '执行单：', content: <a href={orderDetail.execOrderUrl}>{orderDetail.execOrderName}</a> },
    { name: '结案报告：', content: <a href={orderDetail.finalReportUrl}>{orderDetail.finalReportName}</a> },
  ]
  const baseInfo = [
    { label: '订单ID', content: orderDetail.adOrderNumber },
    { label: '任务ID', content: orderDetail.adOrderNumber },
    { label: '投放模式', content: putTypeMap[orderDetail.putType] },
    { label: '所属公司', content: orderDetail.companyName },
    { label: '内容类型', content: mediaTypeMap[orderDetail.mediaType] },
    { label: '阅读单价', content: `${unitPrice ? unitPrice + '元/条' : ''}` },
    { label: '行业分类', content: orderDetail.industry },
    { label: '出发城市/车站', content: orderDetail.leavePlace },
    { label: '投放条数', content: <div style={{ color: 'red' }}>{numeral(orderDetail.actionNum).format(',')}条</div> },
    { label: '投放开始日期', content: orderDetail.orderStartDate },
    { label: '到达城市/车站', content: orderDetail.arrivePlace },
    { label: '任务预算', content: <div style={{ color: 'red' }}>{numeral(orderDetail.totalAmount).format(',')}元</div> }]
    .filter(one => one.label != '阅读单价' || orderDetail.putType == 2)
  const putType2 = [
    { label: '投放结束日期', content: orderDetail.orderEndDate, span: 2 },
    { label: '投放持续时间', content: orderDetail.durationDay },
  ]
  const putType1 = [
    { label: '投放结束日期', content: orderDetail.orderEndDate },
    { label: '坐席类型', content: deliverySeatMap[orderDetail.deliverySeat], span: 2 },
    { label: '投放持续时间', content: orderDetail.durationDay },
    { label: '人群性别', content: deliverySexMap[orderDetail.deliverySex], span: 2 },
    { label: '', content: '' },
    { label: '年龄区间', content: orderDetail.deliveryAges, span: 2 },
  ]
  const putTypeInfo = {
    1: putType1,
    2: putType2
  }
  const orderStep = getOrderStep(otherOrderState)
  return (
    <div>
      <BreadCrumbs link='/order/task/orders-manage/2' text={<h2>订单详情</h2>} />
      <TitleBox title='订单进度' >
        <Steps current={orderStep.key}>
          {orderStep.list.map(item => <Step key={item} title={item} />)}
        </Steps>
      </TitleBox>
      <TitleBox title='基本信息' >
        <Descriptions>
          {[...baseInfo, ...putTypeInfo[orderDetail.putType || 1]].map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span} >
            {item.content}
          </Descriptions.Item>)}
        </Descriptions>
      </TitleBox>
      <TitleBox title='任务内容' >
        <ContentRow list={taskConfig} />
      </TitleBox>
      <TitleBox title='合作平台信息' >
        <Row style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 13 }}>
          <Col span={6}> 合作平台ID：{orderDetail.platformId}</Col>
          <Col span={6}>合作平台名称：{}</Col>
        </Row>
      </TitleBox>
      <TitleBox title='订单文件' >
        <ContentRow list={orderFile} />
      </TitleBox>
      <TitleBox title='结算金额' >
        <ContentRow list={[{ name: '订单结算金额：', content: orderDetail.platformSettlementAmount }]} />
      </TitleBox>
      <TitleBox title='订单备注' >
        <Descriptions>
          {otherOrderState == MEDIUM_REJECT ? <Descriptions.Item label='媒介驳回原因' >{orderDetail.refusalReason}</Descriptions.Item> : null}
          {otherOrderState == PARTNER_REJECT ? <Descriptions.Item label='合作平台驳回原因：' >{orderDetail.refusalReason}</Descriptions.Item> : null}
        </Descriptions>
      </TitleBox>
    </div>
  )
}

export default CooperationDetail
const ContentRow = ({ list = [] }) => {
  return list.map(item => <Row key={item.name} style={{ paddingBottom: 6, color: 'rgba(0, 0, 0, 0.85)', fontSize: 13 }}>
    <Col span={4}>{item.name}</Col>
    <Col span={12}>{item.content}</Col>
  </Row>)
}
