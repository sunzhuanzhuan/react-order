import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import { Breadcrumb, Row, Col, Button, Tooltip, Icon, Tabs, Checkbox, Modal, message } from 'antd'
import { DetailTableFunc } from '../constants'
import DetailQuery from '../components/spotplanDetail/detailQuery'
import DetailTable from '../components/spotplanDetail/detailTable'
import HistoryModal from '../components/spotplanDetail/historyModal'
import EditOrderModal from '../components/spotplanDetail/editOrderModal'
import ChangeModal from '../components/spotplanDetail/changeNumberModal'
import QuitModal from '../components/spotplanDetail/quitOrderModal'
import UpdateModal from '../components/spotplanDetail/updateModal'
import './spotplan.less'
import qs from 'qs'

const TabPane = Tabs.TabPane;
class SpotPlanDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      historyVisible: false,
      editVisible: false,
      changeVisible: false,
      quitVisible: false,
      updateVisible: false,
      type: 'all',
      order_id: undefined,
      selectedRowKeys: [],
      rows: {}
    }
  }
  componentDidMount() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { getSpotplanPoInfo, getSpotplanAmount, getSpotplanPlatform, getSpotplanExecutor } = this.props.actions;
    getSpotplanPoInfo({ spotplan_id: search.spotplan_id });
    getSpotplanAmount({ spotplan_id: search.spotplan_id });
    getSpotplanPlatform();
    getSpotplanExecutor();
    this.queryData({ spotplan_id: search.spotplan_id, ...search.keys });
  }
  queryData = (obj, func) => {
    this.setState({ loading: true });
    return this.props.actions.getSpotplanEditOrder({ ...obj }).then((res) => {
      if (func && Object.prototype.toString.call(func) === '[object Function]') {
        func(res.data);
      }
      this.setState({ loading: false });
    }).catch(({ errorMsg }) => {
      this.setState({ loading: false });
      message.error(errorMsg || '获取接口数据出错！');
    })
  }
  handleTabsChange = value => {
    const search = qs.parse(this.props.location.search.substring(1));
    if (value - 1) {
      this.queryData({ ...search.keys, spotplan_id: search.spotplan_id, type: value - 1 });
      this.setState({ type: value - 1 });
      return
    }
    this.queryData({ ...search.keys, spotplan_id: search.spotplan_id });
    this.setState({ type: 'all' });
  }
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const rows = selectedRows.reduce((data, current) => {
      return { ...data, [current.order_id]: current }
    }, {});
    this.setState({ selectedRowKeys, rows });
  }
  handleCheckAll = (e) => {
    const { rows } = this.state;
    const { spotplanEditList: { list = [] } } = this.props;
    if (e.target.checked) {
      const obj = list.reduce((data, current) => {
        return { ...data, [current.order_id]: current }
      }, { ...rows });
      this.handleSelectChange(Object.keys(obj), Object.values(obj));
    } else {
      const obj = { ...rows };
      list.forEach(item => delete obj[item.order_id]);
      this.handleSelectChange(Object.keys(obj), Object.values(obj));
    }
  }
  handleChangeNumber = order_id => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getUpdateSpotplanOrder({ spotplan_id: search.spotplan_id, order_id }).then(() => {
      this.setState({ order_id, changeVisible: true });
    })
  }
  handleQuitOrder = order_id => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getBasicSpotplanOrderInfo({ spotplan_id: search.spotplan_id, order_id }).then(() => {
      this.setState({ order_id, quitVisible: true });
    })
  }
  handleUpdateOrder = order_id => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getBasicSpotplanOrderInfo({ spotplan_id: search.spotplan_id, order_id }).then(() => {
      this.setState({ order_id, updateVisible: true });
    })
  }
  handleEditOrder = order_id => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getBasicSpotplanOrderInfo({ spotplan_id: search.spotplan_id, order_id }).then(() => {
      this.setState({ order_id, editVisible: true });
    })
  }
  handleDelete = order_id => {
    const search = qs.parse(this.props.location.search.substring(1));
    Modal.confirm({
      title: '',
      content: '是否确认将该订单从本spotplan删除？',
      onOk: () => {
        console.log('delete');
      }
    })
  }
  handleSubmit = (obj) => {
    const search = qs.parse(this.props.location.search.substring(1));
    const { order_id } = this.state;
    return this.props.actions.postChangeNumberSpotplanOrder({ spotplan_id: search.spotplan_id, order_ids: order_id, ...obj }).then(() => {
      this.queryData({ ...search.keys, spotplan_id: search.spotplan_id });
    })
  }
  handleSettleChange = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length == 0) {
      message.error('请先勾选需要进行换号申请的订单', 3);
      return
    }
    this.setState({ changeVisible: true });
  }
  handleSettleQuit = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length == 0) {
      message.error('请先勾选需要进行申请终止合作的订单', 3);
      return
    }
    this.setState({ quitVisible: true })
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { historyVisible, editVisible, changeVisible, quitVisible, updateVisible, selectedRowKeys } = this.state;
    const { spotplanExecutor, spotplanPlatform, spotplanPoInfo, spotplanAmount, spotplanEditList: { list = [] }, basicSpotplanOrderInfo, updateSpotplanOrder: { before_order = [], after_order = [] } } = this.props;
    const checked = list.every(item => selectedRowKeys.includes(item.order_id.toString()));
    const DetailTableCols = DetailTableFunc(this.handleChangeNumber, this.handleQuitOrder, this.handleUpdateOrder, this.handleEditOrder, this.handleDelete);
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.handleSelectChange,
    };
    return <div className='spotList-detail-container'>
      <NavBar />
      <h2>Spotplan详情页</h2>
      <div>
        <h3 className='top-gap' style={{ display: 'inline-block' }}>Spotplan基本信息</h3>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <Button type='primary' href={`/order/spotplan/add?step=2&&spotplan_id=${search.spotplan_id}`}>+新增订单</Button>
          <Button type='primary' className='left-gap'>导出为Excel</Button>
        </div>
      </div>
      <BasicInfo data={spotplanPoInfo} handleClick={() => { this.setState({ historyVisible: true }) }} />
      <h3 className='top-gap'>订单列表</h3>
      <Statistics data={spotplanAmount} />
      <DetailQuery location={this.props.location} history={this.props.history}
        queryData={this.queryData}
        spotplan_executor={spotplanExecutor}
        spotplan_platform={spotplanPlatform}
      />
      <Tabs onChange={this.handleTabsChange} type="card">
        <TabPane tab="全部（13）" key="1"><DetailTable columns={DetailTableCols} dataSource={list} rowSelection={rowSelection} /></TabPane>
        <TabPane tab="待确认合作（11）" key="2"><DetailTable columns={DetailTableCols} dataSource={list} rowSelection={rowSelection} /></TabPane>
        <TabPane tab="已确认合作（2）" key="3"><DetailTable columns={DetailTableCols} dataSource={list} rowSelection={rowSelection} /></TabPane>
        <TabPane tab="终止合作申请中（2）" key="4"><DetailTable columns={DetailTableCols} dataSource={list} rowSelection={rowSelection} /></TabPane>
        <TabPane tab="已终止合作（2）" key="5"><DetailTable columns={DetailTableCols} dataSource={list} rowSelection={rowSelection} /></TabPane>
      </Tabs>
      <div className='top-gap'>
        <Checkbox onChange={this.handleCheckAll} checked={checked}>全选</Checkbox>
        <Button type='primary' onClick={this.handleSettleChange}>批量申请换号</Button>
        <Button className='left-gap' type='primary' onClick={this.handleSettleQuit}>批量申请终止合作</Button>
      </div>

      {historyVisible && <HistoryModal visible={historyVisible}
        onCancel={() => { this.setState({ historyVisible: false }) }} />}
      {editVisible && <EditOrderModal visible={editVisible}
        data={basicSpotplanOrderInfo}
        onCancel={() => { this.setState({ editVisible: false }) }}
      />}
      {changeVisible && <ChangeModal visible={changeVisible}
        onCancel={() => { this.setState({ changeVisible: false }) }}
        handleSubmit={this.handleSubmit}
        before_order={before_order}
        after_order={after_order}
      />}
      {quitVisible && <QuitModal visible={quitVisible}
        onCancel={() => { this.setState({ quitVisible: false }) }}
        handleSubmit={this.handleSubmit}
        dataSource={basicSpotplanOrderInfo}
      />}
      {updateVisible && <UpdateModal visible={updateVisible}
        onCancel={() => { this.setState({ updateVisible: false }) }}
        handleSubmit={this.handleSubmit}
        dataSource={basicSpotplanOrderInfo}
      />}
    </div>
  }
}
const mapStateToProps = (state) => {
  return {
    spotplanExecutor: state.spotplanReducers.spotplanExecutor,
    spotplanPlatform: state.spotplanReducers.spotplanPlatform,
    spotplanPoInfo: state.spotplanReducers.spotplanPoInfo,
    spotplanAmount: state.spotplanReducers.spotplanAmount,
    basicSpotplanOrderInfo: state.spotplanReducers.basicSpotplanOrderInfo,
    spotplanEditList: state.spotplanReducers.spotplanEditList,
    updateSpotplanOrder: state.spotplanReducers.updateSpotplanOrder,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...spotplanAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotPlanDetail)

function NavBar() {
  return <Breadcrumb>
    <Breadcrumb.Item><a href="javascript:;">Spotplan管理</a></Breadcrumb.Item>
    <Breadcrumb.Item><a href="/order/spotplan/list">Spotplan列表</a></Breadcrumb.Item>
    <Breadcrumb.Item><a href="">Spotplan详情页</a></Breadcrumb.Item>
  </Breadcrumb>
}
function BasicInfo({ data, handleClick }) {
  return <div className='info-container top-gap'>
    <Row className='info-row'>
      <Col span={3}>SpotplanID:</Col><Col span={4}>{data && data.spotplan_id}</Col>
      <Col span={3}>Spotplan名称:</Col><Col span={12}>{data && data.spotplan_name}</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>创建人:</Col><Col span={4}>{data && data.creator_name}</Col>
      <Col span={3}>所属项目/品牌:</Col><Col span={12}>{data && data.project_name} / {data && data.brand_name || '-'}</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>创建时间:</Col><Col span={4}>{data && data.created_at}</Col>
      <Col span={3}>更新时间:</Col><Col span={12}>{data && data.updated_at}</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>PO单号:</Col><Col span={4}>{data && data.customer_po_code}</Col>
      <Col span={3}>发起更新申请次数:</Col><Col span={12}>{data && data.customer_po_amount}<a style={{ marginLeft: '40px' }} href='javascript:;' onClick={handleClick}>查看历史更新申请记录</a></Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>PO总额（不含税）:</Col><Col span={4}>{data && data.total_budget} 元</Col>
      <Col span={3}>PO总额（含税）:</Col><Col span={12}>{data && data.total_budget} 元</Col>
    </Row>
  </div>
}

function Statistics({ data }) {
  return <div className='spotplan-detail-statistics'>
    <Row className='info-row'>
      <Col span={4}>
        {data.flag == 2 ? <Tooltip
          overlayClassName='statistics-tip'
          defaultVisible={true}
          getPopupContainer={() => document.querySelector('.spotplan-detail-statistics')}
          title={'金额已超PO总额（不含税）'}>预计消耗PO金额（不含税）</Tooltip> : '预计消耗PO金额（不含税）'}
      </Col>
      <Col span={4}>Costwithfee（已确认合作订单）
      <Tooltip title={'已确认合作订单：客户确认使的订单，终止合作申请已被审核通过的订单除外'}><Icon type="question-circle" /></Tooltip>
      </Col>
      <Col span={4}>Costwithfee（待确认合作订单）
        <Tooltip title={'待确认合作订单：客户待确认状态的订单'}><Icon type="question-circle" /></Tooltip>
      </Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}><span className='primary-font'>{data & data.amount} 元</span></Col>
      <Col span={1}>=</Col>
      <Col span={3}><span className='primary-font'>{data & data.confirmCostwithfee} 元</span></Col>
      <Col span={1}>+</Col>
      <Col span={4}><span className='primary-font'>{data & data.toBeconfirmCostwithfee} 元</span></Col>
    </Row>
  </div>
}
