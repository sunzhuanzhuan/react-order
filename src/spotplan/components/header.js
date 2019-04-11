import React from 'react'
import { Row, Col } from 'antd'
import './header.less'
export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return <>
      <h3>Spotplan基本信息</h3>
      <div className='info-container'>
        <Row className='info-row'>
          <Col span={2}>SpotplanID:</Col><Col span={2}>120</Col>
          <Col span={2}>Spotplan名称:</Col><Col span={10}>Pampers Ichiban diaper Double.11 Grass­seeding KOL</Col>
        </Row>
        <Row className='info-row'>
          <Col span={2}>创建人:</Col><Col span={2}>蔡逸琦</Col>
          <Col span={2}>所属项目/品牌:</Col><Col span={10}>一级帮diaper-12月  / pampers</Col>
        </Row>
      </div>
    </>
  }
}
