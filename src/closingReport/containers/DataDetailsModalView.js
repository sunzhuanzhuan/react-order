import React, { Component } from 'react';
import { Modal,Button } from 'antd';
import {
  Outline,
  BaseInfo,
  ExecutionLink,
  ExecutionPic,
  ExecutionData
} from '../components/dataDetails';
import './DataDetailsModal.less';
import Loading from '../base/Loading';

export default class DataDetailsModalView extends Component {
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
  componentWillUnmount() {
    this.props.actions.clearPlatformData();
  }
  render() {
    const { data, platformData } = this.props;
    const {
      total, // outline
      basic_information, // baseInfo
      execution_link,
      execution_screenshot, // executionPic
      execution_data
    } = platformData;
    const title = <h2 className='data-details-header'>平台数据详情
      <small>订单ID：{data.order_id}</small>
    </h2>;
    return <Modal
      centered
      destroyOnClose
      title={title}
      wrapClassName="closing-report-modal-pages data-details"
      visible
      width={800}
      onCancel={this.props.closed}
      onOk={this.props.closed}
    >
      {this.state.loading ? <div style={{ height: '600px' }}><Loading/></div> :
        <div>
          <Outline.View data={total} />
          <BaseInfo.View data={basic_information} />
          <ExecutionLink.View data={execution_link} />
          <ExecutionPic.View data={execution_screenshot} />
          <ExecutionData.View data={execution_data} />
        </div>
      }
    </Modal>;
  }
}
