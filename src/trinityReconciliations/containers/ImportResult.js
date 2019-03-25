import React, { Component } from 'react';
import { Row } from 'antd';
import ImportResult from '../components/Import/Import'
import  * as actionsImport from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import qs from 'qs'
import './payment.less';

class ImportOrder extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
    };
  }


  componentWillMount=()=> {
    // this.props.actions.getToken()
  }
  handleSuccessFile=()=>{
    
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    return <div>
     <Row className='title'>导入汇总结果</Row>
     <div className='agent'>收款平台/代理商:<span className="agent_name">{search.agent}</span></div>
    <ImportResult
    history= {this.props.history}
    getToken={this.props.actions.getToken}
    addOrder={this.props.actions.addOrder}
    importSummary={this.props.actions.importSummary}
    search={search}
    />
    </div>;
  }
}
const mapStateToProps = (state) => {
	return {
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actionsImport }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportOrder)
