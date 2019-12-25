/**
 * Created by lzb on 2019-12-25.
 */
import React from 'react';
import update from 'immutability-helper';
import { Form, Icon, Input } from 'antd';
import CertificateGroup from '@/taskPool/components/Attribute/CertificateGroup';
import './index.less'

const uuid = require('uuid/v1');

export default class CertificateGroupsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      groups: []
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('groups' in nextProps) {
      let groups = nextProps.groups || []
      groups.map(item => item.uuid ? item : Object.assign(item, { uuid: uuid() }))
      return {
        groups: nextProps.groups || []
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

  onGroupsChange = (groups) => {
    if (!('groups' in this.props)) {
      this.setState({ groups });
    }
    this.triggerChange(groups)
  };


  deleteGroup = (index) => {
    this.onGroupsChange(update(this.state.groups, {
        $splice: [ [ index, 1 ] ]
      }
    ))
  };

  addGroup = () => {
    this.onGroupsChange(update(this.state.groups, {
        $push: [ { uuid: uuid(), groupQualificationMappingReqList: [] } ]
      }
    ))
  };

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        {
          this.state.groups.map((item, index) => {
            return <div key={item['uuid']}>
              <Form.Item className="certificate-group-container">
                {
                  getFieldDecorator(`${this.props.fieldPrefix}[${index}].groupQualificationMappingReqList`,
                    {
                      initialValue: [],
                      rules: [ {
                        validator: (rule, value, callback) => {
                          if (value.length === 0) {
                            return callback('资质组不能为空')
                          }
                          callback()
                        }, type: 'array'
                      } ]
                    })(
                    <CertificateGroup onDelete={this.deleteGroup} search={this.props.search} />
                  )
                }
              </Form.Item>
              {
                getFieldDecorator(`${this.props.fieldPrefix}[${index}].id`,
                  { initialValue: item['id'] })(<Input type='hidden' />)
              }
            </div>
          })
        }
        <a onClick={this.addGroup}><Icon type="plus" /> 新增资质组</a>
      </div>
    );
  }
}
