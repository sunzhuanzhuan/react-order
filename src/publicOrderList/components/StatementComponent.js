/*

*这是调账对账模块-独立模块，对接转转和苏华
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Select, Button } from 'antd';
const Option = Select.Option;
import '../containers/PublicOrderList.less'

class StatementComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //选择平台/代理商
  changePlatformAndAaent = (value) => {
    console.log(value)
  }
  render() {
    return <div className="publicOrderList-chooseBox">
      <ul>
        <li>对账、调账、周期付款批量操作：</li>
        <li>1.选择要对账的平台/代理商进行对账，关联三方对账单，逐条订单进行关联，对有差额的订单进行调账；</li>
        <li>2.对生成的汇总单设置对账完成；</li>
        <li>3.申请周期付款，由财务进行打款操作。</li>
      </ul>
      <div>
        <span>*请选择平台/代理商：</span>
        <Select style={{ width: 120 }} onChange={this.changePlatformAndAaent}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
      <div>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn">批量对账</Button>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn">汇总单列表</Button>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn">申请周期付款</Button>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn">导入三方对账单</Button>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn">三方对账单导入记录</Button>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn">导出订单</Button>
      </div>
    </div>
  }
}

export default StatementComponent

