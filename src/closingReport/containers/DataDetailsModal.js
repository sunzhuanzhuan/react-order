import React, { Component } from 'react';
import { Modal, Form, Icon, Button } from 'antd';
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
    // console.log(this.props.form.getFieldsValue(),'=====');
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
    const title = <h2 className='data-details-header'>平台数据详情
      <small>订单ID：1234556</small>
    </h2>
    const footer = <div className='data-details-footer'>
      <Icon type="exclamation-circle" />
      <span>说明: 若勾选无法提供该数据，则。。。。。。</span>
      <Button>保存</Button>
      <Button type='primary'>保存并提交</Button>
    </div>
    return <Modal
      centered
      title={title}
      wrapClassName="closing-report-modal-pages data-details"
      visible
      width={800}
      footer={footer}
    >
      <Form onSubmit={this.submit}>
        {/*<Form.Item className='outline-form-item' style={{ marginBottom: '10px' }}>
          {getFieldDecorator('username', {
            initialValue: 'name',
            rules: [{ required: true, message: '必填!' }]
          })(<Outline.Edit />)}
        </Form.Item>*/}
        <Outline.View/>
        <BaseInfo.Edit  {...props} />
        <BaseInfo.View><Agree /></BaseInfo.View>
        <ExecutionLink.Edit {...props} />
        <ExecutionLink.View><Agree top={10}/></ExecutionLink.View>
        <ExecutionPic.Edit  {...props} />
        <ExecutionPic.View><Agree/></ExecutionPic.View>
        <ExecutionData.Edit  {...props}/>
        <ExecutionData.View><Agree/></ExecutionData.View>
      </Form>
    </Modal>;
  }
}
