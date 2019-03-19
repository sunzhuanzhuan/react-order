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
    e.preventDefault && e.preventDefault();
    console.log(this.props.form.getFieldsValue(),'=====');
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
    const props = {
      formItemLayout, form
    };
    const title = <h2 className='data-details-header'>平台数据详情
      <small>订单ID：{data.order_id}</small>
    </h2>;
    const footer = <div className='data-details-footer'>
      <Icon type="exclamation-circle" />
      <span>说明: 若勾选无法提供该数据，则。。。。。。</span>
      <Button>保存</Button>
      <Button type='primary' onClick={this.submit}>保存并提交</Button>
    </div>;
    return <Modal
      centered
      title={title}
      wrapClassName="closing-report-modal-pages data-details"
      visible
      width={800}
      onCancel={this.props.closed}
      footer={footer}
      maskClosable={false}
    >
      {this.state.loading ? <div style={{ height: '600px' }}>loading...</div> :
        <Form>
          <Outline.View data={total} />
          {
            parseInt(basic_information.status) === 1 ?
              <BaseInfo.View data={basic_information}><Agree /></BaseInfo.View> :
              <BaseInfo.Edit data={basic_information} {...props} />
          }
          {
            parseInt(execution_link.status) === 1 ?
              <ExecutionLink.View data={execution_link}><Agree top={10} /></ExecutionLink.View> :
              <ExecutionLink.Edit data={execution_link} {...props} />
          }
          {
            parseInt(execution_screenshot.status) === 1 ?
              <ExecutionPic.View data={execution_screenshot}><Agree /></ExecutionPic.View> :
              <ExecutionPic.Edit data={execution_screenshot} {...props} />
          }
          {
            parseInt(execution_data.status) === 1 ?
              <ExecutionData.View data={execution_data}><Agree /></ExecutionData.View> :
              <ExecutionData.Edit data={execution_data}  {...props} />
          }
        </Form>
      }
    </Modal>;
  }
}
