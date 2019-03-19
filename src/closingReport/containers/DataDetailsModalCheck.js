import React, { Component } from 'react';
import { Modal, Form, Icon, Button } from 'antd';
import {
  Outline,
  BaseInfo,
  ExecutionLink,
  ExecutionPic,
  ExecutionData
} from '../components/dataDetails';
import './DataDetailsModal.less';
import { Against, Agree } from '../base/ApprovalStatus';


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
@Form.create()
export default class DataDetailsModalEdit extends Component {
  constructor(props, context) {
    super(props, context);
    const { actions, data } = props;
    this.state = { loading: true };
    // 请求数据
    actions.getPlatformDataInfo({
      order_id: data.order_id,
      platform_id: data.current.platform_id
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

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
    const { form, data, type, platformData } = this.props;
    const {
      total, // outline
      basic_information, // baseInfo
      execution_link,
      execution_screenshot, // executionPic
      execution_data
    } = platformData;
    const reason = <Against reason={'这里显示审核诶通过原因，显示不下用截断，鼠标HOVER弹出tips'} />;
    const props = {
      formItemLayout, form, reason
    };
    const title = <h2 className='data-details-header'>平台数据详情
      <small>订单ID：{data.order_id}</small>
    </h2>;
    const footer = <div className='data-details-footer'>
      <Icon type="exclamation-circle" />
      <span>说明: 若勾选无法提供该数据，则。。。。。。</span>
      <Button>保存</Button>
      <Button type='primary'>保存并提交</Button>
    </div>;
    return <Modal
      centered
      title={title}
      wrapClassName="closing-report-modal-pages data-details"
      visible
      width={800}
      onCancel={this.props.closed}
      footer={footer}
    >
      {this.state.loading ? <div style={{ height: '600px' }}>loading...</div> :
        <Form>
          <Outline.View data={total} />
          {
            type === 'edit' ?
              [
                <BaseInfo.View key='baseInfo'><Agree /></BaseInfo.View>,
                <BaseInfo.Edit key='baseInfo'  {...props} />,
                <ExecutionLink.Edit key='executionLink' {...props} />,
                <ExecutionLink.View key='executionLink'><Agree top={10} /></ExecutionLink.View>,
                <ExecutionPic.Edit key='executionPic' {...props} />,
                <ExecutionPic.View key='executionPic'><Agree /></ExecutionPic.View>,
                <ExecutionData.Edit key='executionData'  {...props} />,
                <ExecutionData.View key='executionData'><Agree /></ExecutionData.View>
              ] : null
          }
          {
            type === 'view' || type === 'review' ? [
              <BaseInfo.View key='baseInfo' />,
              <ExecutionLink.View key='executionLink' />,
              <ExecutionPic.View key='executionPic' />,
              <ExecutionData.View key='executionData' />
            ] : null
          }
        </Form>
      }
    </Modal>;
  }
}
