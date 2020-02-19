import React, { useState } from 'react';
import { Form, Icon, Input, Button, DatePicker, TreeSelect } from 'antd';
import { OssUpload } from "wbyui";
import moment from 'moment'
import './add.less'
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
let arr = []
class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrAllProvince: []
    }

  }
  componentWillMount = () => {
    const { platformDetail } = this.props.platformReducers;
    if (Object.values(platformDetail).length > 0) {
      platformDetail.cooperationAreaList.map((item) => {
        item.label = item.areaName
        item.value = item.areaCode
        item.key = item.areaCode
      })
    }
  }
  onChange = (value) => {
    arr = value
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values---', values)
        console.log('values---arr', arr)
        const { platformDetail = {} } = this.props.platformReducers;
        values.cooperationStartTime = moment(values.cooperationStartTime).format('YYYY-MM-DD');
        values.cooperationEndTime = moment(values.cooperationEndTime).format('YYYY-MM-DD')

        let sel = []
        if (arr.length == 0) {
          values.cooperationAreaList = platformDetail.cooperationAreaList;
        } else {
          arr.map((item) => {
            sel.push({ areaCode: item.value, areaName: typeof (item.label) != 'string' ? item.label.props.children : item.label })
          })
          values.cooperationAreaList = sel;
        }
        let newValue = JSON.parse(JSON.stringify(values))
        values.contractEnclosureUrl = newValue.contractEnclosureUrl[0].url
        values.contractEnclosureName = newValue.contractEnclosureUrl[0].name || platformDetail.contractEnclosureName
        values.authorEnclosureUrl = newValue.authorEnclosureUrl[0].url
        values.authorEnclosureName = newValue.authorEnclosureUrl[0].name || platformDetail.authorEnclosureName
        if (this.props.type == 'edit' || this.props.type == 'query') {
          values.id = platformDetail.id
        }
        console.log('values', values)
        this.props.TPSavePlatform({ ...values, }).then(() => {
          this.props.setVisible(false)
          let search = {
            page: {
              currentPage: 1,
              pageSize: 50
            }
          }
          this.props.getList(search)
          this.props.setType('add')
        })

      }
    });

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { platformDetail = {} } = this.props.platformReducers;
    const { allProvince } = this.props
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

    const loop = data =>
      data.map((item, index) => {
        const title = !item.areaName ? (
          <span>
            {item.largeName}
          </span>
        ) : (
            <span>{item.areaName}</span>
          );
        const id = !item.id ? item.largeArea : item.id;
        if (item.areaDataResVOS) {
          return (
            <TreeNode key={id} title={title} value={id}>
              {loop(item.areaDataResVOS)}
            </TreeNode>
          );
        }
        return <TreeNode key={id} title={title} textKey={item.areaName} value={id} />;
      });
    return <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="合作平台名称" {...formItemLayout}>
          {getFieldDecorator('platformName', {
            rules: [{ required: true, message: '请输入合作平台名称' }, { max: 80, message: '最多80个字符' }],
            initialValue: this.props.type == 'add' ? null : platformDetail.platformName
          })(
            <Input placeholder="请输入" style={{ width: '300px' }} disabled={this.props.type == 'query'} />,
          )}
        </Form.Item>
        <Form.Item label="联系人" {...formItemLayout}>
          {getFieldDecorator('contacts', {
            validateFirst: true,
            rules: [{ required: true, message: '请输入联系人' }, {

              validator: (rule, value, callback) => {
                if (!value.match(/^[\u4e00-\u9fa5]{1,80}$/)) {
                  callback('最多输入80个汉字')
                } else {
                  callback()
                }
              }
            }],
            initialValue: this.props.type == 'add' ? null : platformDetail.contacts
          })(
            <Input placeholder="请输入" style={{ width: '300px' }} disabled={this.props.type == 'query'} />,
          )}
        </Form.Item>
        <Form.Item label="联系人电话" {...formItemLayout}>
          {getFieldDecorator('mobile', {
            validateFirst: true,
            rules: [{ required: true, message: '请输入联系人电话' }, {

              validator: (rule, value, callback) => {
                if (!(/^1[3456789]\d{9}$/.test(value))) {
                  callback('最多输入11个数字')
                } else {
                  callback()
                }
              }
            }], initialValue: this.props.type == 'add' ? null : platformDetail.mobile
          })(<Input placeholder="请输入" style={{ width: '300px' }} disabled={this.props.type == 'query'} />, )}
        </Form.Item>
        <Form.Item label="联系人邮箱" {...formItemLayout}>
          {getFieldDecorator('mailbox', {
            validateFirst: true,
            rules: [{ required: true, message: '请输入联系人邮箱' }, {

              validator: (rule, value, callback) => {
                var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$");
                if (!reg.test(value)) {
                  callback('请输入正确的邮箱')
                } else {
                  callback()
                }
              }
            }],
            initialValue: this.props.type == 'add' ? null : platformDetail.mailbox
          })(
            <Input placeholder="请输入" style={{ width: '300px' }} disabled={this.props.type == 'query'} />,
          )}
        </Form.Item>
        <Form.Item label="媒介负责人" {...formItemLayout}>
          {getFieldDecorator('mediumLeader', {
            validateFirst: true,
            rules: [{ required: true, message: '请输入媒介负责人' }, {

              validator: (rule, value, callback) => {
                if (!value.match(/^[\u4e00-\u9fa5]{1,80}$/)) {
                  callback('最多输入80个汉字')
                } else {
                  callback()
                }
              }
            }],
            initialValue: this.props.type == 'add' ? null : platformDetail.mediumLeader
          })(
            <Input placeholder="请输入" style={{ width: '300px' }} disabled={this.props.type == 'query'} />,
          )}
        </Form.Item>
        <Form.Item label="合作时间" {...formItemLayout} className='cooper'>
          <Form.Item style={{ display: 'inline-block' }}>
            {getFieldDecorator('cooperationStartTime', {
              rules: [{ required: true, message: '请选择开始日期' }],
              initialValue: this.props.type == 'add' ? null : moment(moment(platformDetail.cooperationStartTime).format('YYYY-MM-DD'), 'YYYY-MM-DD')
            })(
              <DatePicker style={{ width: '150px' }} format={'YYYY-MM-DD'} placeholder='开始日期' disabled={this.props.type == 'query'} />
            )}</Form.Item>
          <span style={{ display: 'inline-block' }}>{'~'}</span>
          <Form.Item style={{ display: 'inline-block' }} > {getFieldDecorator('cooperationEndTime', {
            rules: [{ required: true, message: '请选择截止日期' }],
            initialValue: this.props.type == 'add' ? null : moment(moment(platformDetail.cooperationEndTime).format('YYYY-MM-DD'), 'YYYY-MM-DD')
          })(
            <DatePicker format={'YYYY-MM-DD'} placeholder='结束日期' style={{ width: '140px' }} disabled={this.props.type == 'query'} />
          )}
          </Form.Item>
        </Form.Item>
        <Form.Item label="合作地域" {...formItemLayout}>
          {getFieldDecorator('cooperationAreaList', {
            rules: [{ required: true, message: '请输入合作地域' }],
            initialValue: this.props.type == 'add' ? null : platformDetail.cooperationAreaList,
            // valuePropName: 'checkedKeys',
          })(
            <TreeSelect
              checkable
              multiple
              labelInValue
              treeCheckable
              selectable={false}
              onChange={this.onChange}
            >
              {loop(allProvince)}
            </TreeSelect>
          )}
        </Form.Item>
        <Form.Item label="上传合同" {...formItemLayout}>
          {getFieldDecorator('contractEnclosureUrl', {
            initialValue: this.props.type == 'add' ? null : [{ url: platformDetail.contractEnclosureUrl, status: 'done', uid: platformDetail.contractEnclosureUrl }],
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            rules: [
              { message: '请上传合同', required: true, type: "array" }
            ]
          })(
            <OssUpload
              authToken={this.props.data.authToken}
              listType='picture-card'
              disabled={this.props.type == 'query'}
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
            initialValue: this.props.type == 'add' ? null : [{ url: platformDetail.authorEnclosureUrl, status: 'done', uid: platformDetail.authorEnclosureUrl }],
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            rules: [
              { message: '请上传授权书', required: true, type: "array" }
            ]
          })(
            <OssUpload
              authToken={this.props.data.authToken}
              listType='picture-card'
              disabled={this.props.type == 'query'}
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
          <Button type="primary" onClick={() => this.props.setVisible(false)}>取消</Button>
          <Button type="primary" style={{ marginLeft: '20px' }} htmlType="submit">保存并提交</Button>
        </p>
      </Form>
    </div >
  }
}
export default Form.create()(AddForm)
