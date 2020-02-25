/**
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Divider,
  Form,
  Icon,
  Input, message,
  Modal,
  Table,
  Tabs,
  Typography
} from 'antd';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '../actions';
import { connect } from 'react-redux';

import IndustryList from '../components/Attribute/IndustryList';
import CertificateList from '@/taskPool/components/Attribute/CertificateList';
import CertificateOperationModal from '@/taskPool/components/Attribute/CertificateOperationModal';
import IndustryOperationModal from '@/taskPool/components/Attribute/industryOperationModal';

const { Title } = Typography;
const { TabPane } = Tabs;


const Attributes = (props) => {
  const [ active, setActive ] = useState("1")
  const [ addQ, setAddQ ] = useState(false)
  const [ addI, setAddI ] = useState(false)
  const industryTable = useRef(null)
  const certificateTable = useRef(null)
  const tabChange = (key) => {
    setActive(key)
  }


  return (
    <div className='task-pool-page-container attributes-page'>
      {addI && <IndustryOperationModal
        type="add"
        onClose={() => {
          setAddI(false)
        }}
        onOk={() => {
          industryTable && industryTable.current.getList()
        }}
      />}
      {addQ && <CertificateOperationModal
        type="add"
        onClose={() => {
          setAddQ(false)
        }}
        onOk={() => {
          certificateTable && certificateTable.current.getList()
        }}
      />}
      <Title level={4}>属性管理</Title>
      <Tabs activeKey={active} onChange={tabChange} animated={false} tabBarExtraContent={
        <>
          {active === "1" && <Button icon="plus" type="primary" onClick={() => setAddI(true)}>
            添加新行业
          </Button>}
          {active === "2" && <Button icon="plus" type="primary" onClick={() => setAddQ(true)}>
            新增资质
          </Button>}
        </>
      }>
        <TabPane key={1} tab="行业分类管理">
          <IndustryList ref={industryTable} taskPoolData={props.taskPoolData}
                        actions={props.actions} />
        </TabPane>
        <TabPane key={2} tab="行业资质管理">
          <CertificateList ref={certificateTable} taskPoolData={props.taskPoolData}
                           actions={props.actions} />
        </TabPane>
      </Tabs>

    </div>
  );
};


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Attributes));
