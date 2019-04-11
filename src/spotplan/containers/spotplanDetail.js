import React from 'react'
import { Breadcrumb, Table, Row, Col, Button, Modal, Tooltip, Icon, Tabs, Checkbox } from 'antd'
import DetailQuery from '../components/detailQuery'
import DetailTable from '../components/detailTable'
import { HisttoryCols } from '../constants'
import './spotplan.less'

const TabPane = Tabs.TabPane;
export default class SpotPlanDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      historyVisible: false
    }
  }
  handleTabsChange = (e) => {
    console.log('%ce: ', 'color: MidnightBlue; background: Aquamarine; font-size: 20px;', e);

  }
  handleCheckAll = () => {
    console.log('check all');
  }
  render() {
    const { historyVisible } = this.state;
    return <div className='spotList-detail-container'>
      <Breadcrumb>
        <Breadcrumb.Item><a href="javascript:;">Spotplan管理</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/order/spotplan/list">Spotplan列表</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="">Spotplan详情页</a></Breadcrumb.Item>
      </Breadcrumb>
      <h2>Spotplan详情页</h2>
      <div>
        <h3 className='top-gap' style={{ display: 'inline-block' }}>Spotplan基本信息</h3>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <Button type='primary'>+新增订单</Button>
          <Button type='primary' className='left-gap'>导出为Excel</Button>
        </div>
      </div>
      <BasicInfo handleClick={() => { this.setState({ historyVisible: true }) }} />
      <h3 className='top-gap'>订单列表</h3>
      <Statistics />
      <DetailQuery />
      <Tabs onChange={this.handleTabsChange} type="card">
        <TabPane tab="全部（13）" key="1"><DetailTable /></TabPane>
        <TabPane tab="待确认合作（11）" key="2"><DetailTable /></TabPane>
        <TabPane tab="已确认合作（2）" key="3"><DetailTable /></TabPane>
        <TabPane tab="终止合作申请中（2）" key="4"><DetailTable /></TabPane>
        <TabPane tab="已终止合作（2）" key="5"><DetailTable /></TabPane>
      </Tabs>
      <div className='top-gap'>
        <Checkbox onChange={this.handleCheckAll}>全选</Checkbox>
        <Button type='primary'>批量申请换号</Button>
        <Button className='left-gap' type='primary'>批量申请终止合作</Button>
      </div>

      {historyVisible && <HistoryModal visible={historyVisible} onCancel={
        () => { this.setState({ historyVisible: false }) }} />}
    </div>
  }
}


function BasicInfo({ handleClick }) {
  return <div className='info-container top-gap'>
    <Row className='info-row'>
      <Col span={3}>SpotplanID:</Col><Col span={4}>120</Col>
      <Col span={3}>Spotplan名称:</Col><Col span={12}>Pampers Ichiban diaper Double.11 Grass­seeding KOL</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>创建人:</Col><Col span={4}>蔡逸琦</Col>
      <Col span={3}>所属项目/品牌:</Col><Col span={12}>一级帮diaper-12月  / pampers</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>创建时间:</Col><Col span={4}>2019-03-30 00:00</Col>
      <Col span={3}>更新时间:</Col><Col span={12}>2019-03-30 00:00</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>PO单号:</Col><Col span={4}>8910283849</Col>
      <Col span={3}>发起更新申请次数:</Col><Col span={12}>10<a style={{ marginLeft: '40px' }} href='javascript:;' onClick={handleClick}>查看历史更新申请记录</a></Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>PO总额（不含税）:</Col><Col span={4}>8,889,098.00 元</Col>
      <Col span={3}>PO总额（含税）:</Col><Col span={12}>8,889,098.00 元</Col>
    </Row>
  </div>
}

function Statistics() {
  return <div className='spotplan-detail-statistics'>
    <Row className='info-row'>
      <Col span={4}>
        <Tooltip
          overlayClassName='statistics-tip'
          defaultVisible={true}
          getPopupContainer={() => document.querySelector('.spotplan-detail-statistics')}
          title={'金额已超PO总额（不含税）'}>预计消耗PO金额（不含税）</Tooltip>
      </Col>
      <Col span={4}>Costwithfee（已确认合作订单）
      <Tooltip title={'已确认合作订单：客户确认使的订单，终止合作申请已被审核通过的订单除外'}><Icon type="question-circle" /></Tooltip>
      </Col>
      <Col span={4}>Costwithfee（待确认合作订单）
        <Tooltip title={'待确认合作订单：客户待确认状态的订单'}><Icon type="question-circle" /></Tooltip>
      </Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}><span className='primary-font'>1,000,332.00 元</span></Col>
      <Col span={1}>=</Col>
      <Col span={3}><span className='primary-font'>999,096.00 元</span></Col>
      <Col span={1}>+</Col>
      <Col span={4}><span className='primary-font'>1,236.00 元</span></Col>
    </Row>
  </div>
}

function HistoryModal({ visible, onCancel }) {
  return <Modal
    wrapClassName='history-modal'
    key='historyModal'
    width={700}
    title='查看历史更新申请记录'
    visible={visible}
    maskClosable={false}
    onCancel={onCancel}
    footer={
      [
        <Button key="back" type='primary' onClick={onCancel}>确认</Button>,
      ]}
  >
    <Table border columns={HisttoryCols} />
  </Modal>
}
