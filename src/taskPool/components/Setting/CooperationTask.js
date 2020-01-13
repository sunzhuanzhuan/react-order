
import React from 'react';
import { Table, Input, Button, Form, InputNumber } from 'antd';
class CooperationTask extends React.Component {
  handleSubmitTask = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.TPGetTaskLaunchConfigLiang([{ offerType: 3, ...values }])
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { taskOffers = [] } = this.props.taskLaunchConfigLiang;
    return <div>
      <Form layout="inline" onSubmit={this.handleSubmitTask}>
        <Form.Item label="单条执行单起投量级（条）">
          {getFieldDecorator('taskLaunchNum', {
            rules: [{ required: true, message: '请输入' }],
            initialValue: taskOffers.length > 0 ? taskOffers[0].taskLaunchNum : ''
          })(
            <InputNumber precision={0} />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >
            应用配置
          </Button>
        </Form.Item>
      </Form>
    </div>
  }
}

export default Form.create()(CooperationTask);
