
import React, { useState, useEffect } from 'react';
import { InputNumber, Button, Checkbox, Modal, message } from 'antd';

const Discover = (props) => {
  const [visible, setVisible] = useState(false)
  const [isAdd, setIsAdd] = useState('add')
  const [timeVal, setTimeVal] = useState(null)
  let saveArrTime = props.qualityConfig && props.qualityConfig.retainTimeList
  // useEffect(() => {
  //   if () {
  //     setSaveArrTime(props.qualityConfig.retainTimeList)
  //   }
  // }, [])

  const handleOk = () => {
    if (isNaN(timeVal)) {
      message.error('请输入数字')
    } else {
      props.TPAddRetainTime({ retainTime: timeVal, isOnline: 2 }).then((res) => {
        saveArrTime([...saveArrTime, ...res.data])
      })
      setVisible(false)
    }

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
  const onSaveTime = (value) => {
    setTimeVal(value)
    console.log(value)

  }
  console.log(saveArrTime)

  return (
    <div>

      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ marginTop: '10px' }}>回执链接时限设置</h3>
        <span>时限设置为 {props.qualityConfig.contentUrlTimeout && <InputNumber precision={0} min={0} defaultValue={props.qualityConfig.contentUrlTimeout} />} 小时</span>
        <h3 style={{ marginTop: '10px' }}>第一次质检文本匹配率设置</h3>
        <span>文本匹配率不低于{props.qualityConfig.textSimilarity && <InputNumber style={{ width: '50px' }} precision={0} min={1} max={100} defaultValue={props.qualityConfig.textSimilarity} />}%时，第一次质检合格</span>
        <h3 style={{ marginTop: '10px' }}>保留时长设置</h3>
        <p><Checkbox value="24" defaultChecked>24小时</Checkbox></p>
        <p><Checkbox value="48" defaultChecked>48小时</Checkbox></p>
        {saveArrTime.map((item, index) => {
          return <p key={index}>
            <Checkbox value={item.retainTime} defaultChecked={item.isOnline == 1 ? true : false}>{item.retainTime}小时</Checkbox>
            <Button type="link" onClick={() => handleOpenModal(false)}>删除</Button>
          </p>
        })}

        {/* <p><Checkbox value="48" defaultChecked>48小时</Checkbox></p>
        <p><Checkbox value="72" defaultChecked>72小时</Checkbox></p> */}
        <Button type="primary" onClick={() => handleOpenModal(true)}>新增保留时长</Button>
        <Modal
          title="新增保留时长"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {isAdd ? <p>新增保留时长：<InputNumber id="readTime" onChange={onSaveTime} />小时</p> : <p>确定要删除“72小时”的保留时长选项么?</p>}
        </Modal>
      </div>
      <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary">应用配置</Button></p>

    </div>
  );
};

export default Discover;
