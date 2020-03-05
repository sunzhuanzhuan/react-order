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
      btnDisable: false,
      assessor: false,
      platformExecution: false,
      leader: false
    }
    //是评估师
    this.isAssessor = props.authorizationsReducers.authVisibleList['appraiserTab']
    //是合作平台执行
    this.isPlatformExecution =
      props.authorizationsReducers.authVisibleList['cooperation.platform.navigation.tab']
    //类似于超级管理员
    this.isLeader =
      props.authorizationsReducers.authVisibleList['sales.operation.product.admin']
  }

  componentDidMount = () => {
    if (this.isLeader) {
      this.handleDealTab('price')
      this.setState({
        current: 'price',
        leader: true,
        platformExecution: true,
        assessor: true
      })
    } else if (this.isPlatformExecution) {
      this.handleDealTab('cooperation')
      this.setState({
        current: 'cooperation',
        platformExecution: true
      })
    } else {
      this.handleDealTab('price')
      this.setState({
        current: 'price',
        assessor: true
      })
    }

  }

  handleDealTab = (key) => {
    if (key == 'price') {
      this.props.actions.TPGetReadUnitPriceConfig({}).then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
    } else if (key == 'discover') {
      this.props.actions.TPGetQualityConfig({}).then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
    } else if (key == 'select') {
      this.props.actions.TPQueryCommissionConfig().then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
    } else if (key == 'weichat') {
      this.props.actions.TPTaskCheck().then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
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
      this.props.actions.TPGetNotificationList(params).then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
    } else {
      this.props.actions.TPGetDimensionConfig({}).then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
      this.props.actions.TPGetTaskLaunchConfigLiang({ offerType: 3 }).then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
      this.props.actions.TPGetTaskLaunchConfigTian({ offerType: 1 }).then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })
      this.props.actions.TPGetTaskLaunchConfigHui({ offerType: 4 }).then(() => {
        this.setState({ btnDisable: false })
      }).catch(({ code }) => {
        if (code == 5004) {
          this.setState({ btnDisable: true })
        }
      })

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
    const { current, leader, platformExecution, assessor, btnDisable } = this.state
    return (
      <div>
        <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={current}>
          {assessor && <Menu.Item key="price">
            建议博主报价
          </Menu.Item>}
          {assessor && <Menu.Item key="discover">
            质检配置
          </Menu.Item>}
          {leader && <Menu.Item key="select">
            抽佣率配置
          </Menu.Item>}
          {platformExecution && <SubMenu
            title={
              <span className="submenu-title-wrapper">
                任务配置
              </span>
            }
          >
            <Menu.ItemGroup >
              {leader && <Menu.Item key="weichat">微信公众号</Menu.Item>}
              {platformExecution && <Menu.Item key="cooperation">合作平台</Menu.Item>}
            </Menu.ItemGroup>
          </SubMenu>}
          {assessor && <Menu.Item key="notice">
            通知配置
          </Menu.Item>}
        </Menu>
        {current == 'price' ? <Price readUnitPriceConfig={readUnitPriceConfig}
          TPReadUnitPriceConfig={this.props.actions.TPReadUnitPriceConfig}
          TPGetReadUnitPriceConfig={this.props.actions.TPGetReadUnitPriceConfig}
          btnDisable={btnDisable}
        /> : null}
        {current == 'discover' ? <Discover
          TPChangeQualityConfig={this.props.actions.TPChangeQualityConfig}
          TPGetQualityConfig={this.props.actions.TPGetQualityConfig}
          qualityConfig={qualityConfig}
          btnDisable={btnDisable}
          TPAddRetainTime={this.props.actions.TPAddRetainTime}
          addRetainTime={addRetainTime} /> : null}
        {current == 'select' ? <Select
          btnDisable={btnDisable}
          commissionConfig={commissionConfig}
          TPUpdateCommissionConfig={this.props.actions.TPUpdateCommissionConfig}
          TPQueryCommissionConfig={this.props.actions.TPQueryCommissionConfig} /> : null}
        {current == 'weichat' ? <Weichat taskCheck={taskCheck}
          btnDisable={btnDisable}
          TPTaskCheck={this.props.actions.TPTaskCheck}
          TPUpdateTaskCheck={this.props.actions.TPUpdateTaskCheck} /> : null}
        {current == 'cooperation' ? <Cooperation
          btnDisable={btnDisable}
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
          btnDisable={btnDisable}
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
