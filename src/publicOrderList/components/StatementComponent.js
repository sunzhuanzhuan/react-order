/*

*这是调账对账模块-独立模块，对接转转和苏华
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Select, Button, message } from 'antd';
import api from '../../api/index'
import qs from 'qs'
import BtnUpload from '../../components/btnUpload'
import {
	withRouter,
} from "react-router-dom";
const Option = Select.Option;
import '../containers/PublicOrderList.less'

class StatementComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ageent_id:null
    }
  }
  componentWillMount() {
    api.get("/operator-gateway/trinityPlatform/v1/getCooperationPlatform")
      .then((response) => {
        let data = response.data
        this.setState({
          data: [{ id: 0, cooperationPlatformName: "请选择" }, ...data]
        })
      })
      .catch((error) => {
        message.error("平台/代理商信息获取失败")
      });
  }
  //选择平台/代理商
  changePlatformAndAaent = (value) => {
    console.log(value);
    this.setState({
      agent_id:value
    })
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
        <Select style={{ width: 200 }}
          defaultValue={0}
          onChange={this.changePlatformAndAaent}>
          {
            this.state.data.map(item => {
              return <Option key={item.id} value={item.id}>{item.cooperationPlatformName}</Option>
            })
          }
        </Select>
      </div>
      <div>
      <Button type="primary" className="publicOrderList-chooseBox-operateBtn" onClick={()=>{
        if(this.state.agent_id){
          this.props.history.push({
            pathname: '/order/trinity/reconciliations/exportOrder',
            search: `?${qs.stringify({ 
              agent_id:this.state.agent_id})}`,
          });
        }else{
          message.error("请选择平台/代理商信息")
        }
            
        }}>导出订单</Button>
        <div style={{display:'inline-block'}} className="publicOrderList-chooseBox-operateBtn">
          <BtnUpload
            uploadText={'导入三方对账单'}
          />
        </div>
        
        {/* <Button type="primary" className="publicOrderList-chooseBox-operateBtn" onClick={()=>{
          if(this.state.agent_id){
            this.props.history.push({
              pathname: '/order/trinity/reconciliations/',
              search: `?${qs.stringify({ 
                agent_id:this.state.agent_id})}`,
            });
          }else{
            message.error("请选择平台/代理商信息")
          }
           
        }}>导入三方对账单</Button> */}
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn" onClick={()=>{
          if(this.state.agent_id){
            this.props.history.push({
              pathname: '/order/trinity/reconciliations/importResult',
              search: `?${qs.stringify({ 
                agent_id:this.state.agent_id})}`,
            });
          }else{
            message.error("请选择平台/代理商信息")
          }
            
        }}>导入汇总结果</Button>
       
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn" onClick={()=>{
          if(this.state.agent_id){
            this.props.history.push({
              pathname: '/order/trinity/reconciliations/payment',
              search: `?${qs.stringify({ 
                agent_id:this.state.agent_id})}`,
            });
          }else{
            message.error("请选择平台/代理商信息")
          }
            
        }}>申请周期付款</Button>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn" onClick={()=>{
          if(this.state.agent_id){
            this.props.history.push({
              pathname: '/order/trinity/reconciliations/summary',
              search: `?${qs.stringify({ 
                agent_id:this.state.agent_id})}`,
            });
          }else{
            message.error("请选择平台/代理商信息")
          }
           
        }}>汇总单列表</Button>
        <Button type="primary" className="publicOrderList-chooseBox-operateBtn" onClick={()=>{
          if(this.state.agent_id){
            this.props.history.push({
              pathname: '/order/trinity/reconciliations/statement',
              search: `?${qs.stringify({ 
                agent_id:this.state.agent_id})}`,
            });
          }else{
            message.error("请选择平台/代理商信息")
          }
           
        }}>三方对账单列表</Button>
       
      </div>
    </div>
  }
}

export default withRouter(StatementComponent)

