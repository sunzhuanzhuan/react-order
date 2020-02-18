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
      // current: 'price'
    }
    //是评估师
    this.isAssessor = props.authorizationsReducers.authVisibleList['appraiserTab']
    //是合作平台执行
    this.isPlatformExecution =
      props.authorizationsReducers.authVisibleList['cooperation.platform.navigation.tab']
    //超级管理员
    this.isLeader =
      props.authorizationsReducers.authVisibleList['admin.check.user']
  }

  componentDidMount = () => {
    if (this.isAssessor) {
      this.handleDealTab('price')
      this.setState({
        current: 'price'
      })
    } else if (this.isPlatformExecution) {
      this.handleDealTab('cooperation')
      this.setState({
        current: 'cooperation'
      })
    } else {
      this.handleDealTab('price')
      this.setState({
        current: 'price'
      })
    }

  }

  handleDealTab = (key) => {
    if (key == 'price') {
      this.props.actions.TPGetReadUnitPriceConfig({})
    } else if (key == 'discover') {
      this.props.actions.TPGetQualityConfig({})
    } else if (key == 'select') {
      this.props.actions.TPQueryCommissionConfig()
    } else if (key == 'weichat') {
      this.props.actions.TPTaskCheck()
    } else if (key == 'notice') {
      let params = {
        page: {
          currentPage: 1,
          pageSize: 100
        },
        form: {
          platformId: 9,
          notificationType: 11
        }
      }
      this.props.actions.TPGetNotificationList(params)
    } else {
      this.props.actions.TPGetDimensionConfig({})
      this.props.actions.TPGetTaskLaunchConfigLiang({ offerType: 3 })
      this.props.actions.TPGetTaskLaunchConfigTian({ offerType: 1 })
      this.props.actions.TPGetTaskLaunchConfigHui({ offerType: 4 })

    }
  }
  handleClick = (e) => {
    const { current } = this.state
    this.setState({ current: e.key })
    this.handleDealTab(e.key)
  }
  render() {
    let { readUnitPriceConfig, qualityConfig, addRetainTime, commissionConfig, taskCheck, notificationList,
      dimensionConfig, taskLaunchConfigLiang, taskLaunchConfigTian, taskLaunchConfigHui, userInfo, tpUserInfo } = this.props.settingReducers
    const { current } = this.state
    return (
      <div>
        <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={current}>
          {this.isAssessor && <Menu.Item key="price">
            建议博主报价
          </Menu.Item>}
          {this.isAssessor && <Menu.Item key="discover">
            质检配置
          </Menu.Item>}
          {this.isLeader && <Menu.Item key="select">
            抽佣率配置
          </Menu.Item>}
          {this.isPlatformExecution && <SubMenu
            title={
              <span className="submenu-title-wrapper">
                任务配置
              </span>
            }
          >
            <Menu.ItemGroup >
              {this.isLeader && <Menu.Item key="weichat">微信公众号</Menu.Item>}
              {this.isPlatformExecution && <Menu.Item key="cooperation">合作平台</Menu.Item>}
            </Menu.ItemGroup>
          </SubMenu>}
          {this.isAssessor && <Menu.Item key="notice">
            通知配置
          </Menu.Item>}
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
        {current == 'weichat' ? <Weichat taskCheck={taskCheck}
          TPTaskCheck={this.props.actions.TPTaskCheck}
          TPUpdateTaskCheck={this.props.actions.TPUpdateTaskCheck} /> : null}
        {current == 'cooperation' ? <Cooperation
          TPDimensionConfig={this.props.actions.TPDimensionConfig}
          TPGetDimensionConfig={this.props.actions.TPGetDimensionConfig}
          TPUpdateTaskLaunchConfig={this.props.actions.TPUpdateTaskLaunchConfig}
          TPDeleteTaskLaunch={this.props.actions.TPDeleteTaskLaunch}
          TPDeleteDimension={this.props.actions.TPDeleteDimension}
          dimensionConfig={dimensionConfig}
          taskLaunchConfigLiang={taskLaunchConfigLiang}
          taskLaunchConfigTian={taskLaunchConfigTian}
          taskLaunchConfigHui={taskLaunchConfigHui}
          TPGetTaskLaunchConfigLiang={this.props.actions.TPGetTaskLaunchConfigLiang}
          TPGetTaskLaunchConfigTian={this.props.actions.TPGetTaskLaunchConfigTian}
          TPGetTaskLaunchConfigHui={this.props.actions.TPGetTaskLaunchConfigHui}
        /> : null}
        {current == 'notice' ? <Notice
          notificationList={notificationList}
          login={this.props.login}
          userInfo={userInfo}
          tpUserInfo={tpUserInfo}
          TPUpdateUserInfo={this.props.actions.TPUpdateUserInfo}
          TPQueryUserInfo={this.props.actions.TPQueryUserInfo}
          TPGetNotificationList={this.props.actions.TPGetNotificationList}
          TPUpdateNotice={this.props.actions.TPUpdateNotice}
        /> : null}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  settingReducers: state.taskPoolReducers,
  login: state.loginReducer,
  authorizationsReducers: state.authorizationsReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
