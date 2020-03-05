
import React, { useState } from 'react';
import { Table, Input, Button, Form, Modal, Select, InputNumber, message } from 'antd';
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
      if (!err) {
        const { selectWeiDu } = this.state;
        let arrkey = Object.keys(values)
        let arr = []
        let letter = ['B', 'C', 'D', 'E']
        // let selectArr = []
        for (let i = 0; i < arrkey.length; i++) {
          if (values[arrkey[i]].itemTypef) {
            arr.push({ groupId: arrkey[i], itemTypef: values[arrkey[i]].itemTypef || [], offerTypes: [] })
          } else {
            return message.error('请填写定向维度')
          }
          for (let j = 0; j < 4; j++) {
            // if () {

            // } else if () {

            // } else if () {

            // } else {

            // }
            arr[i].offerTypes.push({ offerType: j + 1, unitPrice: values[arrkey[i]][letter[j]] })
          }
        }
        console.log(arr)
        // for (let m = 0; m < selectWeiDu.length; m++) {
        //   for (let n = 0; n < arr.length; n++) {
        //     if (arr[n].groupId == selectWeiDu[m]) {
        //       selectArr.push(arr[n])
        //     }

        //   }

        // }
        console.log(JSON.stringify(arr))
        this.props.TPDimensionConfig({ itemTypes: arr }).then(() => {
          message.success('应用成功')
          this.props.TPGetDimensionConfig({})
        }).catch(({ errorMsg }) => {
          // message.error(errorMsg || '操作失败，请重试！');
        })
      }

    });
  }
  handleDeleteAccount = () => {
    const { data, selectedRows, selectWeiDu } = this.state
    if (selectWeiDu.length == 0) {
      message.error('请选择要删除的项')
      return
    }
    confirm({
      title: '删除',
      content: '是否删减维度',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: (() => {
        for (let i = 0; i < selectedRows.length; i++) {
          if (selectedRows[i].feAdd) {
            selectedRows.splice(i, 1)
          }
        }
        let arr = []
        selectedRows.map((item) => {
          arr.push(item.groupId)
        })
        // let string = selectWeiDu.toString()
        if (arr.length > 0) {
          this.props.TPDeleteDimension({ groupIds: arr }).then(() => {
            this.props.TPGetDimensionConfig({})
          })
        } else {
          this.props.TPGetDimensionConfig({})
        }

        // this.setState({})
      }).bind(this),
      onCancel() {

      },
    });
  }
  handleAddAccount = () => {
    let params = {
      groupId: new Date().getTime(),
      feAdd: true,
      itemTypes: [],
      offerTypes: [
        {
          offerType: 1,
          unitPrice: undefined
        },
        {
          offerType: 2,
          unitPrice: undefined
        }, {
          offerType: 3,
          unitPrice: undefined
        }, {
          offerType: 4,
          unitPrice: undefined
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
      TPGetTaskLaunchConfigTian, TPGetTaskLaunchConfigHui, TPUpdateTaskLaunchConfig
    } = this.props
    const { data, selectWeiDu } = this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectWeiDu: selectedRowKeys,
          selectedRows: selectedRows
        })
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // setSelectedRows(selectedRows)
      }
    };
    // console.log(selectWeiDu)
    return (
      <div>
        <div style={{ marginLeft: '30px', marginTop: '20px' }}>
          <h2 style={{ fontSize: '20px' }}>1、维度配置</h2>
          <Form onSubmit={this.handleApplyAccount}>
            <h4 style={{ marginLeft: '30px', marginBottom: '10px' }}>账号等级维度 单位：（元/阅读）</h4>
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
              <Button type="primary" onClick={this.handleAddAccount} disabled={this.props.btnDisable}>新增维度</Button>
              <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleDeleteAccount} disabled={this.props.btnDisable}>删除维度</Button>
              <Button type="primary" htmlType="submit" disabled={this.props.btnDisable}>应用配置</Button>
            </Form.Item>
          </Form>
          <h4 style={{ fontSize: '20px' }}>2、任务要求</h4>
          <CooperationTask
            taskLaunchConfigLiang={taskLaunchConfigLiang}
            TPGetTaskLaunchConfigLiang={TPGetTaskLaunchConfigLiang}
            TPDeleteTaskLaunch={this.props.TPDeleteTaskLaunch}
            TPUpdateTaskLaunchConfig={TPUpdateTaskLaunchConfig}
            btnDisable={this.props.btnDisable}
          />

          <h4 style={{ fontSize: '20px' }}>3、包天模式</h4>
          <CooperationTian
            taskLaunchConfigTian={taskLaunchConfigTian}
            TPGetTaskLaunchConfigTian={TPGetTaskLaunchConfigTian}
            TPDeleteTaskLaunch={this.props.TPDeleteTaskLaunch}
            TPUpdateTaskLaunchConfig={TPUpdateTaskLaunchConfig}
            btnDisable={this.props.btnDisable}
          />
          <h4 style={{ fontSize: '20px' }}>4、返现优惠</h4>
          <CooperationHui
            taskLaunchConfigHui={taskLaunchConfigHui}
            TPGetTaskLaunchConfigHui={TPGetTaskLaunchConfigHui}
            TPDeleteTaskLaunch={this.props.TPDeleteTaskLaunch}
            TPUpdateTaskLaunchConfig={TPUpdateTaskLaunchConfig}
            btnDisable={this.props.btnDisable}
          />
        </div>
      </div>
    );
  }
}

export default Form.create()(Cooperation);
