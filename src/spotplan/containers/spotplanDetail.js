import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import { Breadcrumb, Row, Col, Button, Icon, Tabs, Checkbox, Modal, message } from 'antd'
import { DetailTableFunc } from '../constants'
import DetailQuery from '../components/spotplanDetail/detailQuery'
import DetailTable from '../components/spotplanDetail/detailTable'
import HistoryModal from '../components/spotplanDetail/historyModal'
import EditOrderModal from '../components/spotplanDetail/editOrderModal'
import ChangeModal from '../components/spotplanDetail/changeNumberModal'
import QuitModal from '../components/spotplanDetail/quitOrderModal'
import UpdateModal from '../components/spotplanDetail/updateModal'
import AddModal from '../components/spotplanDetail/addOrderModal'
import './spotplan.less'
import qs from 'qs'
import numeral from 'numeral'
import FormPO from '../components/poCheck'

const TabPane = Tabs.TabPane;
const tabPaneList = [
  {
    title: '全部',
    type: 'all',
    key: '1'
  },
  {
    title: '待确认合作',
    type: '1',
    key: '2'
  },
  {
    title: '已确认合作',
    type: '2',
    key: '3'
  },
  {
    title: '终止合作申请中',
    type: '3',
    key: '4'
  },
  {
    title: '已终止合作',
    type: '4',
    key: '5'
  },
]
class SpotPlanDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      historyVisible: false,
      editVisible: false,
      changeVisible: false,
      quitVisible: false,
      updateVisible: false,
      addVisible: false,
      type: 'all',
      order_id: undefined,
      selectedRowKeys: [],
      rows: {},
      record: undefined,
      editPo: false,
      editValue: ''
    }
  }
  componentDidMount() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { getSpotplanPoInfo, getSpotplanAmount, getSpotplanPlatform, getSpotplanExecutor } = this.props.actions;
    getSpotplanPoInfo({ spotplan_id: search.spotplan_id }).then((res) => {
      this.setState({ customer_po_code: res.data.customer_po_code || '-' })
    });
    getSpotplanAmount({ spotplan_id: search.spotplan_id });
    getSpotplanPlatform();
    getSpotplanExecutor();
    this.queryData({ spotplan_id: search.spotplan_id, ...search.keys });
    this.queryData({ type: 1, spotplan_id: search.spotplan_id, ...search.keys });
    this.queryData({ type: 2, spotplan_id: search.spotplan_id, ...search.keys });
    this.queryData({ type: 3, spotplan_id: search.spotplan_id, ...search.keys });
    this.queryData({ type: 4, spotplan_id: search.spotplan_id, ...search.keys });
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
      this.queryData({ ...search.keys, spotplan_id: search.spotplan_id, type: value - 1, page: 1 });
      this.setState({ type: (value - 1).toString(), rows: {}, selectedRowKeys: [] });
      return
    }
    this.queryData({ ...search.keys, spotplan_id: search.spotplan_id, page: 1 });
    this.setState({ type: 'all', rows: {}, selectedRowKeys: [] });
  }
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    let rows = selectedRows.reduce((data, current) => {
      return { ...data, [current.order_id]: current }
    }, {});
    rows = Object.assign(this.state.rows, rows)
    this.setState({ selectedRowKeys, rows });
  }
  handleCheckAll = (e) => {
    const { rows, type } = this.state;
    const { spotplanEditList } = this.props;
    const list = spotplanEditList[type] && spotplanEditList[type].list && spotplanEditList[type].list.reduce((data, current) => {
      const flag = ([12, 21, 25, 31].includes(parseInt(current.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(current.last_apply_status))) ? true : false;
      return flag ? [...data, current] : data
    }, []) || [];
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
  handleHistory = (e, record) => {
    const search = qs.parse(this.props.location.search.substring(1));
    if (record) {
      this.setState({ historyVisible: true, record: [record] });
    } else {
      this.props.actions.getUpdateSpotplanOrderLog({ spotplan_id: search.spotplan_id }).then(() => {
        this.setState({ historyVisible: true });
      })
    }

  }
  //新增账号
  handleAddNumber = ({ order_id }) => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getUpdateSpotplanOrder({ spotplan_id: search.spotplan_id, order_id }).then(() => {
      this.setState({ order_id, addVisible: true });
    })

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
  //批量新增账号
  handleAddAccount = order_id => {
    const search = qs.parse(this.props.location.search.substring(1));
    this.props.actions.getBasicSpotplanOrderInfo({ spotplan_id: search.spotplan_id, order_id }).then(() => {
      this.setState({ order_id, addVisible: true });
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
  handleUpdate = obj => {
    const search = qs.parse(this.props.location.search.substring(1));
    return this.props.actions.getServiceRateAmount({ spotplan_id: search.spotplan_id, ...obj })
  }
  handleDelete = order_id => {
    const search = qs.parse(this.props.location.search.substring(1));
    Modal.confirm({
      title: '',
      content: '是否确认将该订单从本spotplan删除？',
      onOk: () => {
        this.props.actions.postDeleteSpotplanOrder({ spotplan_id: search.spotplan_id, order_id }).then(() => {
          message.success('操作成功');
          this.queryData({ ...search.keys, spotplan_id: search.spotplan_id });
        })
      }
    })
  }
  handleClose = () => {
    const search = qs.parse(this.props.location.search.substring(1));
    return this.queryData({ spotplan_id: search.spotplan_id, ...search.keys });
  }
  handleSubmit = (obj) => {
    const hide = message.loading('操作中，请稍候...');
    const search = qs.parse(this.props.location.search.substring(1));
    let { order_id } = this.state;
    order_id = Array.isArray(order_id) ? order_id : [order_id];
    return this.props.actions.postChangeNumberSpotplanOrder({ spotplan_id: search.spotplan_id, order_ids: order_id, ...obj }).then((res) => {
      hide();
      if (res.data) {
        const type = res.data.type;
        const amount = res.data.amount;
        let content;
        if (type) {
          content = type == 1 ? obj.type == 1 ? '存在已经被他人优先发起了更新申请的订单，请刷新后重新选择' : '该订单的更新申请已被他人优先发起了，请刷新后查看' : type == 2 ? '存在状态不为【客户待确认】的替换订单，请刷新后重新选择' : null;
        }
        if (amount) {
          content = <ErrorTip data={res.data.amount} />
        }
        Modal.error({
          title: '错误提示',
          width: 640,
          content: content,
          maskClosable: false,
          okText: '确定',
          onOk: (close) => {
            this.queryData({ ...search.keys, spotplan_id: search.spotplan_id });
            this.props.actions.getSpotplanPoInfo({ spotplan_id: search.spotplan_id });
            close();
          }
        })
      } else {
        this.queryData({ ...search.keys, spotplan_id: search.spotplan_id });
        this.props.actions.getSpotplanPoInfo({ spotplan_id: search.spotplan_id });
      }
    })
  }
  handleSettleChange = () => {
    const { selectedRowKeys, rows } = this.state;
    if (selectedRowKeys.length == 0) {
      message.error('请先勾选需要进行换号申请的订单', 3);
      return
    }
    const flag = Object.values(rows).every(item => item.change == 1);
    // const flag = Object.values(rows).every(item => [12, 21, 25, 31].includes(parseInt(item.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(item.last_apply_status)));
    if (!flag) {
      Modal.error({
        title: '错误提示',
        content: <div>你选择的订单中存在订单状态不为<span style={{ color: 'red' }}>【客户已确认、执行中、执行终止、终止合作申请中】</span>的订单，请先取消勾选再进行批量换号申请。</div>
      });
      return;
    }
    this.handleChangeNumber(selectedRowKeys)
  }
  handleSettleQuit = () => {
    const { selectedRowKeys, rows } = this.state;
    if (selectedRowKeys.length == 0) {
      message.error('请先勾选需要进行申请终止合作的订单', 3);
      return
    }
    const flag = Object.values(rows).every(item => item.spotAndUpdate == 1);
    // const flag = Object.values(rows).every(item => [12, 21, 25, 31].includes(parseInt(item.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(item.last_apply_status)));
    if (!flag) {
      Modal.error({
        title: '错误提示',
        content: <div>你选择的订单中存在订单状态不为<span style={{ color: 'red' }}>【客户已确认、执行中、执行终止、终止合作申请中】</span>的订单，请先取消勾选再进行批量申请终止合作。</div>
      });
      return;
    }
    this.handleQuitOrder(selectedRowKeys);
  }
  handleSettleAddAccount = () => {
    const { selectedRowKeys, rows } = this.state;
    if (selectedRowKeys.length == 0) {
      message.error('请先勾选需要进行批量申请新增账号的订单', 3);
      return
    }
    const flag = Object.values(rows).every(item => item.added == 1);
    if (!flag) {
      Modal.error({
        title: '错误提示',
        content: <div>你选择的订单中存在不能发起【新增账号申请】的订单，请重新选择。</div>
      });
      return;
    }
    this.handleAddAccount(selectedRowKeys)
  }
  handleSettleDeleteOrder = () => {

    const search = qs.parse(this.props.location.search.substring(1));
    const { selectedRowKeys, rows } = this.state;
    if (selectedRowKeys.length == 0) {
      message.error('请先勾选需要进行批量删除订单的订单', 3);
      return
    }
    const flag = Object.values(rows).every(item => item.is_inward_send == 2)
    // const flag = Object.values(rows).every(item => [12, 21, 25, 31].includes(parseInt(item.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(item.last_apply_status)));
    if (!flag) {
      Modal.error({
        title: '错误提示',
        content: <div>你选择的订单中存在不能发起删除的订单，请重新选择。</div>
      });
      return;
    }
    Modal.confirm({
      title: '',
      content: '是否确认删除选中的订单？',
      onOk: () => {
        this.props.actions.postDeleteSpotplanOrder({ spotplan_id: search.spotplan_id, order_id: selectedRowKeys }).then(() => {
          message.success('操作成功');
          this.queryData({ ...search.keys, spotplan_id: search.spotplan_id });
        })
      }
    })
  }

  //切换PO的类型
  handleChangeType = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {

    const search = qs.parse(this.props.location.search.substring(1));
    this.formRef.props.form.validateFields((err, values) => {
      if (err) {
        return;
      } else {
        if (values.po_id) {
          if (!this.formRef.state.reslutBtn || !this.formRef.state.isEdit) {
            message.error('为确保填写的PO单号真实存在，请先点击【检验】，再进入“下一步”');
            this.setState({
              visible: true,
            });
            return
          } else {
            if (!this.formRef.state.validateMessage) {
              message.error('未在系统匹配到你填写的PO单号，请重新填写')
              this.setState({
                visible: true,
              });
              return
            }
            values.po_id = this.formRef.state.data.id;
          }
          const hide = message.loading('操作中，请稍候...');
          this.setState({
            visible: false,
          });

          this.props.actions.postUpdateSpotplan({ ...values, spotplan_id: search.spotplan_id }).then(() => {
            this.queryData({ spotplan_id: search.spotplan_id, ...search.keys });
            this.props.actions.getSpotplanPoInfo({ spotplan_id: search.spotplan_id }).then((res) => {
              this.setState({ customer_po_code: res.data.customer_po_code || '-' })
            });
            hide();
          }).catch(({ errorMsg }) => {
            message.error(errorMsg || '操作失败，请重试！')
          })
        }
      }

    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { historyVisible, editVisible, changeVisible, quitVisible, updateVisible, selectedRowKeys, type, loading, record, addVisible, rows } = this.state;
    const { spotplanExecutor, spotplanPlatform, spotplanPoInfo, spotplanAmount, spotplanEditList, basicSpotplanOrderInfo, updateSpotplanOrder: { before_order = [], after_order = [] }, updateSpotplanOrderLog, serviceRateAmount } = this.props;
    const list = spotplanEditList[type] && spotplanEditList[type].list || [];
    const checkList = list.reduce((data, current) => {
      const flag = ([12, 21, 25, 31].includes(parseInt(current.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(current.last_apply_status))) ? true : false;
      return flag ? [...data, current] : data
    }, []);
    const checked = checkList.every(item => selectedRowKeys.includes(item.order_id.toString()));
    const DetailTableCols = DetailTableFunc(this.handleChangeNumber, this.handleQuitOrder, this.handleUpdateOrder, this.handleEditOrder, this.handleDelete, this.handleHistory, this.handleAddNumber);
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.handleSelectChange,
      // getCheckboxProps: record => {
      //   const flag = ([12, 21, 25, 31].includes(parseInt(record.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      //   return !flag ? { disabled: true } : {}
      // },
    };
    let tatalAmount = Object.values(rows).reduce((pre, current) => {
      return (pre * 100 + current.costwithfee * 100) / 100
    }, 0);
    return <div className='spotList-detail-container'>
      <NavBar />
      <h2>Spotplan详情页</h2>
      <div>
        <h3 className='top-gap' style={{ display: 'inline-block' }}>Spotplan基本信息</h3>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <Button type='primary' onClick={() => {
            this.props.history.push(`/order/spotplan/add?step=2&spotplan_id=${search.spotplan_id}&noback=true`);
          }}>+新增订单</Button>
          <Button type='primary' className='left-gap' href={`/api/spotplan/exportSpotplamExcel?spotplan_id=${search.spotplan_id}`} onClick={() => {
            message.loading('导出数据中，请稍候...', 3);
          }}>导出为Excel</Button>
        </div>
      </div>
      <BasicInfo data={spotplanPoInfo}
        handleClick={this.handleHistory}
        handleChangeType={this.handleChangeType}
      />
      <h3 className='top-gap'>订单列表</h3>
      <Statistics data={spotplanAmount} flag={(spotplanPoInfo && spotplanPoInfo.customer_po_amount) ? true : false} />
      <DetailQuery location={this.props.location} history={this.props.history}
        queryData={this.queryData}
        spotplan_executor={spotplanExecutor}
        spotplan_platform={spotplanPlatform}
      />
      <Tabs onChange={this.handleTabsChange} type="card">
        {tabPaneList.map(item => (<TabPane tab={`${item.title}（${spotplanEditList[item.type] && spotplanEditList[item.type].total || 0}）`} key={item.key} forceRender={true}>
          <DetailTable loading={loading} columns={DetailTableCols} dataSource={list} rowSelection={rowSelection}
            type={item.type}
            queryData={this.queryData}
            options={{
              total: spotplanEditList[item.type] && spotplanEditList[item.type].total || 0,
              page: spotplanEditList[item.type] && spotplanEditList[item.type].page || 0,
              pageSize: spotplanEditList[item.type] && spotplanEditList[item.type].pageSize || 0,
            }} />
        </TabPane>))}
      </Tabs>
      <div className='top-gap'>
        <h4 style={{ padding: '10px 0' }}>勾选订单数量<span style={{ color: 'red', padding: '0 10px' }}>{Object.values(rows).length}个</span>
          Costwithfee<span style={{ color: 'red', padding: '0 10px' }}>{numeral(tatalAmount).format('0,0.00')}元</span></h4>
        <Checkbox onChange={this.handleCheckAll} disabled={checkList.length == 0} checked={checkList.length > 0 && checked}>全选</Checkbox>
        <Button type='primary' onClick={this.handleSettleChange}>批量申请换号</Button>
        <Button className='left-gap' type='primary' onClick={this.handleSettleQuit}>批量申请终止合作</Button>
        <Button type='primary' className='left-gap' onClick={this.handleSettleAddAccount}>批量申请新增账号</Button>
        <Button type='primary' className='left-gap' onClick={this.handleSettleDeleteOrder}>批量删除订单</Button>

      </div>

      {historyVisible && <HistoryModal visible={historyVisible}
        onCancel={() => { this.setState({ record: undefined, historyVisible: false }) }}
        dataSource={record || updateSpotplanOrderLog}
      />}
      {editVisible && <EditOrderModal visible={editVisible}
        spotplan_id={search.spotplan_id}
        data={basicSpotplanOrderInfo}
        onCancel={() => { this.setState({ editVisible: false }) }}
        handleClose={this.handleClose}
      />}
      {changeVisible && <ChangeModal visible={changeVisible}
        onCancel={() => { this.setState({ changeVisible: false }) }}
        handleSubmit={this.handleSubmit}
        before_order={before_order}
        after_order={after_order}
        handleClose={this.handleClose}
      />}
      {quitVisible && <QuitModal visible={quitVisible}
        onCancel={() => { this.setState({ quitVisible: false }) }}
        handleSubmit={this.handleSubmit}
        dataSource={basicSpotplanOrderInfo}
        handleClose={this.handleClose}
      />}
      {updateVisible && <UpdateModal visible={updateVisible}
        onCancel={() => {
          this.props.actions.restServiceRateAmount();
          this.setState({ updateVisible: false });
        }}
        handleSubmit={this.handleSubmit}
        dataSource={basicSpotplanOrderInfo}
        handleClose={this.handleClose}
        handleUpdate={this.handleUpdate}
        serviceRateAmount={serviceRateAmount}
      />}
      {addVisible && <AddModal visible={addVisible}
        onCancel={() => {
          this.setState({ addVisible: false });
        }}
        handleSubmit={this.handleSubmit}
        before_order={before_order}
        after_order={after_order}
        handleClose={this.handleClose}
      />}
      {/* 编辑PO单弹出弹窗 */}
      {this.state.visible ? <Modal
        title="编辑PO单号"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormPO wrappedComponentRef={this.saveFormRef} spInfo={spotplanPoInfo} />
      </Modal> : null}
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
    updateSpotplanOrderLog: state.spotplanReducers.updateSpotplanOrderLog,
    serviceRateAmount: state.spotplanReducers.serviceRateAmount,
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


function BasicInfo({ data, handleClick, handleChangeType }) {
  return <div className='info-container top-gap'>
    <Row className='info-row'>
      <Col span={3}>SpotplanID:</Col><Col span={6}>{data && data.spotplan_id}</Col>
      <Col span={3}>Spotplan名称:</Col><Col span={9}>{data && data.spotplan_name}</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>创建人:</Col><Col span={6}>{data && data.creator_name}</Col>
      <Col span={3}>所属项目/品牌:</Col><Col span={9}><a target='_blank' href={data && data.project_path}>{data && data.project_name}</a> / {data && data.brand_name || '-'}</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>创建时间:</Col><Col span={6}>{data && data.created_at}</Col>
      <Col span={3}>更新时间:</Col><Col span={9}>{data && data.updated_at}</Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>PO单号:</Col>
      <Col span={6}>
        {(data && data.customer_po_code) ?
          <a target='_blank' href={data && data.po_path}>{data.customer_po_code}</a> : '-'}
        <Button style={{ marginLeft: '10px' }} type="primary" onClick={handleChangeType}>编辑</Button>
      </Col>
      <Col span={3}>发起更新申请次数:</Col>
      <Col span={9}>{data && data.apply_num || 0}<a style={{ marginLeft: '40px' }} href='javascript:;' onClick={handleClick}>查看历史更新申请记录</a></Col>
    </Row>
    <Row className='info-row'>
      <Col span={3}>PO总额（不含税）:</Col><Col span={6}>{data && data.customer_po_amount ? data.customer_po_amount + '元' : '-'}</Col>
      <Col span={3}>PO总额（含税）:</Col><Col span={9}>{data && data.total_budget ? data.total_budget + '元' : '-'}</Col>
    </Row>
  </div>
}

function Statistics({ data, flag }) {
  return <div className='spotplan-detail-statistics'>
    <Row className='info-row'>

      <Col style={{ display: 'inline-block', width: 212, marginLeft: '10px' }}>Costwithfee
     123
      </Col>


    </Row>
  </div>
}

function ErrorTip({ data }) {
  return <div>
    <div>本次申请成功提交之后，<span style={{ fontWeight: 600 }}>预计消耗PO金额（不含税）为<span style={{ color: 'red' }}>{numeral(data.poAmountSum).format('0,0')} 元</span></span></div>
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={4}></Col>
        <Col span={6}><span style={{ color: 'rgba(0,0,0,0.3)' }}>已确认订单</span></Col>
        <Col span={6}><span style={{ color: 'rgba(0,0,0,0.3)' }}>本次申请终止订单</span></Col>
        <Col span={6}><span style={{ color: 'rgba(0,0,0,0.3)' }}>本次申请替换订单</span></Col>
      </Row>
      <Row gutter={16}>
        <Col span={4}></Col>
        <Col span={6}><span style={{ color: 'rgba(0,0,0,0.3)' }}>Costwithfee</span></Col>
        <Col span={6}><span style={{ color: 'rgba(0,0,0,0.3)' }}>Costwithfee</span></Col>
        <Col span={6}><span style={{ color: 'rgba(0,0,0,0.3)' }}>Costwithfee</span></Col>
      </Row>
      <Row gutter={16} style={{ lineHeight: '36px' }}>
        <Col span={4}><span style={{ fontSize: '24px', fontWeight: 600 }}>等于</span></Col>
        <Col span={5}>{numeral(data.confirm).format('0,0') || 0} 元</Col>
        <Col span={1}>-</Col>
        <Col span={5}>{numeral(data.termination).format('0,0') || 0} 元</Col>
        <Col span={1}>+</Col>
        <Col span={6}>{numeral(data.replace).format('0,0') || 0} 元</Col>
      </Row>
    </div>
    <div style={{ color: 'red', lineHeight: '24px' }}>超出了本spotplan对应的PO总额（不含税）：{numeral(data.customer_po_amount).format('0,0') || 0} 元</div>
    <div style={{ lineHeight: '24px' }}>请调整订单之后，重新提交，确保金额不超PO</div>
  </div>
}
