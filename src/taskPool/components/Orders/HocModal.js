import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'

const HocModal = props => {
  const [visible, setVisible] = useState(false);
  function onOK({ callback }) {
    callback ? callback() && setVisible(false) : setVisible(false)
  }
  return (
    <>
      {props.clickCmp ? <props.clickCmp onClick={() => setVisible(true)} /> : null}
      <Modal
        {...props}
        visible={visible}
        onOk={onOK}
        onCancel={() => setVisible(false)}
      >
        {props.contentCmp ? <props.contentCmp setVisible={setVisible} /> : null}
      </Modal>
    </>
  );
};
export default HocModal;
