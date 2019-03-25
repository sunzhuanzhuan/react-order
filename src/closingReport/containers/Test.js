import React, { Component } from 'react'
import { Table, PageHeader, Button, Tabs, Divider } from 'antd'
import OrderFilterForm from '../components/OrderFilterForm'
import OrderCard from '../components/OrderCard'
import { SH2 } from '@/base/SectionHeader'
import DataModuleHeader from '../base/DataModuleHeader'
import { Against } from '../base/ApprovalStatus'


const TabPane = Tabs.TabPane


export default class Test extends Component {
  componentWillMount() {}

  render() {

    return <div>
      <PageHeader
        onBack={() => null}
        title="结案数据单详情页"
        extra={<Button type='primary' ghost>添加订单</Button>}
      >
        <div style={{ padding: '20px 15px' }}>
          <span>
            结案数据单号：001
          </span>
          <Divider type="vertical" />
          <span>
            结案数据单名称：这里显示名称
          </span>
          <Divider type="vertical" />
          <span>
            创建人：蔡逸琦
          </span>
        </div>
        <SH2 />
      </PageHeader>
      <Tabs defaultActiveKey="2" animated={{ tabPane: false }}>
        <TabPane tab="全部 500" key="1">
          <div>
            <OrderCard />
            <OrderCard />
          </div>
        </TabPane>
        <TabPane tab="待提交内审 100" key="2">
        </TabPane>
        <TabPane tab="待提交内审 100" key="3">
          <div style={{ margin: 'auto', width: 810 }}>
            <DataModuleHeader subTitle={'(手抄)'} extra={
              <Against reason={'这里显示审核诶通过原因，显示不下用截断，鼠标HOVER弹出tips这里显示审核诶通过原因，显示不下用截断，鼠标HOVER弹出tips这里显示审核诶通过原因，显示不下用截断，鼠标HOVER弹出tips这里显示审核诶通过原因，显示不下用截断，鼠标HOVER弹出tips'} />} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  }
}
