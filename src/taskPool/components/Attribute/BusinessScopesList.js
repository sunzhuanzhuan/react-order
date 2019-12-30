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

  onChildrenChange = (index, groups) => {
    this.onScopesChange(update(this.state.scopes, {
        [index]: {
          qualificationsGroupList: { $set: groups }
        }
      }
    ))
  }
  onTitleChange = (index, title) => {
    this.onScopesChange(update(this.state.scopes, {
        [index]: {
          name: { $set: title }
        }
      }
    ))
  }

  deleteScope = (index) => {
    this.onScopesChange(update(this.state.scopes, {
        $splice: [ [ index, 1 ] ]
      }
    ))
  };

  addScope = () => {
    this.onScopesChange(update(this.state.scopes, {
        $push: [ { uuid: uuid(), qualificationsGroupList: [] } ]
      }
    ))
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form

    return (
      <div>
        {
          this.state.scopes.map((item, index) => {
            return <div key={item.uuid} className="business-scope-container">
              <Form.Item style={{ marginBottom: 0, paddingBottom: 6 }}>
                <h3 className="business-scope-container-title">
                  {
                    getFieldDecorator(`${this.props.fieldPrefix}[${item.uuid}].scopeName`,
                      {
                        initialValue: item.scopeName,
                        validateFirst: true,
                        // validateTrigger: ['submit'],
                        rules: [
                          { required: true, message: '经营内容标题不能为空' },
                          {
                            validator: (rule, value, callback) => {
                              const names = Object.values(getFieldValue('_scopes')).map(item => item.scopeName)
                              if (value && names.some((name, index) => (name === value && names.indexOf(
                                name) !== index))) {
                                callback("经营内容不能重复")
                              } else {
                                callback()
                              }
                            }
                          }
                        ]
                      })(
                      <Input placeholder='经营内容标题'
                             onChange={event => this.onTitleChange(index, event.target.value)} />
                    )
                  }
                  <Button
                    className="business-scope-container-title-close-btn "
                    icon='delete'
                    type="link"
                    onClick={this.deleteScope}>
                    删除
                  </Button>
                </h3>
              </Form.Item>
              <div className="business-scope-container-content">
                <CertificateGroupsList
                  form={this.props.form}
                  search={this.props.search}
                  fieldPrefix={`${this.props.fieldPrefix}[${item.uuid}]._groups`}
                  onChange={(groups) => this.onChildrenChange(index, groups)}
                  groups={item.qualificationsGroupList}
                />
              </div>
              {
                getFieldDecorator(`${this.props.fieldPrefix}[${item.uuid}].id`,
                  {
                    initialValue: item.id,
                  })(
                  <Input type='hidden' />
                )
              }
            </div>
          })
        }
        <Button icon='plus' type='primary' ghost onClick={this.addScope}>添加经营内容</Button>
      </div>
    );
  }
}
