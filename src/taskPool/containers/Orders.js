import React, { Component } from 'react'
import { connect } from 'react-redux'
import WachatList from '../components/Orders/WachatList'
import { Tabs, Modal } from 'antd';
const { TabPane } = Tabs;
export class Orders extends Component {

  callback() {

  }

  render() {

    return (
      <div>
        订单管理
        <Tabs onChange={this.callback} >
          <TabPane tab="微信公众号" key="1">
            <WachatList />
          </TabPane>
          <TabPane tab="合作平台" key="2">
            {/* <CooperationList /> */}
          </TabPane>
        </Tabs>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

