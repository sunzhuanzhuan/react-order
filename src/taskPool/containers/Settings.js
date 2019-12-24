/**
 * Created by lzb on 2019-12-03.
 */
import React, { useState } from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const Settings = (props) => {
  const [current, setCurrent] = useState('bozhu')
  const handleClick = (e) => {
    setCurrent(e.key)
  }
  return (
    <div>
      <Menu mode="horizontal" onClick={handleClick} selectedKeys={current}>
        <Menu.Item key="bozhu">
          建议博主报价
        </Menu.Item>
        <Menu.Item key="zhijian">
          质检配置
        </Menu.Item>
        <Menu.Item key="chouyong">
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
            <Menu.Item key="weixin">微信公众号</Menu.Item>
            <Menu.Item key="cooperation">合作平台</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="tongzhi">
          通知配置
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Settings;
