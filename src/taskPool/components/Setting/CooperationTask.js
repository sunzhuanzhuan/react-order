
import React from 'react';
import { Table, Input, Button, Form, InputNumber, message } from 'antd';
class CooperationTask extends React.Component {
  handleSubmitTask = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.TPUpdateTaskLaunchConfig({ taskOffers: [{ offerType: 3, ...values }] }).then(() => {
          message.success('应用成功')
          this.props.TPGetTaskLaunchConfigLiang({ offerType: 3 })
        }).catch(({ errorMsg }) => {
          // message.error(errorMsg || '操作失败，请重试！');
        })
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
            <InputNumber precision={0} max={9999999999999} />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" btnDisable={this.props.btnDisable} >
            应用配置
          </Button>
        </Form.Item>
      </Form>
    </div>
  }
}

export default Form.create()(CooperationTask);
