import React, { Component } from 'react';
import { Row } from 'antd';
import SummaryDetailInfo from '../components/summary/Detail';
import InfoTable from '../components/summary/SummaryTable';
import {summaryTotalDetailListFunc} from '../constants/exportOrder/column'



export default class SummaryDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }


  componentWillMount() {}
 
  render() {
    const column = summaryTotalDetailListFunc();
    const dataTable=[{weibo_name:'微播易'}];
    const paginationObj=false
    
    return <div>
    <Row>查看汇总单详情【汇总单名称:】</Row>
     <SummaryDetailInfo/>
    
        <InfoTable
        columns={column}
        dataTable={dataTable}
        paginationObj={paginationObj}
        />
     
    </div>;
  }
}
