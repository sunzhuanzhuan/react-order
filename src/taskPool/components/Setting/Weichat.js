
import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
const Weichat = (props) => {
  const [isCheck, setIsCheck] = useState(null)
  const handleApply = () => {
    let config = ''
    if (isCheck == null) {
      config = props.taskCheck.isCheckQualification
    } else {
      config = isCheck == true ? 1 : 2
    }
    props.TPUpdateTaskCheck({ platformId: 9, isCheckQualification: config }).then(() => {
      props.TPTaskCheck()
    })
  }
  const onChange = (e) => {
    setIsCheck(e.target.checked)
  }
  const { isCheckQualification } = props.taskCheck
  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        {isCheckQualification && <Checkbox onChange={onChange} defaultChecked={isCheckQualification == 1 ? true : false}></Checkbox>}  新建任务时要求上传资质证明
      <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary" onClick={handleApply}>应用配置</Button></p>

      </div>
    </div>
  );
};

export default Weichat;
