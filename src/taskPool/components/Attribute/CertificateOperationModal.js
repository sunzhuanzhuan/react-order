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

// 验证资质名函数 防抖处理
const debouncedCheckName = debounce((cb) => cb(), 800)

const formItemLayout = {
  labelCol: { span: 4, },
  wrapperCol: { span: 19 },
  colon: false
}
const CertificateAddForm = (props) => {
  const [ loading, setLoading ] = useState()


  // 判断资质名是否存在
  const asyncValidateNameRepeat = (rule, value, callback) => {
    debouncedCheckName(() => {
      props.actions.TPCheckQualification({ qualificationName: value }).then(({ data }) => {
        if (!data) {
          callback("资质名称已经存在，请重新输入")
        } else {
          callback()
        }
      }).catch(() => {
        callback("请求错误, 校验失败")
      })
    })
  }

  // 提交
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true)
        props.actions.TPAddQualification(values)
          .then(() => {
            message.success("添加成功!")
            setLoading(false)
            props.onClose && props.onClose
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
    title: '新增资质'
  }
  return (
    <Modal {...mProps} okButtonProps={{ loading }} onOk={handleSubmit} onCancel={props.onClose}>
      <Form {...formItemLayout} colon={false}>
        <Form.Item label="资质名称">
          {getFieldDecorator('qualificationName', {
            validateFirst: true,
            rules: [
              { required: true, message: '请填写评论数' },
              { validator: asyncValidateNameRepeat }
            ]
          })(
            <Input placeholder="请输入" />
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
const WrappedCertificateAddForm = Form.create()(CertificateAddForm)

const CertificateUpdateForm = (props) => {
  const [ loading, setLoading ] = useState()


  // 判断资质名是否存在
  const asyncValidateNameRepeat = (rule, value, callback) => {
    debouncedCheckName(() => {
      props.actions.TPCheckQualification({ qualificationName: value }).then(({ data }) => {
        if (!data) {
          callback("资质名称已经存在，请重新输入")
        } else {
          callback()
        }
      }).catch(() => {
        callback("请求错误, 校验失败")
      })
    })
  }

  // 提交
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        setLoading(true)
        props.actions.TPAddQualification(values)
          .then(() => {
            message.success("添加成功!")
            setLoading(false)
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
    title: '新增资质'
  }
  return (
    <Modal {...mProps} okButtonProps={{ loading }} onOk={handleSubmit} onCancel={props.onClose}>
      <Form {...formItemLayout} colon={false}>
        <Form.Item label="资质名称">
          {getFieldDecorator('qualificationName', {
            validateFirst: true,
            rules: [
              { required: true, message: '请填写评论数' },
              { validator: asyncValidateNameRepeat }
            ]
          })(
            <Input placeholder="请输入" />
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
const WrappedCertificateUpdateForm = Form.create()(CertificateUpdateForm)


const CertificateOperationModal = (props) => {
  return (
    <>
      {props.type === "add" && <WrappedCertificateAddForm {...props} />}
      {props.type === "update" && <WrappedCertificateUpdateForm {...props} />}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(CertificateOperationModal);
