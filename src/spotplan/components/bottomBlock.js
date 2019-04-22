import React from 'react'
import { Button, Modal, Table } from 'antd'
import { CheckModalFunc } from '../constants'
import './bottomBlock.less'

class BottomBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }
  toggleVisible = boolean => {
    this.setState({ visible: boolean })
  }
  render() {
    const { current, handleSteps, orderMaps = {}, handlDel, data, search } = this.props;
    const { visible } = this.state;
    return <div className='bottom-block'>
      {current == 1 && <div className='right-block'><Button type='primary' onClick={() => {
        handleSteps(2, 'go')
      }}>下一步</Button>
      </div>}
      {current == 2 && <>
        <div className='left-block'>
          {!search.noback && <Button onClick={() => {
            handleSteps(1)
          }}>上一步</Button>}
        </div>
        <div className='right-block'>
          <span style={{ paddingRight: '20px' }}>已选订单：<a href='javascript:;' onClick={() => {
            this.toggleVisible(true);
          }}>{Object.values(orderMaps).length || 0}个</a></span>
          <Button type='primary' onClick={() => {
            handleSteps(3)
          }}>下一步</Button>
        </div></>}
      {current == 3 && <>
        <div className='left-block'>
          <Button onClick={() => {
            handleSteps(2, 'back')
          }}>上一步</Button>
        </div>
        <div className='right-block'>
          <span style={{ paddingRight: '20px' }}>已选订单：<span className='primary-font'>{data && data.total || 0}</span></span>
          <span style={{ paddingRight: '20px' }}>Cost总计：<span className='primary-font'>{data && data.cost_num || 0}元</span></span>
          <span style={{ paddingRight: '20px' }}>Costwithfee总计：<span className='primary-font'>{data && data.costwithfee_num || 0}元</span></span>
          <Button onClick={() => {
            handleSteps(4)
          }}>存为草稿</Button>
          <Button type='primary' onClick={() => {
            handleSteps(4, 'submit')
          }}>提交</Button>
        </div></>}
      {visible && <CheckModal visible={visible} data={orderMaps} handlDel={handlDel}
        onCancel={() => {
          this.toggleVisible(false)
        }} />}
    </div>
  }
}

class CheckModal extends React.PureComponent {
  render() {
    const { visible, onCancel, data = {}, handlDel } = this.props;
    const dataAry = Object.values(data);
    const CheckModalCols = CheckModalFunc(handlDel);
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
        <p>已选订单：<span className='primary-font'>{dataAry.length || '0'}个</span></p>
        <Table
          rowKey='order_id'
          columns={CheckModalCols}
          dataSource={dataAry}
          bordered
          scroll={dataAry.length > 10 ? { y: 560 } : {}}
        />
      </>
    </Modal>
  }
}

export default BottomBlock
