import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import './index.less';
import { WBYPlatformIcon } from 'wbyui';
import DataDetailsReviewWrap from './DataDetailsReviewWrap';
import { Against, Agree } from '../../base/ApprovalStatus';

/**
 * 头部信息(编辑)
 */
export class Edit extends Component {
  constructor(props, context) {
    super(props, context);
    const value = props.value || '';
    this.state = {
      editName: false,
      inputValue: value
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        inputValue: nextProps.value || ''
      };
    }
    return null;
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };

  change = () => {
    this.setState({ editName: true });
  };

  cancel = () => {
    this.setState({ editName: false });
  };
  ok = () => {
    let val = this.input.state.value;
    if (!('value' in this.props)) {
      this.setState({
        inputValue: val,
        editName: false
      });
    } else {
      this.setState({
        editName: false
      });
      this.triggerChange(val);
    }
  };

  render() {
    const titles = [
      '项目/品牌',
      '资源/项目媒介',
      '销售/执行人',
      '订单创建人',
      '分发平台',
      '账号名称'
    ];
    const values = [
      '一级帮diaper-12月 / Pampers',
      '唐芬莉 / 刘孟颖',
      '宝洁 / 蔡逸琦',
      '蔡逸琦',
      <WBYPlatformIcon key={22} weibo_type={9} widthSize={22} />,
      this.state.editName ? <div className='input-value'>
        <Input placeholder='账号名称' defaultValue={this.state.inputValue} ref={node => this.input = node} />
        <a onClick={this.ok}>确定</a>
        <a onClick={this.cancel}>取消</a>
      </div> : <div className='view-value'>
        <span>{this.state.inputValue || '--'}</span>
        <a onClick={this.change}>修改</a>
      </div>
    ];
    return <div className='platform-data-detail-module outline'>
      <Row>
        {
          titles.map((tit, n) => [
            <Col span={4} key={'1-' + n}>
              <div className='outline-title'>{tit}</div>
            </Col>,
            <Col span={8} key={'2-' + n}>
              <div className='outline-value'>{values[n]}</div>
            </Col>
          ])
        }
        {this.props.children}
      </Row>
    </div>;
  }
}

/**
 * 头部信息(查看)
 */
export class View extends Component {
  render() {
    const titles = [
      '项目/品牌',
      '资源/项目媒介',
      '销售/执行人',
      '订单创建人',
      '分发平台',
      '账号名称'
    ];
    const values = [
      '一级帮diaper-12月 / Pampers',
      '唐芬莉 / 刘孟颖',
      '宝洁 / 蔡逸琦',
      '蔡逸琦',
      <WBYPlatformIcon key={22} weibo_type={9} widthSize={22} />,
      <div className='view-value' key={32}>
        <span>账户名称</span>
      </div>
    ];
    return <div className='platform-data-detail-module outline'>
      <Row>
        {
          titles.map((tit, n) => [
            <Col span={4} key={'1-' + n}>
              <div className='outline-title'>{tit}</div>
            </Col>,
            <Col span={8} key={'2-' + n}>
              <div className='outline-value'>{values[n]}</div>
            </Col>
          ])
        }
      </Row>
      {this.props.children}
    </div>;
  }
}

/**
 * 头部信息(审核) - 使用范例
 */
export class Review extends Component {
  componentWillMount() {}

  render() {
    return <DataDetailsReviewWrap form={this.props.form}>
      {/*<View><Agree/></View>*/}
      <Edit form={this.props.form}>
        <Col span={8} offset={16}>
          <Against reason={'asdasdasdwww qweqweqwe'} maxWidth={200} />
        </Col>
      </Edit>
    </DataDetailsReviewWrap>;
  }
}

export default {
  Edit,
  View
};
