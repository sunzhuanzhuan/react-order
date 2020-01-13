
import React, { useState, useEffect } from 'react';
import { InputNumber, Button, Checkbox, Modal, message } from 'antd';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isAdd: 'add',
      timeVal: null,
      saveArrTime: props.qualityConfig.retainTimeList || [],
      item: {},
      deleteArr: [],
      selectArr: [],
      textSimilar: props.qualityConfig.textSimilarity,
      contentTime: props.qualityConfig.contentUrlTimeout
    }

  }
  componentWillReceiveProps = (props) => {
    this.setState({
      saveArrTime: props.qualityConfig.retainTimeList,
      textSimilar: props.qualityConfig.textSimilarity,
      contentTime: props.qualityConfig.contentUrlTimeout
    })
  }

  handleOk = () => {
    if (this.state.isAdd) {
      if (isNaN(this.state.timeVal) || this.state.timeVal == null) {
        message.error('请输入数字')
      } else {
        this.props.TPAddRetainTime({ retainTime: this.state.timeVal, isOnline: 2 }).then((res) => {
          this.state.saveArrTime.push(res.data)
          this.setState({ visible: false })
        })
      }
    }
    else {
      this.state.saveArrTime.map((ite, index) => {
        if (ite.id == this.state.item.id) {
          this.state.deleteArr.push(ite)
          this.state.saveArrTime.splice(index, 1);
          this.setState({ visible: false })
        }
      })
    }


  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleOpenModal = (val, item) => {
    this.setState({
      visible: true,
      isAdd: val,
      item: item
    })
  }

  onSaveTime = (value) => {
    this.setState({
      timeVal: value
    })

  }
  handleApply = () => {
    let dele = this.state.deleteArr.map((item) => {
      return Object.assign(item, { isDeleted: 1 })
    })
    let select = this.state.selectArr.map((item) => {
      return Object.assign(item, { isOnline: 1 })
    })
    let params = {
      contentUrlTimeout: this.state.contentTime,
      textSimilarity: this.state.textSimilar,
      retainTimeList: [...dele, ...select]
    }
    this.props.TPChangeQualityConfig(params).then(() => {
      this.props.TPGetQualityConfig({})
      message.success('设置成功', 3)
    })

    // console.log(dele)
    // console.log(select)
  }
  handleChange = (e) => {
    if (e.target.checked) {
      this.state.saveArrTime.map((item) => {
        if (e.target.value == item.id) {
          this.state.selectArr.push(item)
        }
      })
    } else {
      this.state.selectArr.map((item, index) => {
        if (e.target.value == item.id) {
          this.state.selectArr.splice(index, 1)
        }
      })
    }

  }
  textSimilar = (value) => {
    this.setState({
      textSimilar: value
    })
  }
  contentTime = (value) => {
    this.setState({
      contentTime: value
    })
  }
  render() {
    const { visible, isAdd, saveArrTime = [], item } = this.state;
    return <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ marginTop: '10px' }}>回执链接时限设置</h3>
        <span>时限设置为 {this.props.qualityConfig.contentUrlTimeout && <InputNumber precision={0} onChange={this.contentTime} min={0} defaultValue={this.props.qualityConfig.contentUrlTimeout} />} 小时</span>
        <h3 style={{ marginTop: '10px' }}>第一次质检文本匹配率设置</h3>
        <span>文本匹配率不低于{this.props.qualityConfig.textSimilarity && <InputNumber style={{ width: '50px' }} onChange={this.textSimilar} precision={0} min={1} max={100} defaultValue={this.props.qualityConfig.textSimilarity} />}%时，第一次质检合格</span>
        <h3 style={{ marginTop: '10px' }}>保留时长设置</h3>
        <p><Checkbox value="24" checked={true}>24小时</Checkbox></p>
        <p><Checkbox value="48" checked={true}>48小时</Checkbox></p>
        <Checkbox.Group>
          {saveArrTime.map((item, index) => {
            return <p key={index}>
              <Checkbox value={item.id} defaultChecked={item.isOnline == 1 ? true : false} onChange={this.handleChange}>{item.retainTime}小时</Checkbox>
              <Button type="link" onClick={() => this.handleOpenModal(false, item)}>删除</Button>
            </p>
          })}
        </Checkbox.Group>

        {/* <p><Checkbox value="48" defaultChecked>48小时</Checkbox></p>
          <p><Checkbox value="72" defaultChecked>72小时</Checkbox></p> */}
        <Button type="primary" onClick={() => this.handleOpenModal(true)}>新增保留时长</Button>
        <Modal
          title="新增保留时长"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <div>{isAdd ? <div>新增保留时长：<InputNumber id="readTime" onChange={this.onSaveTime} />小时</div> : <div>确定要删除“{item.retainTime}小时”的保留时长选项么?</div>}</div>
        </Modal>
      </div>
      <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary" onClick={this.handleApply} >应用配置</Button></p>

    </div >
  }
}

export default Discover;
