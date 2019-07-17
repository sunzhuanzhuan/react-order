/**
 * 上传素材
 * Created by lzb on 2019-07-16.
 */
import React, { Component } from "react";
import { Radio, Button, Icon } from "antd";
import { OssUpload } from "wbyui";


export default class UploadMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      images: [],
      video: ''
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };


  onChange = (value, field) => {

    if (!('value' in this.props)) {
      this.setState({ [field]: value });
    }
    this.triggerChange({ [field]: value });
  }

  onCancel = () => {
    this.search('')
  }

  render() {
    const {
      authToken
    } = this.props;
    const { type, images = [], video } = this.state
    const videos = video ? [video] : []
    return (
      <div>
        <Radio.Group value={type} onChange={e => this.onChange(e.target.value, 'type')}>
          <Radio value={1}>图片</Radio>
          <Radio value={2}>视频</Radio>
        </Radio.Group>
        {
          type === 1 && <OssUpload
            authToken={authToken}
            fileList={images}
            listType='picture-card'
            onChange={e => {
              this.onChange(e && e.fileList, 'images')
            }}
            rule={{
              bizzCode: 'B_GZA_ORDER_IMG_NORMAL_UPLOAD',
              max: 2,
              suffix: 'jpg,jpeg,gif,png'
            }}
            len={9}
            tipContent={'最多可上传9张图片, 最大不能超过2MB'}
          />
        }
        {
          type === 2 && <OssUpload
            authToken={authToken}
            fileList={videos}
            rule={{
              bizzCode: 'VIDEO_TEST',
              max: 20,
              suffix: '.mp4'
            }}
            onChange={e => {
              this.onChange(e && e.fileList[0], 'video')
            }}
            len={1}
            tipContent={'视频最大不能超过20MB'}
          >
            <a><Icon type="upload" /> {videos.length > 0 ? "重新上传" : "上传视频"}</a>
          </OssUpload>
        }
      </div>
    )
  }
}
