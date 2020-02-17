
import React, { useState, useEffect } from 'react';
import { InputNumber, Button, Icon, Tooltip, message } from 'antd';
let count = 1
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      ad: null,
      bz: null,
      totalFlag: false,
      adFlag: false,
      bzFlag: false
    }

  }
  handleTotal = () => {
    count++
    const { ad, bz, totalFlag, adFlag, bzFlag, total } = this.state
    if (totalFlag && adFlag && bzFlag) {
      this.setState({
        total: Number(ad) + Number(bz)
      })
    } else if (totalFlag && adFlag) {
      if (Number(total) - Number(ad) >= 0) {
        this.setState({
          bz: Number(total) - Number(ad)
        })
      } else {
        message.error('博主率必须大于等于0')
      }

    } else if (totalFlag && bzFlag) {
      if (Number(total) - Number(bz) >= 0) {
        this.setState({
          ad: Number(total) - Number(bz)
        })
      } else {
        message.error('广告主率必须大于等于0')
      }

    } else {
      this.setState({
        total: Number(ad) + Number(bz)
      })
    }
    this.setState({
      totalFlag: false,
      adFlag: false,
      bzFlag: false
    })
  }
  handleZo = (e) => {
    this.setState({
      total: e.target.value,
      totalFlag: true
    })
  }
  handleAd = (e) => {
    this.setState({
      ad: e.target.value,
      adFlag: true
    })

  }
  handleBz = (e) => {
    this.setState({
      bz: e.target.value,
      bzFlag: true
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
      // message.error(errorMsg || '操作失败，请重试！');
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
        <div style={{ marginLeft: '30px', overflow: 'hidden' }}>
          <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
          <div key={count} style={{ float: 'left' }}>
            <div>总抽佣率： {totalProportion > -1 && <InputNumber precision={2} step={1} defaultValue={total} onBlur={this.handleZo} min={0} />} %</div>
            <div style={{ margin: '10px 0' }}>广告主率： {adProportion > -1 && <InputNumber step={1} precision={2} min={0} onBlur={this.handleAd} defaultValue={ad} />} %</div>
            <div>博主率：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{accountProportion > -1 && <InputNumber step={1} precision={2} min={0} onBlur={this.handleBz} defaultValue={bz} />} % </div>
          </div>
          <div style={{ float: 'left', margin: '85px 30px' }}>
            <span>
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

      </div >
    );
  }
}

export default Select;
