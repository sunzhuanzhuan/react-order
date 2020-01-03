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
const Settings = (props) => {
  const [current, setCurrent] = useState('discover')
  const handleClick = (e) => {
    setCurrent(e.key)
  }
  useEffect(() => {
    if (current == 'price') {
      props.actions.TPGetReadUnitPriceConfig({})
    } else if (current == 'discover') {
      props.actions.TPGetQualityConfig({})
    }
  }, [])

  const { readUnitPriceConfig, qualityConfig, addRetainTime } = props.settingReducers
  console.log(addRetainTime)
  return (
    <div>
      <Menu mode="horizontal" onClick={handleClick} selectedKeys={current}>
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
        TPReadUnitPriceConfig={props.actions.TPReadUnitPriceConfig}
        TPGetReadUnitPriceConfig={props.actions.TPGetReadUnitPriceConfig}
      /> : null}
      {current == 'discover' ? <Discover
        qualityConfig={qualityConfig}
        TPAddRetainTime={props.TPAddRetainTime}
        addRetainTime={addRetainTime} /> : null}
      {current == 'select' ? <Select /> : null}
      {current == 'weichat' ? <Weichat /> : null}
      {current == 'cooperation' ? <Cooperation /> : null}
      {current == 'notice' ? <Notice /> : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  settingReducers: state.taskPoolReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
