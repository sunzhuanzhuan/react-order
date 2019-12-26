/**
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';


const Attributes = (props) => {

  return (
    <div>
      asdas
    </div>
  );
};


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Attributes));
