


import React from 'react'
import { message ,Form,Input,Button} from 'antd'
import api from '../../api/index'
//弹窗表单验证
export default Form.create()( class extends React.Component {
  state={
    btnValidate:false,
    reslutBtn:false,
    validateMessage:false
  }
  handleCheckPo=()=>{
    // this.setState({btnValidate:true})
  }
  //校验按钮是否存在
  handleChangeValue=(e)=>{
    if(e.target.value != ''){
      this.setState({btnValidate:true})
    }else{
      this.setState({btnValidate:false})
    }
  } 
  handleCheckPo=()=>{
    api.get("/operator-gateway/trinityPlatform/v1/getCooperationPlatform")
    .then((response) => {
      let data = response.data
      if(response.code == 200){
        this.setState({
          validateMessage:true,
          reslutBtn:true
        })
      }else{
        this.setState({
          validateMessage:false,
          reslutBtn:true
        })
      }
      
    })
    .catch((error) => {
      message.error("校验获取失败")
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return<Form>
    <Form.Item label="PO单号">
      {getFieldDecorator('po', {
        rules: [{ max: 50, message: 'PO名称不能超过50个字符' }],
      })(
        <Input style={{width:'400px'}} onChange={this.handleChangeValue}/>
      )}
        {this.state.btnValidate? <Button style={{ marginLeft: '10px' }}  type="primary" onClick={this.handleCheckPo}>校验</Button>:null}
        {this.state.reslutBtn?this.state.validateMessage?<div>
         <span style={{ marginRight: '10px' }}>PO总额:￥1245.00 </span>
         <a target="_blank" href={`http://192.168.100.142/sale/executionevidence/detail?id=${this.state.id}`}>查看PO详情</a>
       </div>:<div style={{color:'red'}}>未在系统匹配到该公司存在该PO单号，请重新输入后再次检验</div>:null}
    </Form.Item>
    </Form>
  }
})
