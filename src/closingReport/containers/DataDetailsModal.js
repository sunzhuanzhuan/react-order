import React, { Component } from "react"
import { Modal } from 'antd'

export default class DataDetailsModal extends Component {
    componentWillMount() {}
    render() {
        return <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    }
}
