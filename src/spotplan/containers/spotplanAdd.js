import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import BasicInfo from './basicInfo'
import CheckOrder from './checkOrder'
import EditOrder from './editOrder'
import BottomBlock from '../components/bottomBlock'
import { message, Steps, Modal, Button } from 'antd'
import './spotplan.less'
import qs from 'qs'
import api from '../../api/index'


const Step = Steps.Step;
const steps = [{
  title: '填写Spotplan基本信息'
}, {
  title: '勾选加入Spotplan的订单'
}, {
  title: '编辑并提交Spotplan'
}];

class SpotplanAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      orderMaps: {},
      loading: false,
      visible: false
    }
    this.basicInfo = React.createRef();
    this.editOrder = React.createRef();
  }
  componentDidMount() {
    document.querySelector('.spotplan-add').style.height = document.documentElement.clientHeight - 100 + 'px';
  }
  queryData = (step, obj, func) => {
    this.setState({ loading: true });
    const actionMap = { 1: 'getSpotplanCompanyInfo', 2: 'getSpotplanOrderList', 3: 'getSpotplanEditOrder' };
    const actionName = actionMap[step];
    const _this = this;
    function after() {
      // let timer = setTimeout(() => {
      return _this.props.actions[actionName]({ ...obj }).then((res) => {
        if (func && Object.prototype.toString.call(func) === '[object Function]') {
          func(res.data);
        }
        _this.setState({ loading: false });
        // clearTimeout(timer);
      }).catch(({ errorMsg }) => {
        _this.setState({ loading: false });
        message.error(errorMsg || '获取接口数据出错！');
        // clearTimeout(timer);
      })
      // }, 5000)
    }
    return step == 3 ? after() : this.props.actions[actionName]({ ...obj }).then((res) => {
      if (func && Object.prototype.toString.call(func) === '[object Function]') {
        func(res.data);
      }
      this.setState({ loading: false });
    }).catch(({ errorMsg }) => {
      this.setState({ loading: false });
      message.error(errorMsg || '获取接口数据出错！');
    })
  }
  queryBasicInfo = () => {
    const search = qs.parse(this.props.location.search.substring(1));
    return this.props.actions.getSpotplanPoInfo({ spotplan_id: search.spotplan_id });
  }
  handleUpdate = obj => {
    const search = qs.parse(this.props.location.search.substring(1));
    return this.props.actions.postUpdateSpotplanOrder({ spotplan_id: search.spotplan_id, ...obj }).then(() => {
      message.success('更新完成！', 1);
    })
  }
  handleCheck = (type, order_id, item) => {
    const { orderMaps } = this.state;
    let obj = { ...orderMaps };
    if (type == 1) {
      //勾选
      obj[order_id] = item;
    }
    if (type == 2) {
      //取消勾选
      delete obj[order_id];
    }
    this.setState({ orderMaps: obj })
  }
  handleSettleDelCheck = order_ids => {
    const { orderMaps } = this.state;
    let obj = { ...orderMaps };
    order_ids.forEach(item => {
      delete obj[item]
    })
    this.setState({ orderMaps: obj })
  }
  handleDelete = obj => {
    return this.props.actions.postDeleteSpotplanOrder({ ...obj })
  }
  handleSteps = (num, type) => {
    const search = qs.parse(this.props.location.search.substring(1));
    if (num == 1) this.props.history.goBack();
    if (num == 2 && type == 'go') {
      this.basicInfo.current.validateFields((err, values) => {
        if (!err) {
          if (values.po_id) {
            if (!this.form.state.reslutBtn || !this.form.state.isEdit) {
              this.setState({
                visible: true,
              });
              return
            } else {
              if (!this.form.state.validateMessage) {
                this.setState({
                  visible: true,
                });
                return
              }
            }
            values.po_id = this.form.state.data.id;
          }

          const hide = message.loading('操作中，请稍候...');
          this.props.actions.postAddSpotplan({ ...values, company_id: search.company_id }).then((res) => {
            this.props.history.push(`/order/spotplan/add?step=2&spotplan_id=${res.data.spotplan_id}`);
            hide();
          }).catch(({ errorMsg }) => {
            message.error(errorMsg || '操作失败，请重试！')
          })
        }
      });
    }
    if (num == 2 && type == 'back') {
      const url = search.noback ? `/order/spotplan/add?step=2&spotplan_id=${search.spotplan_id}&noback=true` : `/order/spotplan/add?step=2&spotplan_id=${search.spotplan_id}`;
      this.props.history.push(url);
    }
    if (num == 3) {
      const { orderMaps } = this.state;
      if (!Object.values(orderMaps).length) {
        this.setState({ orderMaps: {} }, () => {
          if (search.noback) {
            this.props.history.push(`/order/spotplan/add?step=3&spotplan_id=${search.spotplan_id}&noback=true`);
          } else {
            this.props.history.push('/order/spotplan/add?step=3&spotplan_id=' + search.spotplan_id);
          }
        })
        return
      }
      const hide = message.loading('操作中，请稍候...');
      let spotplan_order = [];
      for (let key in orderMaps) {
        spotplan_order.push({ order_id: key, ...orderMaps[key] })
      }
      this.props.actions.postAddSpotplanOrder({ spotplan_id: search.spotplan_id, spotplan_order }).then((res) => {
        const array = res.data.order_ids;
        const type = res.data.type;
        hide();
        if (array) {
          const content = type == 1 ? `如下订单：{${array.toString()}}已被其他Spotplan选择，是否确认从本spotplan中删除这些订单？` : `如下订单：{${array.toString()}}状态不是客户待确认，不能添加到本spotplan，是否确认从本spotplan中删除这些订单？`;
          Modal.confirm({
            title: '',
            content: content,
            onOk: (close) => {
              this.handleSettleDelCheck(array);
              close();
            }
          })
        } else {
          this.setState({ orderMaps: {} }, () => {
            this.props.history.push('/order/spotplan/add?step=3&spotplan_id=' + search.spotplan_id);
          })
        }
      })

    }
    if (num == 4) {
      if (!this.props.spotplanEditList['all'].total) {
        message.error('请先选择需要加入spotplan的订单', 3);
        return
      }
      if (type && type == 'submit') {
        this.editOrder.current.validateFields((err) => {
          if (!err) {
            this.props.history.push('/order/spotplan/detail?spotplan_id=' + search.spotplan_id);
          }
        })
      } else {
        this.props.history.push('/order/spotplan/detail?spotplan_id=' + search.spotplan_id);
      }
    }
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const step = parseInt(search.step);
    const { orderMaps, loading } = this.state;
    const { spotplanCompanyInfo, spotplanEditList, spotplanPoInfo } = this.props;
    return <>
      <div className='spotplan-add'>
        <h2>创建Spotplan</h2>
        <div className='steps-container'>
          <Steps current={step - 1}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </div>
        <div className='spotplan-add-container'>
          {step == 1 && <BasicInfo ref={this.basicInfo} search={search} queryData={this.queryData} data={spotplanCompanyInfo} wrappedComponentRef={(form) => this.form = form} />}
          {step == 2 && <CheckOrder queryData={this.queryData} handleCheck={this.handleCheck}
            orderMaps={orderMaps} location={this.props.location} history={this.props.history} queryBasicInfo={this.queryBasicInfo} loading={loading} />}
          {step == 3 && <EditOrder ref={this.editOrder} search={search} queryData={this.queryData} data={spotplanEditList['all']} handleUpdate={this.handleUpdate} queryBasicInfo={this.queryBasicInfo} headerData={spotplanPoInfo} loading={loading} handleDelete={this.handleDelete} />}
        </div>
      </div>
      <BottomBlock current={step} handleSteps={this.handleSteps} orderMaps={orderMaps}
        handlDel={this.handleCheck} data={spotplanEditList} search={search} />
      {this.state.visible ? <Modal
        title="提示信息"
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={
          <Button onClick={this.handleCancel}>关闭</Button>
        }
      >
        {
          !this.form.state.reslutBtn || !this.form.state.isEdit ? <p>为确保填写的PO单号真实存在，请先点击【校验】，再进入“下一步”</p> : null
        }
        {
          this.form.state.reslutBtn && !this.form.state.validateMessage ? <p>未在系统匹配到你填写的PO单号，请重新填写</p> : null
        }
      </Modal> : null}
    </>
  }
}
const mapStateToProps = (state) => {
  return {
    spotplanCompanyInfo: state.spotplanReducers.spotplanCompanyInfo,
    spotplanEditList: state.spotplanReducers.spotplanEditList,
    spotplanPoInfo: state.spotplanReducers.spotplanPoInfo,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...spotplanAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotplanAdd)
