
import React, { } from 'react';
import { Checkbox, Button } from 'antd';
const Weichat = (props) => {

  const handleApply = () => {

  }
  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <Checkbox defaultChecked></Checkbox> 新建任务时要求上传资质证明
      <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary" onClick={handleApply}>应用配置</Button></p>

      </div>
    </div>
  );
};

export default Weichat;
