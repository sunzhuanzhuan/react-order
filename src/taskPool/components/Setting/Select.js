
import React, { useState, useEffect } from 'react';
import { InputNumber, Button, Icon, Tooltip, message } from 'antd';
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: props.totalProportion,
      ad: props.adProportion,
      bz: props.accountProportion
    }

  }
  handleTotal = () => {
    const { ad, bz } = this.state
    this.setState({
      total: Number(ad) + Number(bz)
    })
  }
  handleAd = (e) => {
    this.setState({
      ad: e.target.value
    })

  }
  handleBz = (e) => {
    this.setState({
      bz: e.target.value
    })

  }
  handleApply = () => {
    const { total, ad, bz } = this.state
    let params = {
      totalProportion: Number(total),
      adProportion: Number(ad),
      accountProportion: Number(bz),
      platformId: '9'
    }
    if (Number(total) != Number(ad) + Number(bz)) {
      message.error('请检查计算是否准确')
      return
    }
    this.props.TPUpdateCommissionConfig(params).then(() => {
      message.success('设置成功')
      this.props.TPQueryCommissionConfig()
    }).catch(({ errorMsg }) => {
      message.error(errorMsg || '操作失败，请重试！');
    })
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      total: props.commissionConfig.totalProportion,
      ad: props.commissionConfig.adProportion,
      bz: props.commissionConfig.accountProportion
    })
  }
  render() {
    const { totalProportion, adProportion, accountProportion } = this.props.commissionConfig;
    const { total, ad, bz } = this.state
    return (
      <div>
        <div style={{ marginLeft: '30px' }}>
          <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
          <div>总抽佣率： {totalProportion && <InputNumber precision={2} defaultValue={totalProportion} value={total} min={0} />} %</div>
          <div style={{ margin: '10px 0' }}>广告主率： {adProportion && <InputNumber precision={2} value={ad} min={0} onBlur={this.handleAd} defaultValue={ad} />} %</div>
          <div>博主率：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{accountProportion && <InputNumber precision={2} value={bz} min={0} onBlur={this.handleBz} defaultValue={bz} />} %
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>
              <Tooltip placement="topLeft" title={'总抽佣率=广告主率+博主率'}>
                <Button type="link" onClick={this.handleTotal}>计算</Button>
              </Tooltip>
              <span>提示
            <Tooltip placement="topLeft" title={'只需设定两个抽佣率即可'}>
                  <Icon type="question-circle" />
                </Tooltip>
              </span>
            </span>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '40px' }}><Button type="primary" onClick={this.handleApply}>应用配置</Button></p>

      </div>
    );
  }
}

export default Select;
