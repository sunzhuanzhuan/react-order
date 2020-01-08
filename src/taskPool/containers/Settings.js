/**
 * Created by lzb on 2019-12-03.
 */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import * as actions from '@/taskPool/actions';
import Price from '../components/Setting/Price';
import Discover from '../components/Setting/Discover';
import Select from '../components/Setting/Select';
import Weichat from '../components/Setting/Weichat';
import Cooperation from '../components/Setting/Cooperation';
import Notice from '../components/Setting/Notice';

const { SubMenu } = Menu;
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'weichat'
    }
  }
  componentDidMount = () => {
    const { current } = this.state
    this.handleDealTab(current)

  }

  handleDealTab = (key) => {
    if (key == 'price') {
      this.props.actions.TPGetReadUnitPriceConfig({})
    } else if (key == 'discover') {
      this.props.actions.TPGetQualityConfig({})
    } else if (key == 'select') {
      this.props.actions.TPQueryCommissionConfig()
    }
  }
  handleClick = (e) => {
    const { current } = this.state
    this.setState({ current: e.key })
    this.handleDealTab(e.key)
  }
  render() {
    let { readUnitPriceConfig, qualityConfig, addRetainTime, commissionConfig, taskCheckConfig } = this.props.settingReducers
    const { current } = this.state
    return (
      <div>
        <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={current}>
          <Menu.Item key="price">
            建议博主报价
          </Menu.Item>
          <Menu.Item key="discover">
            质检配置
          </Menu.Item>
          <Menu.Item key="select">
            抽佣率配置
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                任务配置
              </span>
            }
          >
            <Menu.ItemGroup >
              <Menu.Item key="weichat">微信公众号</Menu.Item>
              <Menu.Item key="cooperation">合作平台</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="notice">
            通知配置
          </Menu.Item>
        </Menu>
        {current == 'price' ? <Price readUnitPriceConfig={readUnitPriceConfig}
          TPReadUnitPriceConfig={this.props.actions.TPReadUnitPriceConfig}
          TPGetReadUnitPriceConfig={this.props.actions.TPGetReadUnitPriceConfig}
        /> : null}
        {current == 'discover' ? <Discover
          TPChangeQualityConfig={this.props.actions.TPChangeQualityConfig}
          TPGetQualityConfig={this.props.actions.TPGetQualityConfig}
          qualityConfig={qualityConfig}
          TPAddRetainTime={this.props.actions.TPAddRetainTime}
          addRetainTime={addRetainTime} /> : null}
        {current == 'select' ? <Select
          commissionConfig={commissionConfig}
          TPUpdateCommissionConfig={this.props.actions.TPUpdateCommissionConfig}
          TPQueryCommissionConfig={this.props.actions.TPQueryCommissionConfig} /> : null}
        {current == 'weichat' ? <Weichat taskCheckConfig={taskCheckConfig} /> : null}
        {current == 'cooperation' ? <Cooperation /> : null}
        {current == 'notice' ? <Notice /> : null}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  settingReducers: state.taskPoolReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
