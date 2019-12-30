
import React, { useState } from 'react';
import { InputNumber, Button, Icon, Tooltip } from 'antd';
const Select = (props) => {

  const [total, setTotal] = useState(null)
  const [ad, setAd] = useState(null)
  const [bz, setBz] = useState(null)

  const handleTotal = () => {
    setTotal(Number(ad) + Number(bz))
  }
  const handleAd = (e) => {
    setAd(e.target.value)

  }
  const handleBz = (e) => {
    setBz(e.target.value)

  }
  return (
    <div>
      <div style={{ marginLeft: '30px' }}>
        <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
        <p>总抽佣率： <InputNumber precision={2} value={total} /> %</p>
        <p>广告主率： <InputNumber precision={2} min={0} max={100} onBlur={handleAd} /> %</p>
        <p>博主率：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<InputNumber precision={2} min={0} max={100} onBlur={handleBz} /> %
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>
            <Tooltip placement="topLeft" title={'总抽佣率=广告主率+博主率'}>
              <Button type="link" onClick={handleTotal}>计算</Button>
            </Tooltip>
            <span>提示
            <Tooltip placement="topLeft" title={'只需设定两个抽佣率即可'}>
                <Icon type="question-circle" />
              </Tooltip>
            </span>
          </span>
        </p>
      </div>
      <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary">应用配置</Button></p>

    </div>
  );
};

export default Select;
