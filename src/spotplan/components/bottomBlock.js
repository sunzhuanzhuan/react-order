import React from 'react'
import { Button, Modal, Table, Form } from 'antd'
import { CheckModalCols, EditOrderCols } from '../constants'
import './bottomBlock.less'
export default class BottomBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }
  toggleVisible = boolean => {
    this.setState({ visible: boolean })
  }
  toggleLeadVisible = boolean => {
    this.setState({ leadVisible: boolean })
  }
  render() {
    const { current, handleSteps } = this.props;
    const { visible, leadVisible } = this.state;
    return <div className='bottom-block'>
      {current == 0 && <div className='right-block'><Button type='primary' onClick={() => {
        handleSteps(1)
      }}>下一步</Button>
      </div>}
      {current == 1 && <>
        <div className='left-block'>
          <Button onClick={() => {
            // this.props.history.goBack()
            handleSteps(0)
          }}>上一步</Button>
        </div>
        <div className='right-block'>
          <span style={{ paddingRight: '20px' }}>已选订单：<a href='javascript:;' onClick={() => {
            this.toggleVisible(true);
          }}>12个</a></span>
          <Button type='primary' onClick={() => {
            handleSteps(2)
          }}>下一步</Button>
        </div></>}
      {current == 2 && <>
        <div className='left-block'>
          <Button onClick={() => {
            // this.props.history.goBack()
            handleSteps(1)
          }}>上一步</Button>
        </div>
        <div className='right-block'>
          <span style={{ paddingRight: '20px' }}>已选订单：<a href='javascript:;' onClick={() => {
            this.toggleVisible(true);
          }}>12个</a></span>
          <span style={{ paddingRight: '20px' }}>Cost总计：<span className='primary-font'>66666.00 元</span></span>
          <span style={{ paddingRight: '20px' }}>Costwithfee总计：<span className='primary-font'>777096.00 元</span></span>
          <Button onClick={() => {
            console.log(1);
          }}>存为草稿</Button>
          <Button type='primary' onClick={() => {
            console.log(2);
          }}>提交</Button>
        </div></>}
      {visible && <CheckModal visible={visible} onCancel={() => {
        this.toggleVisible(false)
      }} />}
    </div>
  }
}

class CheckModal extends React.PureComponent {
  render() {
    const { visible, onCancel } = this.props;
    return <Modal
      wrapClassName='checkOrder-modal'
      key='checkOrder'
      width={960}
      title='查看已选订单'
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        [
          <Button key="back" type='primary' onClick={onCancel}>关闭</Button>,
        ]}
    >
      <>
        <p>已选订单：<span className='primary-font'>12个</span></p>
        <Table columns={CheckModalCols}

        />
      </>
    </Modal>
  }
}
