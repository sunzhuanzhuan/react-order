
import React, { } from 'react';
import { Checkbox } from 'antd';
const Weichat = (props) => {

  return (
     <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
      <Checkbox defaultChecked></Checkbox> 新建任务时要求上传资质证明
    </div>
    </div>
  );
};

export default Weichat;
