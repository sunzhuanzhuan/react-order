import React, { Component } from 'react';
import { Form, Empty, Divider, Button, Icon } from 'antd';
import PhotoSwipe from '../../base/PhotoSwipe';
import './index.less';
import DataModuleHeader from '../../base/DataModuleHeader';
import SwitchRequiredInput from '../../base/SwitchRequiredInput';
import { OssUpload } from 'wbyui';
import request from '@/api';
import { getImageInfos } from '../../util';
import viewPic from '../../base/viewPic';
import { Against } from "@/closingReport/base/ApprovalStatus";

function action() {
  return request.get('/toolbox-gateway/file/v1/getToken').then(({ data }) => {
    return data;
  });
}

/**
 * 执行数据(编辑)
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

  checkSwitchInput = (rule, value = {}, callback) => {
    if (value.input || value.checked) {
      callback();
      return;
    }
    callback(rule.message);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data: { data = [], screenshot = [] } } = this.props;
    const reason = parseInt(this.props.data.status) === 2 ? <Against reason={this.props.data.reason} /> : null;
    let fetchData = [], inputData = [];
    data.forEach((item) => {
      if (item.source_type === 2) {
        fetchData.push(item);
      } else if (item.source_type === 1) {
        inputData.push(item);
      }
    });
    return <div className='platform-data-detail-module execution-data'>
      <DataModuleHeader title='执行数据' extra={reason} />
      <div style={{ paddingTop: '10px' }}>
        <div className='fetch-data'>
          <div className='fetch-data-reference'>
            抓取参考数据
          </div>
          <div>
            {
              fetchData.map((item, n) => {
                return <div key={item.id} className='execution-data-fetch-item'>
                  <div className='reference-item'>
                    {item.display} {item.grasp_value || '-'}
                  </div>
                  <Form.Item label={item.display} {...this.props.formItemLayout}>
                    {getFieldDecorator(`data[${n}]`, {
                      initialValue: { id: item.id, input: item.value, checked: item.checked },
                      validateFirst: true,
                      rules: [{ validator: this.checkSwitchInput, message: `请输入${item.display}!` }]
                    })(<SwitchRequiredInput width={330} typeId={item.id} />)}
                  </Form.Item>
                </div>;
              })
            }
          </div>
        </div>
        <Divider dashed />
        <div className='input-data'>
          <div className='input-data-left'>
            <p className='check-demo'>
              <a onClick={viewPic('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')}>查看图例1</a>
              <a>查看图例2</a>
            </p>
            <Form.Item>
              {getFieldDecorator(`screenshot`, {
                initialValue: (screenshot || []).map(url => ({
                  uid: url,
                  name: url.slice(-28),
                  status: 'done',
                  url,
                  thumbUrl: url
                })),
                valuePropName: 'fileList',
                getValueFromEvent: e => e.fileList,
                rules: [{ required: true, message: '请上传图片' }]
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
                  tipContent={() => '图片大小不超过5M，支持jpg、jpeg、gif、png, 最多上传10张'}
                >
                  <Button><Icon type="upload" /> 上传文件</Button>
                </OssUpload>
              )}
            </Form.Item>
          </div>
          <div className='input-data-right'>
            {
              inputData.map((item, n) => {
                return <Form.Item key={item.id} label={item.display} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                  {getFieldDecorator(`data[${fetchData.length + n}]`, {
                    initialValue: { id: item.id, input: item.value, checked: item.checked },
                    validateFirst: true,
                    rules: [{ validator: this.checkSwitchInput, message: `请输入${item.display}!` }]
                  })(<SwitchRequiredInput width={140} typeId={item.id} />)}
                </Form.Item>;
              })
            }
          </div>
        </div>
      </div>
    </div>;
  }
}


const options = {
  history: false,
  escKey: false,
  closeEl: false,
  captionEl: false,
  shareEl: true,
  shareButtons: [
    { id: 'download', label: '下载', url: '{{raw_image_url}}', download: true }
  ],
  tapToClose: false,
  clickToCloseNonZoomable: false,
  pinchToClose: false,
  closeOnScroll: false,
  closeOnVerticalDrag: false,
  modal: false,
  closeElClasses: [],
  fullscreenEl: false,
  focus: false
  //http://photoswipe.com/documentation/options.html
};

/**
 * 执行数据(查看)
 */
export class View extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      loading: true
    };
    const { data: { screenshot = [] } } = this.props;
    const imgList = screenshot.map(url => ({
      src: url
    }));
    Promise.all(imgList.map(url => getImageInfos(url.src))).then(result => {
      let items = result.filter(Boolean).map((img, n) => ({
        src: img.src,
        w: img.width,
        h: img.height,
        title: 'Image ' + n
      }));
      this.setState({
        items,
        loading: false
      });
    });
  }

  render() {
    const { data: { data = [] } } = this.props;
    let fetchData = [], inputData = [];
    data.forEach((item) => {
      if (item.source_type === 2) {
        fetchData.push(item);
      } else if (item.source_type === 1) {
        inputData.push(item);
      }
    });
    return <div className='platform-data-detail-module execution-data read'>
      <div className='fetch-data'>
        <div className='read-left-head'>
          执行数据
        </div>
        <div className='read-right-data'>
          <div className='fetch-data-reference'>
            抓取参考数据
          </div>
          <div>
            {
              fetchData.map(item => {
                return <div key={item.id} className='execution-data-fetch-item'>
                  <div className='reference-item'>
                    {item.display} {item.grasp_value || '-'}
                  </div>
                  <p className='data-item'>
                    <span className='title'>{item.display}：</span>
                    <span className='value'>{item.checked === 1 ? '无法提供该数据' : item.value}</span>
                  </p>
                </div>;
              })
            }
          </div>
        </div>
      </div>
      <Divider dashed />
      <div className='input-data'>
        <div className='input-data-left'>
          {this.state.loading ? <Empty /> :
            <PhotoSwipe isOpen={true} items={this.state.items} options={options} />}
        </div>
        <div className='input-data-right'>
          {
            inputData.map(item => {
              return <p key={item.id} className='data-item'>
                <span className='title'>{item.display}：</span>
                <span className='value'>{item.checked === 1 ? '无法提供该数据' : item.value}</span>
              </p>;
            })
          }
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
