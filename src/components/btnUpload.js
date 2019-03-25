import React, { Component } from 'react';
import {  message } from "antd";
import NewUpload from '../trinityReconciliations/components/newUpload';
// import './import.less';
import axios from 'axios'



export default class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      

    };
  }
  
  beforeUpload=() =>{
    return new Promise((resolve,reject)=>{
      axios.get('/api/finance/statement/import').then((res)=>{
        if(res.data.code == 1000){
          message.success(res.data.msg);
          resolve(true) 
        }else{
          reject(false)
        }
      })
    }) 
  }
  
  
  render() {
    let {getToken}  =this.props;  
    return <div>
    
                <NewUpload
                tok={getToken}
                uploadUrl="/api/common-file/file/v1/uploadPriBucket"
                len={1}
                size={50}
                listType="text"
                uploadText="请选择要上传的三方对账单"
                onChange={(file, originFile) =>{
                  console.log(file[0].filepath);
                  console.log(originFile);
                  console.log(file);
                  // this.handleChangeOption(file[0].filepath)
                }}
                beforeUpload={()=>this.beforeUpload()}
                accept=".xlsx,.xls"
                btnProps={{
                  type: 'primary'
                }}
                bizzCode="ACCOUNT_STATEMENT_EXCEL_UPLOAD"
              />
    </div>;
  }
}

