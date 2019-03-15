import React, { Component } from 'react';
import { Row ,message} from 'antd';
import ImportResult from '../components/Import/Import'


export default class ImportOrder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
    };
  }


  componentWillMount() {}
  handleSuccessFile=()=>{
    
  }
  render() {

    return <div>
     <Row>导出汇总结果</Row>
    <ImportResult/>
    </div>;
  }
}
