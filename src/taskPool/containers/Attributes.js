/**
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import CertificateGroup from '../components/Attribute/CertificateGroup';
import { Button, Form, Icon, Input } from 'antd';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { type } from '@/util';

const uuid = require('uuid/v1');


class Certificates extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      groups: [
        {
          uuid: uuid(),
          groupQualificationMappingReqList: [
            /*{
              qualificationId: 1
            }*/
          ]
        }
      ]
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
              <Form.Item  className="certificate-group-container">
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
                  {initialValue: item['id']})(<Input type='hidden'/>)
              }
            </div>
          })
        }
        <a onClick={this.addGroup}><Icon type="plus"/> 添加资质组</a>
      </div>
    );
  }
}

class BusinessScope extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      groups: [
        {
          uuid: uuid(),
          groupQualificationMappingReqList: [
            /*{
              qualificationId: 1
            }*/
          ]
        }
      ]
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
            return <div key={item.uuid} className="business-scope-container">
              <Input.Group compact  className="business-scope-container-title">
                <Input style={{width: "86%"}} placeholder='经营内容标题'/>
                <Button style={{width: "14%"}} icon='delete' type='danger' ghost onClick={this.deleteGroup}>删除</Button>
              </Input.Group>
              <Certificates
                form={this.props.form}
                search={this.props.actions.TPQueryQualificationByName}
                fieldPrefix="qualificationsGroupListsssss"
              />
            </div>
          })
        }
        <Button icon='plus' type='primary' ghost onClick={this.addGroup}>添加经营内容</Button>
      </div>
    );
  }
}

const Attributes = (props) => {
  const { getFieldDecorator } = props.form
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  return (
    <Form>
      <Certificates
        form={props.form}
        search={props.actions.TPQueryQualificationByName}
        fieldPrefix="qualificationsGroupList"
      />

      <BusinessScope form={props.form} actions={props.actions}/>
      <Button onClick={handleSubmit}>提交</Button>
    </Form>
  );
};


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Attributes));
