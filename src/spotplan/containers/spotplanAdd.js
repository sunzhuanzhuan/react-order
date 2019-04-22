import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../actions";
import BasicInfo from './basicInfo'
import CheckOrder from './checkOrder'
import EditOrder from './editOrder'
import BottomBlock from '../components/bottomBlock'
import { message, Steps, Modal } from 'antd'
import { } from '../constants'
import './spotplan.less'
import qs from 'qs'


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
      orderMaps: {}
    }
    this.basicInfo = React.createRef();
    this.editOrder = React.createRef();
  }
  componentDidMount() {
    document.querySelector('.spotplan-add').style.height = document.documentElement.clientHeight - 100 + 'px';
  }
  queryData = (step, obj, func) => {
    this.setState({ loading: true });
    const hide = message.loading('信息加载中，请稍候...');
    const actionMap = { 1: 'getSpotplanCompanyInfo', 2: 'getSpotplanOrderList', 3: 'getSpotplanEditOrder' };
    const actionName = actionMap[step];
    return this.props.actions[actionName]({ ...obj }).then((res) => {
      if (func && Object.prototype.toString.call(func) === '[object Function]') {
        func(res.data);
      }
      this.setState({ loading: false });
      hide();
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
  handleCheck = (order_id, price_id) => {
    const { orderMaps } = this.state;
    this.setState({
      orderMaps: {
        ...orderMaps,
        [order_id]: price_id
      }
    })
  }
  handlDelCheck = order_id => {
    const { orderMaps } = this.state;
    let obj = { ...orderMaps };
    delete obj[order_id];
    this.setState({ orderMaps: obj });
  }
  handleSteps = (num, type) => {
    const search = qs.parse(this.props.location.search.substring(1));
    if (num == 1) this.props.history.goBack();
    if (num == 2 && type == 'go') {
      this.basicInfo.current.validateFields((err, values) => {
        if (!err) {
          const hide = message.loading('操作中，请稍候...');
          this.props.actions.postAddSpotplan({ ...values, company_id: search.company_id }).then((res) => {
            this.props.history.push(`/order/spotplan/add?step=2&spotplan_id=${res.data.spotplan_id}&company_id=${search.company_id}`);
            hide();
          }).catch(({ errorMsg }) => {
            message.error(errorMsg || '操作失败，请重试！')
          })
        }
      });
    }
    if (num == 2 && type == 'back') {
      this.props.history.push('/order/spotplan/add?step=2&spotplan_id=' + search.spotplan_id);
    }
    if (num == 3) {
      const { orderMaps } = this.state;
      if (!Object.values(orderMaps).length) {
        message.error('请先选择需要加入spotplan的订单!', 3);
        return
      }
      const hide = message.loading('操作中，请稍候...');
      let spotplan_order = [];
      for (let key in orderMaps) {
        spotplan_order.push({ order_id: key, ...orderMaps[key] })
      }
      this.props.actions.postAddSpotplanOrder({ spotplan_id: search.spotplan_id, spotplan_order }).then((res) => {
        const array = res.data.order_ids;
        hide();
        if (array) {
          Modal.confirm({
            title: '',
            content: `如下订单：{${array.toString()}}已被其他Spotplan选择，是否确认从本spotplan中删除这些订单？`,
            onOk: () => {
              const ary = spotplan_order.filter(item => !array.includes(item));
              this.props.actions.postAddSpotplanOrder({ spotplan_order: ary }).then(() => {
                this.setState({ orderMaps: {} });
                this.props.history.push('/order/spotplan/add?step=3&spotplan_id=' + search.spotplan_id);
              })
            }
          })
        } else {
          this.props.history.push('/order/spotplan/add?step=3&spotplan_id=' + search.spotplan_id);
        }
      })

    }
    if (num == 4) {
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
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const step = parseInt(search.step);
    const { orderMaps } = this.state;
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
          {step == 1 && <BasicInfo ref={this.basicInfo} search={search} queryData={this.queryData} data={spotplanCompanyInfo} />}
          {step == 2 && <CheckOrder queryData={this.queryData} handleCheck={this.handleCheck}
            orderMaps={orderMaps} location={this.props.location} history={this.props.history} queryBasicInfo={this.queryBasicInfo} />}
          {step == 3 && <EditOrder ref={this.editOrder} search={search} queryData={this.queryData} data={spotplanEditList['all']} handleUpdate={this.handleUpdate} queryBasicInfo={this.queryBasicInfo} headerData={spotplanPoInfo} />}
        </div>
      </div>
      <BottomBlock current={step} handleSteps={this.handleSteps} orderMaps={orderMaps}
        handlDel={this.handlDelCheck} data={spotplanEditList} search={search} />
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
