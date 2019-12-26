/**
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';
import CertificateGroupsList from '../components/Attribute/CertificateGroupsList';
import BusinessScopesList from '../components/Attribute/BusinessScopesList';


const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  labelAlign: "left",
  colon: false
}


// 创建二级行业
const CreateAttribute = (props) => {
  const { getFieldDecorator } = props.form
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  return (
    <>
      <h3>添加二级行业</h3>
      <Form {...formLayout} className='task-pool-page-container create-attribute-page' onSubmit={handleSubmit}>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;一级行业名称</span>}>
          安师大收到
        </Form.Item>
        <Form.Item label="二级行业名称">
          {
            getFieldDecorator(`name`,
              {
                initialValue: [],
                rules: [ { required: true, message: '行业名称不能为空' } ]
              })(
              <Input placeholder='请输入行业名称' />
            )
          }
        </Form.Item>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;所需资质</span>}>
          <CertificateGroupsList
            form={props.form}
            search={props.actions.TPQueryQualificationByName}
            fieldPrefix="qualificationsGroupList"
          />
        </Form.Item>
        <Form.Item label={<span>&nbsp;&nbsp;&nbsp;经营内容</span>}>
          <BusinessScopesList
            form={props.form}
            search={props.actions.TPQueryQualificationByName}
            fieldPrefix="businessScopeList"
          />
        </Form.Item>
        <Form.Item label=' '>
          <Button type="primary" htmlType="submit">确定</Button>
        </Form.Item>
      </Form>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CreateAttribute));
