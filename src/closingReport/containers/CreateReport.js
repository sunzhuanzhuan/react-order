import React, { Component } from 'react';
import { Steps, Button, message } from 'antd';
import './CreateReport.less';
import SelectOrders from './SelectOrders';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';


const Step = Steps.Step;

const steps = [{
  title: '选择订单',
  content: SelectOrders
}, {
  title: '完善订单数据',
  content: ''
}];

const mapStateToProps = (state) => ({
  common: state.commonReducers,
});
@connect(mapStateToProps, actions)
export default class CreateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const C = steps[current].content;
    const footerWidth = this.props.common.ui.sliderMenuCollapse ? 40 : 200;
    return (
      <div className='closing-report-pages create-page'>
        <header className='create-page-steps'>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </header>
        <main className='create-page-content'>
          <div className='content-statistic'>
            <p>结案数据单信息</p>
            <b>名称</b><span>结案数据单1</span>
            <b>公司简称</b><span><a href="">保洁大品牌公关</a></span>
            <b>所属销售</b><span>保洁</span>
          </div>
          <div className="steps-content">
            <C />
          </div>
        </main>
        <footer className='create-page-action' style={{ width: `calc(100% - ${footerWidth}px)` }}>
          <div className="steps-action">
            {
              current < steps.length - 1
              && <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
              current === steps.length - 1
              &&
              <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            }
            {
              current > 0
              && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )
            }
          </div>
        </footer>
      </div>
    );
  }
}
