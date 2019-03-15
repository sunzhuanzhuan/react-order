import React, { Component } from 'react';
import { Form, Button, Icon } from 'antd';
import './index.less';
import DataModuleHeader from '../../base/DataModuleHeader';
import { OssUpload } from 'wbyui';
import request from '@/api';
import viewPic from '../../base/viewPic'

function action() {
  return request.get('/toolbox-gateway/file/v1/getToken').then(({ data }) => {
    return data;
  });
}
const initialValue = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }];

/**
 * 执行截图(编辑)
 */
export class Edit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authToken: ''
    };
    action().then(authToken => {
      this.setState({ authToken });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { reason = '' } = this.props;
    return <div className='platform-data-detail-module execution-pic'>
      <DataModuleHeader title='执行截图' extra={reason} />
      <div style={{ padding: '10px 20px' }}>
        <p className='check-demo'>
          <a onClick={viewPic('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')}>查看图例1</a>
          <a>查看图例2</a>
        </p>
        <Form.Item className='upload-list-inline'>
          {getFieldDecorator(`username20`, {
            initialValue: initialValue,
            valuePropName: 'fileList',
            getValueFromEvent: e => e.fileList,
            rules: [{ required: true }]
          })(<OssUpload
              authToken={this.state.authToken}
              listType='picture'
              onPreview={viewPic()}
              rule={{
                bizzCode: 'B_GZA_ORDER_IMG_NORMAL_UPLOAD',
                max: 5,
                suffix: 'jpg,jpeg,gif,png'
              }}
              len={10}
              tipContent={() => '图片大小不超过5M，支持jpg、jpeg、gif、png，最多上传10张'}
            >
              <Button><Icon type="upload" /> 上传文件</Button>
            </OssUpload>
          )}
        </Form.Item>
      </div>
    </div>;
  }
}

/**
 * 执行截图(查看)
 */
export class View extends Component {
  render() {
    let url = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    return <div className='platform-data-detail-module execution-pic read'>
      <div className='read-left-head'>
        执行截图
      </div>
      <div className='read-right-data'>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
        <div className='pic-list-item' onClick={viewPic(url)}>
          <img src={url} alt="" />
        </div>
      </div>
      {this.props.children}
    </div>;
  }
}

export default {
  Edit,
  View
};
