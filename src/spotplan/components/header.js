import React from 'react'
import { Row, Col } from 'antd'
import './header.less'
export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const { data } = this.props;
    return <>
      <h3>Spotplan基本信息</h3>
      <div className='info-container'>
        <Row className='info-row'>
          <Col span={2}>SpotplanID:</Col><Col span={2}>{data && data.spotplan_id}</Col>
          <Col span={2}>Spotplan名称:</Col><Col span={10}>{data && data.spotplan_name}</Col>
        </Row>
        <Row className='info-row'>
          <Col span={2}>创建人:</Col><Col span={2}>{data && data.creator_name}</Col>
          <Col span={2}>所属项目/品牌:</Col><Col span={10}>{data && data.project_name} / {data && data.brand_name || '-'}</Col>
        </Row>
      </div>
    </>
  }
}
