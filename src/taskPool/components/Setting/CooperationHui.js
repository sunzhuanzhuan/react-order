
import React from 'react';
import { Table, Input, Button, Form, InputNumber, Modal, message } from 'antd';
import { columnsHui } from './Config'

const { confirm } = Modal;
class CooperationHui extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectWeHui: [],
      data: props.taskLaunchConfigHui.taskOffers || [],
      selectedRows: []
    }

  }
  componentWillReceiveProps = (props) => {
    this.setState({
      data: props.taskLaunchConfigHui.taskOffers
    })
  }
  handleAdd = () => {
    let params = { launchDay: '', taskOfferPrice: '', id: new Date().getTime(), feAdd: true, }
    this.state.data.push(params)
    this.setState({})
  }
  handleDelete = () => {
    const { data, selectWeHui, selectedRows } = this.state
    if (selectWeHui.length == 0) {
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
          arr.push(item.id)
        })
        if (arr.length > 0) {
          this.props.TPDeleteTaskLaunch({ ids: arr }).then(() => {
            this.props.TPGetTaskLaunchConfigHui({ offerType: 4 })
          })
        } else {
          this.props.TPGetTaskLaunchConfigHui({ offerType: 4 })
        }

      }).bind(this),
      onCancel() {

      },
    });
  }
  handleSubmitHui = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { selectWeHui } = this.state;
        let arrkey = Object.keys(values)
        let arr = []
        let selectArr = []
        console.log(values);
        for (let i = 0; i < arrkey.length; i++) {

          arr.push({ offerType: 4, id: arrkey[i] || new Date().getTime(), taskOfferPrice: values[arrkey[i]]['B'], discountPrice: values[arrkey[i]]['C'] })

        }
        // for (let m = 0; m < selectWeHui.length; m++) {
        //   for (let n = 0; n < arr.length; n++) {
        //     if (arr[n].id == selectWeHui[m]) {
        //       selectArr.push(arr[n])
        //     }

        //   }

        // }
        // console.log(selectArr)
        console.log(JSON.stringify(arr))
        this.props.TPUpdateTaskLaunchConfig({ taskOffers: arr }).then(() => {
          message.success('应用成功')
          this.props.TPGetTaskLaunchConfigHui({ offerType: 4 })
        }).catch(({ errorMsg }) => {
          message.error(errorMsg || '操作失败，请重试！');
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { taskOffers } = this.props.taskLaunchConfigHui;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectWeHui: selectedRowKeys,
          selectedRows: selectedRows
        })
      }
    };
    return <div>
      {taskOffers && <Form onSubmit={this.handleSubmitHui}>
        <Table
          style={{ marginLeft: '30px' }}
          bordered
          dataSource={taskOffers}
          rowKey={record => record.id}
          columns={columnsHui(getFieldDecorator)}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={this.handleAdd}>新增返现优惠</Button>
          <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleDelete}>删除返现优惠</Button>
          <Button type="primary" htmlType="submit">应用配置</Button>
        </Form.Item>
      </Form>}
    </div>
  }
}

export default Form.create()(CooperationHui);
