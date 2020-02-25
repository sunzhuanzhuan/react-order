/**
 * Created by lzb on 2020-01-09.
 */
import React, { Component, useState } from 'react';
import { DatePicker, Form, Input, InputNumber, message, Modal } from 'antd';
import debounce from 'lodash/debounce'
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';

const formItemLayout = {
  labelCol: { span: 4, },
  wrapperCol: { span: 19 },
  colon: false
}
const IndustryAddForm = (props) => {
  const [ loading, setLoading ] = useState()


  // 提交
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true)
        const body = {
          industryLevel: 1,
          industryName: values.industryName,
          remark: values.remark,
          businessScopeList: [],
          qualificationsGroupList: []
        }
        props.actions.TPAddOrUpdateIndustryInfo(body)
          .then(() => {
            message.success("添加成功!")
            setLoading(false)
            props.onOk && props.onOk(values)
            props.onClose && props.onClose()
          })
          .catch(() => {
            setLoading(false)
          })
      }
    });
  };

  const { getFieldDecorator } = props.form

  const mProps = {
    visible: true,
    title: '新增一级行业'
  }
  return (
    <Modal {...mProps} okButtonProps={{ loading }} onOk={handleSubmit} onCancel={props.onClose}>
      <Form {...formItemLayout} colon={false}>
        <Form.Item label="行业名称">
          {getFieldDecorator(`industryName`,
            {
              rules: [ { required: true, message: '行业名称不能为空' } ]
            })(
            <Input placeholder='请输入行业名称' />
          )}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('remark', {
            rules: []
          })(
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              placeholder="请输入"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
const WrappedIndustryAddForm = Form.create()(IndustryAddForm)

const IndustryUpdateForm = (props) => {
  const [ loading, setLoading ] = useState()

  // 提交
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true)
        const body = {
          id: props.record.id,
          industryLevel: 1,
          industryName: values.industryName,
          remark: values.remark,
          businessScopeList: [],
          qualificationsGroupList: []
        }
        props.actions.TPAddOrUpdateIndustryInfo(body)
          .then(() => {
            message.success("修改成功!")
            setLoading(false)
            props.onOk && props.onOk(values)
            props.onClose && props.onClose()
          })
          .catch(() => {
            setLoading(false)
          })
      }
    });
  };

  const { getFieldDecorator } = props.form

  const mProps = {
    visible: true,
    title: '编辑一级行业'
  }
  return (
    <Modal {...mProps} okButtonProps={{ loading }} onOk={handleSubmit} onCancel={props.onClose}>
      <Form {...formItemLayout} colon={false}>
        <Form.Item label="资质名称">
          {getFieldDecorator(`industryName`,
            {
              initialValue: props.record.industryName,
              rules: [ { required: true, message: '行业名称不能为空' } ]
            })(
            <Input placeholder='请输入行业名称' />
          )}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('remark', {
            initialValue: props.record.remark,
            rules: []
          })(
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 5 }}
              placeholder="请输入"
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
const WrappedIndustryUpdateForm = Form.create()(IndustryUpdateForm)


const IndustryOperationModal = (props) => {
  console.log(props, '____');

  return (
    <>
      {props.type === "add" && <WrappedIndustryAddForm {...props} />}
      {props.type === "update" && <WrappedIndustryUpdateForm {...props} />}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(IndustryOperationModal);
