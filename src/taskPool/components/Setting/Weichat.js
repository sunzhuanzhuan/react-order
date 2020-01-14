
import React, { useState } from 'react';
import { Checkbox, Button } from 'antd';
const Weichat = (props) => {
  const [arr, setArr] = useState([])
  const handleApply = () => {
    props.TPUpdateTaskCheck(arr).then(() => {
      props.TPTaskCheck()
    })
  }
  const onChange = (e, item) => {
    for (let i = 0; i < props.taskCheck.length; i++) {
      const ite = props.taskCheck[i];
      if (ite.platformId == item.platformId) {
        ite.isCheckQualification = e.target.checked == true ? 1 : 2
      }

    }
    setArr(props.taskCheck)

  }
  return (
    <div>
      {props.taskCheck && props.taskCheck.map((item, index) => {
        return <div key={index}><h2 style={{ marginTop: '20px', marginLeft: '30px', }}>{item.platformName}</h2>
          <div style={{ marginLeft: '50px' }}>
            {item.isCheckQualification && <Checkbox onChange={(e) => onChange(e, item)} defaultChecked={item.isCheckQualification == 1 ? true : false}></Checkbox>}  新建任务时要求上传资质证明


          </div></div>
      })}
      <p style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button type="primary" onClick={handleApply}>应用配置</Button></p>
    </div>
  );
};

export default Weichat;
