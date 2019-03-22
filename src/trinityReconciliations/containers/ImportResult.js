import React, { Component } from 'react';
import { Row } from 'antd';
import ImportResult from '../components/Import/Import'
import  * as actionsImport from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


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
    console.log(this.props.actions)
    return <div>
     <Row>导出汇总结果</Row>
    <ImportResult
    getToken={this.props.actions.getToken}
    addOrder={this.props.actions.addOrder}
    importSummary={this.props.actions.importSummary}
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
