import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { Outline, BaseInfo, ExecutionLink, ExecutionPic, ExecutionData } from '../components/dataDetails';
import './DataDetailsModal.less';
import { Against, Agree } from '../base/ApprovalStatus';


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
@Form.create()
export default class DataDetailsModal extends Component {
  componentWillMount() {}

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const reason = <Against reason={'这里显示审核诶通过原因，显示不下用截断，鼠标HOVER弹出tips'} />;
    const props = {
      formItemLayout: formItemLayout, form: this.props.form, reason: reason
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return <Modal
      title={<h2>平台数据详情
        <small>订单ID：1234556</small>
      </h2>}
      wrapClassName="closing-report-modal-pages"
      visible
      width={800}
      onOk={this.submit}
      onCancel={this.handleCancel}
    >
      <Form onSubmit={this.submit}>
        {/*<Form.Item className='outline-form-item' style={{ marginBottom: '10px' }}>
          {getFieldDecorator('username', {
            initialValue: 'name',
            rules: [{ required: true, message: '必填!' }]
          })(<Outline.Edit />)}
        </Form.Item>*/}
        <Outline.View/>
        {/*<BaseInfo.Edit  {...props} />*/}
        {/*<BaseInfo.View><Agree /></BaseInfo.View>
        <ExecutionLink.Edit {...props} />
        <ExecutionLink.View><Agree top={10}/></ExecutionLink.View>
        <ExecutionPic.Edit  {...props} />
        <ExecutionPic.View><Agree/></ExecutionPic.View>*/}
        <ExecutionData.Edit  {...props}/>
      </Form>
    </Modal>;
  }
}
