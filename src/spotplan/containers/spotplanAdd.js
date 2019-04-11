import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// import * as trinityPayAction from "../actions";
import BasicInfo from './basicInfo'
import CheckOrder from './checkOrder'
import EditOrder from './editOrder'
import BottomBlock from '../components/bottomBlock'
import { Table, message, Button, Steps } from 'antd'
import { } from '../constants'
import './spotplan.less'


const Step = Steps.Step;
const steps = [{
  title: '填写Spotplan基本信息'
}, {
  title: '勾选加入Spotplan的订单'
}, {
  title: '编辑并提交Spotplan'
}];

export default class SpotplanAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 2
    }
  }
  componentDidMount() {
    document.querySelector('.spotplan-add').style.height = document.documentElement.clientHeight - 100 + 'px';
  }
  handleSteps = (num) => {
    this.setState({ current: num })
  }
  render() {
    const { current } = this.state;
    return <>
      <div className='spotplan-add'>
        <h2>创建Spotplan</h2>
        <div className='steps-container'>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </div>
        <div className='spotplan-add-container'>
          {current == 0 && <BasicInfo handleSteps={this.handleSteps} />}
          {current == 1 && <CheckOrder handleSteps={this.handleSteps} />}
          {current == 2 && <EditOrder handleSteps={this.handleSteps} />}
        </div>

      </div>
      <BottomBlock current={current} handleSteps={this.handleSteps} />
    </>
  }
}
