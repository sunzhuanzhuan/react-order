import React, { } from 'react';
import { Form, Icon, Input, Button, DatePicker } from 'antd';
import { OssUpload } from "wbyui";
import moment from 'moment'
import './add.less'
const { RangePicker } = DatePicker;

const AddForm = (props) => {

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const { platformDetail = {} } = props.platformReducers;
        values.cooperationStartTime = moment(values.cooperationStartTime).format('YYYY-MM-DD');
        values.cooperationEndTime = moment(values.cooperationEndTime).format('YYYY-MM-DD')
        values.cooperationArea = [{ "areaCode": 100000, "areaName": "北京" }, { "areaCode": 200000, "areaName": "上海" }]
        let newValue = JSON.parse(JSON.stringify(values))
        values.contractEnclosureUrl = newValue.contractEnclosureUrl[0].url
        values.contractEnclosureName = newValue.contractEnclosureUrl[0].name || platformDetail.contractEnclosureName
        values.authorEnclosureUrl = newValue.authorEnclosureUrl[0].url
        values.authorEnclosureName = newValue.authorEnclosureUrl[0].name || platformDetail.authorEnclosureName

        props.TPSavePlatform({ ...values, }).then(() => {
          props.setVisible(false)
          let search = {
            page: {
              currentPage: 1,
              pageSize: 50
            }
          }
          props.getList(search)
        })

      }
    });

  }
  const { platformDetail = {} } = props.platformReducers;
  const formItemLayout1 = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  }
  return <div>
    <Form onSubmit={handleSubmit}>
      <Form.Item label="合作平台名称" {...formItemLayout}>
        {getFieldDecorator('platformName', {
          rules: [{ required: true, message: '请输入合作平台名称' }, { max: 80, message: '最多80个字符' }],
          initialValue: props.type == 'add' ? null : platformDetail.platformName
        })(
          <Input placeholder="请输入" style={{ width: '300px' }} disabled={props.type == 'query'} />,
        )}
      </Form.Item>
      <Form.Item label="联系人" {...formItemLayout}>
        {getFieldDecorator('contacts', {
          rules: [{ required: true, message: '请输入联系人' }, { max: 80, message: '最多80个字符' }],
          initialValue: props.type == 'add' ? null : platformDetail.contacts
        })(
          <Input placeholder="请输入" style={{ width: '300px' }} disabled={props.type == 'query'} />,
        )}
      </Form.Item>
      <Form.Item label="联系人电话" {...formItemLayout}>
        {getFieldDecorator('mobile', {
          rules: [{ required: true, message: '请输入联系人电话' }, { max: 13, message: '最多13个字符' }],
          initialValue: props.type == 'add' ? null : platformDetail.mobile
        })(<Input placeholder="请输入" style={{ width: '300px' }} disabled={props.type == 'query'} />, )}
      </Form.Item>
      <Form.Item label="联系人邮箱" {...formItemLayout}>
        {getFieldDecorator('mailbox', {
          rules: [{ required: true, message: '请输入联系人邮箱' }, { max: 80, message: '最多80个字符' }],
          initialValue: props.type == 'add' ? null : platformDetail.mailbox
        })(
          <Input placeholder="请输入" style={{ width: '300px' }} disabled={props.type == 'query'} />,
        )}
      </Form.Item>
      <Form.Item label="媒介负责人" {...formItemLayout}>
        {getFieldDecorator('mediumLeader', {
          rules: [{ required: true, message: '请输入媒介负责人' }, { max: 80, message: '最多80个字符' }],
          initialValue: props.type == 'add' ? null : platformDetail.mediumLeader
        })(
          <Input placeholder="请输入" style={{ width: '300px' }} disabled={props.type == 'query'} />,
        )}
      </Form.Item>
      <Form.Item label="合作时间" {...formItemLayout} className='cooper'>
        <Form.Item style={{ display: 'inline-block' }}>
          {getFieldDecorator('cooperationStartTime', {
            rules: [{ required: true, message: '请选择开始日期' }],
            initialValue: props.type == 'add' ? null : moment(moment(platformDetail.cooperationStartTime).format('YYYY-MM-DD'), 'YYYY-MM-DD')
          })(
            <DatePicker style={{ width: '150px' }} format={'YYYY-MM-DD'} placeholder='开始日期' disabled={props.type == 'query'} />
          )}</Form.Item>
        <span style={{ display: 'inline-block' }}>{'~'}</span>
        <Form.Item style={{ display: 'inline-block' }} > {getFieldDecorator('cooperationEndTime', {
          rules: [{ required: true, message: '请选择截止日期' }],
          initialValue: props.type == 'add' ? null : moment(moment(platformDetail.cooperationEndTime).format('YYYY-MM-DD'), 'YYYY-MM-DD')
        })(
          <DatePicker format={'YYYY-MM-DD'} placeholder='结束日期' style={{ width: '140px' }} disabled={props.type == 'query'} />
        )}
        </Form.Item>
      </Form.Item>
      <Form.Item label="合作区域" {...formItemLayout}>
        {getFieldDecorator('cooperationArea', {
          rules: [{ required: true, message: '请输入合作时间' }],
          initialValue: props.type == 'add' ? null : platformDetail.cooperationArea
        })(
          <Input placeholder="请输入" style={{ width: '300px' }} disabled={props.type == 'query'} />,
        )}
      </Form.Item>
      <Form.Item label="上传合同" {...formItemLayout}>
        {getFieldDecorator('contractEnclosureUrl', {
          initialValue: props.type == 'add' ? null : [{ url: platformDetail.contractEnclosureUrl, status: 'done', uid: platformDetail.contractEnclosureUrl }],
          valuePropName: 'fileList',
          getValueFromEvent: e => e && e.fileList,
          rules: [
            { message: '请上传合同', required: true, type: "array" }
          ]
        })(
          <OssUpload
            authToken={props.data.authToken}
            listType='picture-card'
            disabled={props.type == 'query'}
            rule={{
              bizzCode: 'FWP_SUPPLY_UPLOAD_TYPE',
              max: 20,
            }}
            len={1}
            tipContent={() => '上传合同的大小不能超过20Mb'}
          />
        )}
      </Form.Item>
      <Form.Item label="上传授权书" {...formItemLayout}>
        {getFieldDecorator('authorEnclosureUrl', {
          initialValue: props.type == 'add' ? null : [{ url: platformDetail.authorEnclosureUrl, status: 'done', uid: platformDetail.authorEnclosureUrl }],
          valuePropName: 'fileList',
          getValueFromEvent: e => e && e.fileList,
          rules: [
            { message: '请上传授权书', required: true, type: "array" }
          ]
        })(
          <OssUpload
            authToken={props.data.authToken}
            listType='picture-card'
            disabled={props.type == 'query'}
            rule={{
              bizzCode: 'FWP_SUPPLY_UPLOAD_TYPE',
              max: 20,
            }}
            len={1}
            tipContent={() => '上传授权书的大小不能超过20Mb'}
          />
        )}
      </Form.Item>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" onClick={() => props.setVisible(false)}>取消</Button>
        <Button type="primary" style={{ marginLeft: '20px' }} htmlType="submit">保存并提交</Button>
      </p>
    </Form>
  </div>
}
export default Form.create()(AddForm)
