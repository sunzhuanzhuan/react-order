import React, { useState, useEffect } from 'react'
import TitleBox from '../base/TitleBox'
import { Steps, Col, Row, Descriptions } from 'antd'
import BreadCrumbs from '../base/BreadCrumbs'
import api from '@/api'
function CooperationDetail() {
  const [orderDetail, setOrderDetail] = useState({ qualifications: [] })
  useEffect(() => {
    getPlatformOrderDetail()
  }, [])
  async function getPlatformOrderDetail() {
    const { data } = await api.post('/operator-gateway/cooperationPlatform/v2/platformOrderDetail', { adOrderId: 1 })
    setOrderDetail(data)
  }
  const taskConfig = [
    { name: '内容正文', content: orderDetail.content },
    { name: '图文', content: <div><img src={orderDetail.imageUrl} /></div> },
    { name: '视频', content: <a href={orderDetail.vedioUrl}>ming</a> },
    { name: '所属公司资质', content: <div>orderDetail.qualifications.map(one)<a></a></div> },
  ]
  const baseInfo = [
    { label: '任务名称', content: '' },
    { label: '发布平台', content: '' },
    { label: '图文发布位置', content: '' },

    { label: '任务ID', content: '' },
    { label: '订单ID', content: '' },
    { label: '领取时间', content: '' },

    { label: '所属公司', content: '' },
    { label: '订单状态', content: '' },
    { label: '预计推送时间', content: '' },
    { label: '行业分类', content: '', span: 2 },
    { label: '阅读单价', content: '' },
    { label: '任务模式', content: '', span: 2 },
    { label: '发布保留时长', content: '', },
    { label: '', content: '', span: 2 },
    { label: '申请阅读数', content: '' },

  ]
  const orderInfo = [
    { label: '订单冻结金额', content: '', span: 3 },
    { label: '消耗预算', content: '', span: 3 },
    { label: '实际结算', content: '', span: 3 },
  ]
  const articleInfo = [
    { label: '文章快照', content: '', span: 3 },
    { label: '文章链接', content: '', span: 3 },
    { label: '数据曲线', content: '', span: 3 },
  ]
  const remark1 = [
    { label: ' 一检不合格原因', content: '', span: 3 },
  ]
  const remark2 = [
    { label: ' 二检不合格原因', content: '', span: 3 },
  ]
  const remark3 = [
    { label: '取消结算原因', content: '', span: 3 },
  ]
  return (
    <div>
      <BreadCrumbs link='/order/task/orders-manage' text={<h2>订单详情</h2>} />
      <TitleBox title='基本信息' >
        <Descriptions>
          {baseInfo.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
        </Descriptions>
      </TitleBox>
      <TitleBox title='订单信息' >
        <Descriptions>
          {orderInfo.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
        </Descriptions>
      </TitleBox>
      <TitleBox title='博主信息' >
        <Row style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 13 }}>
          <Col span={6}> 博主名称{1}</Col>
          <Col span={6}>Account ID{12306}</Col>
        </Row>
      </TitleBox>
      <TitleBox title='文章信息' >
        <Descriptions>
          {articleInfo.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
        </Descriptions>
      </TitleBox>
      <TitleBox title='订单备注' >
        <Descriptions>
          {remark1.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
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

