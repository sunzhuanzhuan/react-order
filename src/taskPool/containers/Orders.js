import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '@/taskPool/actions';
import { WechatList, CooperationList, CooperationForm, WechatForm } from '../components/Order';
import { Tabs, Modal, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
const { TabPane } = Tabs;
const baseSearch = { page: { currentPage: 1, pageSize: 10 }, form: {} };

const Orders = props => {
  const [modalProps, setModalProps] = useState({ title: '' });
  const [cooSearch, setCooSearch] = useState(baseSearch);
  const [weChatSearch, setWeChatSearch] = useState(baseSearch);
  const [loading, setLoading] = useState(true);
  const [orderType, setOrderType] = useState(props.match.params.id || '1');
  const { actions, orderReducers, authorizationsReducers } = props;
  //是评估师
  const isAssessor = authorizationsReducers.authVisibleList['appraiserTab'];
  //是合作平台执行
  const isPlatformExecution =
    authorizationsReducers.authVisibleList['cooperation.platform.navigation.tab'];
  useEffect(() => {
    if (isAssessor && isPlatformExecution) {
      callback(orderType);
    } else if (isAssessor) {
      callback('1');
    } else if (isPlatformExecution) {
      callback('2');
    }
    //获取订单状态列表
    actions.TPGetMcnOrderStateList();
  }, []);
  //切换tab
  function callback(key) {
    setOrderType(key);
    if (key == 2) {
      searchAction(baseSearch);
    }
    if (key == 1) {
      searchWechatAction(baseSearch);
    }
    props.history.push({
      pathname: `/order/task/orders-manage/${key}`
    });
    setModalProps({ content: null, title: null });
  }

  //微信
  async function getAllMcnOrderListAsync(params) {
    setLoading(true);
    setWeChatSearch(params);
    await actions.TPGetAllMcnOrderList(params);
    setLoading(false);
  }
  //操作筛选项
  function searchWechatAction(params) {
    getAllMcnOrderListAsync({ ...baseSearch, ...params });
  }
  //操作分页使用查询
  function changeWechatPage(params) {
    getAllMcnOrderListAsync({ ...weChatSearch, ...params });
  }
  //清空
  function resetWachat() {
    setWeChatSearch(baseSearch);
  }
  //
  function resetPlatform() {
    setCooSearch(baseSearch);
  }
  //合作平台
  async function getPlatformOrderListAsync(params) {
    setLoading(true);
    setCooSearch(params);
    await actions.TPGetPlatformOrderList(params);
    setLoading(false);
  }
  //操作筛选项
  function searchAction(params) {
    getPlatformOrderListAsync({ ...baseSearch, ...params });
  }
  //操作分页使用查询
  function changePage(params) {
    getPlatformOrderListAsync({ ...cooSearch, ...params });
  }

  const comProps = {
    setModalProps,
    actions: actions
  };
  const { platformOrderList, allMcnOrderList, mcnOrderStateList } = orderReducers;
  const platformProps = {
    platformOrderList,
    searchAction,
    changePage,
    actions,
    resetPlatform
  };
  const weChatProps = {
    allMcnOrderList,
    searchWechatAction,
    changeWechatPage,
    mcnOrderStateList,
    actions,
    setModalProps,
    resetWachat
  };
  console.log('TCL: isPlatformExecution', isPlatformExecution && 1);

  return (
    <div>
      <h2>订单管理</h2>
      <Spin spinning={loading}>
        <Tabs onChange={(key) => window.open(`/order/task/orders-manage/${key}`, '_self')} defaultActiveKey={orderType}>
          {isAssessor && (
            <TabPane tab="微信公众号" key="1">
              <WechatForm {...weChatProps} key={orderType} />
              <WechatList {...comProps} {...weChatProps} />
            </TabPane>
          )}
          {isPlatformExecution && (
            <TabPane tab="合作平台" key="2">
              <CooperationForm {...platformProps} key={orderType} />
              <CooperationList {...comProps} {...platformProps} />
            </TabPane>
          )}
        </Tabs>
      </Spin>
      <Modal
        {...modalProps}
        visible={modalProps.visible}
        footer={null}
        onCancel={() => setModalProps({ ...modalProps, visible: false })}
      >
        {modalProps.content
          ? orderType == 1
            ? modalProps.content(weChatProps)
            : modalProps.content
          : null}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  orderReducers: state.taskPoolReducers,
  authorizationsReducers: state.authorizationsReducers
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...actions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
