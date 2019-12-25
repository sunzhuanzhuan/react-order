/**
 * Created by lzb on 2019-12-25.
 */
import React from 'react';
import update from 'immutability-helper';
import { Button, Form, Input } from 'antd';
import CertificateGroupsList from './CertificateGroupsList';
import './index.less'


const uuid = require('uuid/v1');

export default class BusinessScopesList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      scopes: []
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('scopes' in nextProps) {
      let scopes = nextProps.scopes || []
      scopes.map(item => item.uuid ? item : Object.assign(item, { uuid: uuid() }))
      return {
        scopes: nextProps.scopes || []
      };
    }
    return null
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onScopesChange = (scopes) => {
    if (!('scopes' in this.props)) {
      this.setState({ scopes });
    }
    this.triggerChange(scopes)
  };


  deleteGroup = (index) => {
    this.onScopesChange(update(this.state.scopes, {
        $splice: [ [ index, 1 ] ]
      }
    ))
  };

  addGroup = () => {
    this.onScopesChange(update(this.state.scopes, {
        $push: [ { uuid: uuid(), groupQualificationMappingReqList: [] } ]
      }
    ))
  };

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        {
          this.state.scopes.map((item, index) => {
            return <div key={item.uuid} className="business-scope-container">
              <Form.Item style={{ marginBottom: 0, paddingBottom: 6 }}>
                <h3 className="business-scope-container-title">
                  {
                    getFieldDecorator(`${this.props.fieldPrefix}[${index}].scopeName`,
                      {
                        initialValue: [],
                        rules: [ { required: true, message: '经营内容标题不能为空' } ]
                      })(
                      <Input placeholder='经营内容标题' />
                    )
                  }
                  <Button
                    style={{ marginLeft: 10 }}
                    icon='close'
                    type="danger"
                    onClick={this.deleteGroup}/>
                </h3>
              </Form.Item>
              <div className="business-scope-container-content">
                <CertificateGroupsList
                  form={this.props.form}
                  search={this.props.search}
                  fieldPrefix={`${this.props.fieldPrefix}[${index}].qualificationsGroupList`}
                />
              </div>
              {
                getFieldDecorator(`${this.props.fieldPrefix}[${index}].id`,
                  {
                    initialValue: item.id,
                  })(
                  <Input type='hidden' />
                )
              }
            </div>
          })
        }
        <Button icon='plus' type='primary' ghost onClick={this.addGroup}>添加经营内容</Button>
      </div>
    );
  }
}
