
import React, { useState } from 'react';
import { InputNumber, Button, Checkbox, Modal } from 'antd';

const Discover = (props) => {
  const [visible, setVisible] = useState(false)
  const [isAdd, setIsAdd] = useState('add')
  const handleOk = () => {
    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleOpenModal = (val) => {
    setVisible(true)
    setIsAdd(val)
  }
  const handleDelete = () => {

  }
  return (
    <div>

      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ marginTop: '10px' }}>回执链接时限设置</h3>
        <span>时限设置为 <InputNumber precision={0} /> 小时</span>
        <h3 style={{ marginTop: '10px' }}>第一次质检文本匹配率设置</h3>
        <span>文本匹配率不低于 <InputNumber precision={0} min={1} max={100} />%时，第一次质检合格</span>
        <h3 style={{ marginTop: '10px' }}>保留时长设置</h3>
        <p><Checkbox value="24" defaultChecked>24小时</Checkbox></p>
        <p><Checkbox value="48" defaultChecked>48小时</Checkbox></p>
        <p><Checkbox value="72" defaultChecked>72小时</Checkbox><Button type="link" onClick={() => handleOpenModal(false)}>删除</Button></p>
        <Button type="primary" onClick={() => handleOpenModal(true)}>新增保留时长</Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {isAdd ? <p>新增保留时长：<InputNumber />小时</p> : <p>确定要删除“72小时”的保留时长选项么?</p>}
        </Modal>
      </div>
      <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary">应用配置</Button></p>

    </div>
  );
};

export default Discover;
