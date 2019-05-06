import React, { Component } from 'react';
import {  message } from "antd";
import NewUpload from '../trinityReconciliations/components/newUpload';
// import './import.less';
import axios from 'axios'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionsStatement from '../trinityReconciliations/actions/index'

let file_name = ''
class btnUpload extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      

    };
  }
  
  beforeUpload=(res) =>{
   console.log(res)
    if(this.props.agent_id ){
      file_name= res.name;
      return true
    }else{
      message.error('请选择平台代理商');
      return false
    }
    // return new Promise((resolve,reject)=>{
    //   axios.get('/api/finance/statement/import').then((res)=>{
    //     if(res.data.code == 1000){
    //       message.success(res.data.msg);
    //       resolve(true) 
    //     }else{
    //       reject(false)
    //     }
    //   })
    // }) 
  }
  componentWillMount=()=>{
    console.log(this.props)
    
  }
  
  handleChangeOption=(value)=>{
    console.log(value)
    this.props.actions.addOrder({statement_name:file_name,
      attachment:value,agent_id:this.props.agent_id}).then((res)=>{
      if(res.code == 1000){
        message.success('上传成功')
      }else{
        message.error(res.data.msg)
      }
      
    })
   
   
  }
  render() {
    let {uploadText}=this.props;
    return <div>
    
                <NewUpload
                tok={this.props.actions.getToken}
                uploadUrl="/api/common-file/file/v1/uploadPriBucket"
                len={1}
                size={50}
                listType="text"
                uploadText={uploadText||'请上传'}
                onChange={(file, originFile) =>{
                  console.log(file[0].filepath);
                  console.log(originFile);
                  console.log(file);
                  this.handleChangeOption(file[0].filepath)
                }}
                beforeUpload={this.beforeUpload}
                // beforeUpload={()=>this.beforeUpload()}
                accept=".xlsx,.xls"
                btnProps={{
                  type: 'primary'
                }}
                bizzCode="ACCOUNT_STATEMENT_EXCEL_UPLOAD"
              />
    </div>;
  }
}
const mapStateToProps = (state) => {
	return {
    
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actionsStatement }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(btnUpload)
