import React, { Component } from 'react';
import { Button } from 'antd';



export default class Test extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
    };
  }


  componentWillMount() {}

  render() {
   

    return <div>
      <Button type="primary">导出订单</Button>
      <Button type="primary">导入三方对账单</Button>
      <Button type="primary">导入汇总结果</Button>
      <Button type="primary">申请周期付款</Button>
      <Button type="primary">汇总单列表</Button>
      <Button type="primary">三方对账单列表</Button>
    </div>;
  }
}
