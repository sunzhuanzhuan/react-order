
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
      contentTime: props.qualityConfig.contentUrlTimeout,
      arr: [],
      noSelect: []
    }

  }
  componentWillReceiveProps = (props) => {
    props.qualityConfig.retainTimeList && props.qualityConfig.retainTimeList.map((item) => {
      if (item.isOnline == 1) {
        this.state.arr.push(item.id)
      }

    })
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
          delete ite.isOnline
          this.state.deleteArr.push(ite)
          this.state.saveArrTime.splice(index, 1);
          this.setState({ visible: false })
        }
      })
      this.state.selectArr.map((ite, index) => {
        if (ite.id == this.state.item.id) {
          this.state.selectArr.splice(index, 1);
        }
      })
      this.state.noSelect.map((ite, index) => {
        if (ite.id == this.state.item.id) {
          this.state.noSelect.splice(index, 1);
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
    let noSelect = this.state.noSelect.map((item) => {
      return Object.assign(item, { isOnline: 2 })
    })
    let params = {
      contentUrlTimeout: this.state.contentTime,
      textSimilarity: this.state.textSimilar,
      retainTimeList: [...dele, ...select, ...noSelect],
      platformId: '9'
    }

    console.log(params);
    // console.log(noSelect)
    // console.log(select)
    this.props.TPChangeQualityConfig(params).then(() => {
      this.props.TPGetQualityConfig({})
      message.success('设置成功', 3)
    }).catch(({ errorMsg }) => {
      // message.error(errorMsg || '操作失败，请重试！');
    })


  }
  handleChange = (e) => {
    if (e.target.checked) {
      this.state.saveArrTime.map((item) => {
        if (e.target.value == item.id) {
          this.state.selectArr.push(item)
        }
      })
    } else {
      this.state.saveArrTime.map((item, index) => {
        if (e.target.value == item.id) {
          this.state.noSelect.push(item)
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
    const { visible, isAdd, saveArrTime = [], item, arr } = this.state;
    return <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ marginTop: '10px' }}>回执链接时限设置</h3>
        <span>时限设置为 {this.props.qualityConfig.contentUrlTimeout > -1 ? <InputNumber style={{ width: '60px' }} precision={0} onChange={this.contentTime} min={0} defaultValue={this.props.qualityConfig.contentUrlTimeout} /> : null} 小时</span>
        <h3 style={{ marginTop: '10px' }}>第一次质检文本匹配率设置</h3>
        <span>文本匹配率不低于{this.props.qualityConfig.textSimilarity > -1 ? <InputNumber style={{ width: '60px' }} onChange={this.textSimilar} precision={0} min={0} max={100} defaultValue={this.props.qualityConfig.textSimilarity} /> : null}%时，第一次质检合格</span>
        <h3 style={{ marginTop: '10px' }}>保留时长设置</h3>
        <p><Checkbox value="24" checked={true}>24小时</Checkbox></p>
        <p><Checkbox value="48" checked={true}>48小时</Checkbox></p>
        <Checkbox.Group defaultValue={arr}>
          {saveArrTime.map((item, index) => {
            return <p key={index}>
              <Checkbox value={item.id} onChange={this.handleChange}>{item.retainTime}小时</Checkbox>
              <Button type="link" onClick={() => this.handleOpenModal(false, item)} disabled={this.props.btnDisable}>删除</Button>
            </p>
          })}
        </Checkbox.Group>
        <p><Button type="primary" onClick={() => this.handleOpenModal(true)} disabled={this.props.btnDisable}>新增保留时长</Button></p>
        <Modal
          title="新增保留时长"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <div>{isAdd ? <div>新增保留时长：<InputNumber id="readTime" onChange={this.onSaveTime} min={0} />小时</div> : <div>确定要删除“{item.retainTime}小时”的保留时长选项么?</div>}</div>
        </Modal>
      </div>
      <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary" onClick={this.handleApply} disabled={this.props.btnDisable}>应用配置</Button></p>

    </div >
  }
}

export default Discover;
