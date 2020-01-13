
import React, { useState } from 'react';
import { Table, Input, Button, Form, Modal, Select, InputNumber } from 'antd';
import { columnsWeidu } from './Config'
import CooperationTask from './CooperationTask'
import CooperationTian from './CooperationTian'
import CooperationHui from './CooperationHui'
const { Option } = Select;
const { confirm } = Modal;

class Cooperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectWeiDu: [],
      data: props.dimensionConfig.itemTypes || [],
      selectedRows: []
    }

  }
  componentWillReceiveProps = (props) => {
    this.setState({
      data: props.dimensionConfig.itemTypes
    })
  }

  handleApplyAccount = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      const { selectWeiDu } = this.state;
      let arrkey = Object.keys(values)
      let arr = []
      let letter = ['B', 'C', 'D', 'E']
      let selectArr = []
      for (let i = 0; i < arrkey.length; i++) {
        arr.push({ groupId: arrkey[i], itemTypef: values[arrkey[i]].itemTypef || [], offerTypes: [] })
        for (let j = 0; j < 4; j++) {
          arr[i].offerTypes.push({ offerType: j + 1, unitPrice: values[arrkey[i]][letter[j]] })
        }
      }
      for (let m = 0; m < selectWeiDu.length; m++) {
        for (let n = 0; n < arr.length; n++) {
          if (arr[n].groupId == selectWeiDu[m]) {
            selectArr.push(arr[n])
          }

        }

      }
      this.props.TPDimensionConfig({ itemTypes: selectArr }).then(() => {
        this.props.TPGetDimensionConfig({})
      })
    });
  }

  handleSubmitXian = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleChange = (value) => {
    // setSelectWeiDu(value)
  }
  handleSubmitBaotian = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleDeleteAccount = () => {
    const { data, selectWeiDu } = this.state
    confirm({
      title: '删除',
      content: '是否删减维度',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: (() => {
        for (let i = 0; i < selectWeiDu.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (selectWeiDu[i] == data[j].groupId) {
              data.splice(j, 1)
            }
          }
        }
        this.setState({})
      }).bind(this),
      onCancel() {

      },
    });
  }
  handleAddAccount = () => {
    let params = {
      groupId: new Date().getTime(),
      itemTypes: [],
      offerTypes: [
        {
          offerType: 1,
          unitPrice: ''
        },
        {
          offerType: 2,
          unitPrice: ''
        }, {
          offerType: 3,
          unitPrice: ''
        }, {
          offerType: 4,
          unitPrice: ''
        },
      ]
    }
    this.state.data.push(params)
    this.setState({})
  }

  render() {
    const { getFieldDecorator, getFieldValue, setFieldsValue, validateFields } = this.props.form;
    const { itemTypes = [] } = this.props.dimensionConfig
    const { taskLaunchConfigLiang, taskLaunchConfigTian, taskLaunchConfigHui, TPGetTaskLaunchConfigLiang,
      TPGetTaskLaunchConfigTian, TPGetTaskLaunchConfigHui
    } = this.props
    const { data, selectWeiDu } = this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectWeiDu: selectedRowKeys
        })
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // setSelectedRows(selectedRows)
      }
    };
    // console.log(selectWeiDu)
    return (
      <div>
        <div>
          <h4>1、维度配置</h4>
          <Form onSubmit={this.handleApplyAccount}>
            <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
            <h3 style={{ marginLeft: '30px', marginBottom: '10px' }}>账号等级维度 单位：（元/阅读）</h3>
            <Table
              style={{ marginLeft: '30px' }}
              bordered
              rowKey={record => record.groupId}
              dataSource={data}
              columns={columnsWeidu(getFieldDecorator)}
              pagination={false}
              rowSelection={rowSelection}
            />
            <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button type="primary" onClick={this.handleAddAccount}>新增维度</Button>
              <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleDeleteAccount}>删除维度</Button>
              <Button type="primary" htmlType="submit">应用配置</Button>
            </Form.Item>
          </Form>
          <h4>2、任务要求</h4>
          <CooperationTask
            taskLaunchConfigLiang={taskLaunchConfigLiang}
            TPGetTaskLaunchConfigLiang={TPGetTaskLaunchConfigLiang}
          />
        </div>
        <h4>3、包天模式</h4>
        <CooperationTian
          taskLaunchConfigTian={taskLaunchConfigTian}
          TPGetTaskLaunchConfigTian={TPGetTaskLaunchConfigTian}
        />
        <h4>4、返现优惠</h4>
        <CooperationHui
          taskLaunchConfigHui={taskLaunchConfigHui}
          TPGetTaskLaunchConfigHui={TPGetTaskLaunchConfigHui}
        />
      </div>
    );
  }
}

export default Form.create()(Cooperation);
