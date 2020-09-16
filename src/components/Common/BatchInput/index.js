import React, { Component } from 'react'
import { Modal, Input } from 'antd'
import './index.less'
const TextArea = Input.TextArea
//批量组件输入

class BatchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            batchText: '',
            showBatchModal: false
        }
    }

    //打开批量输入弹窗
    handleBatch = () => {
        const { value } = this.props
        this.setState({
            batchText: value && value.split(',').join('\n'),
            showBatchModal: true
        })
    }

    // 处理批量输入
    handleOk = () => {
        const { max = 100 } = this.props
        let { batchText } = this.state
        let tmp = batchText.replace(/\n/g, '')
        const arr = batchText.split('\n').filter(v => {
            if (v) {
                return v
            }
        })
        const reg = /^[1-9]\d*$/

        let ary = reg.test(tmp) && arr.length <= max;

        if (ary) {
            this.setState({
                showBatchModal: false
            });
        } else {
            Modal.error({
                title: '提示',
                content: <div className='color-high-light'>
                    仅允许输入纯数字，每行一个，最多{max}个！
                </div>,
                okText: '确定',
                mask: false
            })
        }
    }

    render () {
        const { width = '210px' } = this.props
        return <span className='batch-input-modal-wrap'>
            <Input style={{ width: width }}
                onChange={this.props.onChange}
                value={this.props.value}
            />
            <span className='trigger-wrap'>
                <a onClick={this.handleBatch}>批量输入</a>
            </span>
            <Modal
                title="批量输入"
                visible={this.state.showBatchModal}
                onOk={this.handleOk}
                onCancel={() => {
                    this.setState({ showBatchModal: false })
                }}
                bodyStyle={{ padding: '16px' }}
            >
                <p>请输入数据，一行为一项</p>
                <TextArea
                    value={this.state.batchText}
                    autoSize={{ minRows: 5, maxRows: 8 }}
                    onInput={(e) => {
                        this.setState({ batchText: e.target.value })
                    }}
                />
            </Modal>
        </span>
    }
}

export default BatchInput