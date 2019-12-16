import React from 'react'
import TitleBox from '../base/TitleBox'
import { Steps, Col, Row, Descriptions } from 'antd'
const { Step } = Steps;
function CooperationDetail() {
  const taskConfig = [
    { name: '内容正文', content: '' },
    { name: '图文', content: '' },
    { name: '视频', content: '' },
    { name: '所属公司资质', content: '' },
  ]
  const orderRemark = [
    { name: '媒介驳回原因：', content: '' },
    { name: '内容平台驳回原因：', content: '' },
  ]
  const orderFile = [
    { name: '执行单：', content: '' },
    { name: '结案报告：', content: '' },
  ]
  const baseInfo = [
    { label: '订单ID', content: '' },
    { label: '任务ID', content: '' },
    { label: '投放模式', content: '' },
    { label: '所属公司', content: '' },
    { label: '内容类型', content: '' },
    { label: '阅读单价', content: '' },
    { label: '行业分类', content: '' },
    { label: '出发城市/车站', content: '' },
    { label: '投放条数', content: '' },
    { label: '投放开始日期', content: '' },
    { label: '到达城市/车站', content: '' },
    { label: '任务预算', content: '' },
    { label: '投放结束日期', content: '' },
    { label: '坐席类型', content: '', span: 2 },
    { label: '投放持续时间', content: '' },
    { label: '人群性别', content: '', span: 2 },
    { label: '', content: '' },
    { label: '年龄区间', content: '', span: 2 },
  ]
  return (
    <div>
      <TitleBox title='订单状态' >
        <Steps>
          <Step title="待媒介处理" />
          <Step title="待合作方处理" />
          <Step title="待执行" />
          <Step title="已完成" />
        </Steps>
      </TitleBox>
      <TitleBox title='基本信息' >
        <Descriptions>
          {baseInfo.map(item => <Descriptions.Item key={item.label} label={item.label} span={item.span}>{item.content}</Descriptions.Item>)}
        </Descriptions>
      </TitleBox>
      <TitleBox title='任务内容' >
        <ContentRow list={taskConfig} />
      </TitleBox>
      <TitleBox title='合作平台信息' >
        <Row style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 13 }}>
          <Col span={6}> 合作平台ID：{1}</Col>
          <Col span={6}>合作平台名称：{12306}</Col>
        </Row>
      </TitleBox>
      <TitleBox title='订单文件' >
        <ContentRow list={orderFile} />
      </TitleBox>
      <TitleBox title='结算金额' >
        <ContentRow list={[{ name: '订单结算金额：', content: '' }]} />
      </TitleBox>
      <TitleBox title='订单备注' >
        <ContentRow list={orderRemark} />
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
