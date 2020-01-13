
import React from 'react';
import { Table, Input, Button, Form, InputNumber, Modal, message } from 'antd';
import { columnsTian } from './Config'

const { confirm } = Modal;
class CooperationTian extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectWeTian: [],
      data: props.taskLaunchConfigTian.taskOffers || [],
      selectedRows: []
    }

  }
  componentWillReceiveProps = (props) => {
    this.setState({
      data: props.taskLaunchConfigTian.taskOffers
    })
  }
  handleAdd = () => {
    let params = { launchDay: '', taskOfferPrice: '', id: new Date().getTime() }
    this.state.data.push(params)
    this.setState({})
  }
  handleDelete = () => {
    const { data, selectWeTian } = this.state
    if (selectWeTian.length == 0) {
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
        this.props.TPDeleteTaskLaunch(selectWeTian).then(() => {
          this.props.TPGetTaskLaunchConfigTian({ offerType: 1 })
        })
        // for (let i = 0; i < selectWeTian.length; i++) {
        //   for (let j = 0; j < data.length; j++) {
        //     if (selectWeTian[i] == data[j].id) {
        //       data.splice(j, 1)
        //     }
        //   }
        // }
        // this.setState({})
      }).bind(this),
      onCancel() {

      },
    });
  }
  handleSubmitTian = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { selectWeTian } = this.state;
        let arrkey = Object.keys(values)
        let arr = []
        let selectArr = []
        console.log(values);
        for (let i = 0; i < arrkey.length; i++) {

          arr.push({ offerType: 1, id: arrkey[i] || new Date().getTime(), launchDay: values[arrkey[i]]['B'], taskOfferPrice: values[arrkey[i]]['C'] })

        }
        for (let m = 0; m < selectWeTian.length; m++) {
          for (let n = 0; n < arr.length; n++) {
            if (arr[n].id == selectWeTian[m]) {
              selectArr.push(arr[n])
            }

          }

        }
        console.log(selectArr)
        // this.props.TPGetTaskLaunchConfigTian(selectArr).then(() => {
        //   this.props.TPGetTaskLaunchConfigTian({})
        // })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { taskOffers } = this.props.taskLaunchConfigTian;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectWeTian: selectedRowKeys
        })
      }
    };
    return <div>
      {taskOffers && <Form onSubmit={this.handleSubmitTian}>
        <Table
          style={{ marginLeft: '30px' }}
          bordered
          rowKey={record => record.id}
          dataSource={taskOffers}
          columns={columnsTian(getFieldDecorator)}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={this.handleAdd}>新增投放天数</Button>
          <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleDelete}>删除投放天数</Button>
          <Button type="primary" htmlType="submit">应用配置</Button>
        </Form.Item>
      </Form>}
    </div>
  }
}

export default Form.create()(CooperationTian);
