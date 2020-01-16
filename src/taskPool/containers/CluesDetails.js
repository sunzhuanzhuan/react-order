import React, { useEffect, useState } from 'react';
import { PageHeader, Card, Button, Modal } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@/taskPool/actions';
import qs from "qs";

const ClueDetail = (props) => {
  let search = qs.parse(props.location.search.substring(1))
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    // 线索详情
    props.actions.TPGetClueDetail({ id: search.id });

  }, [])

  const showModal = () => {
    setVisible(true)
  }
  const handleOk = () => {
    props.actions.TPClueConfirm({ id: search.id, clueState: 2 }).then(() => {
      props.actions.TPGetClueDetail({ id: search.id });
      setVisible(false)
    })
  }
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <div>
      <PageHeader
        onBack={() => props.history.push('/order/task/clues-manage')}
        title="线索详情"
        extra={props.clueDetail.clueState == 1 ? <Button type="primary" style={{ float: 'right' }} onClick={showModal}>确认处理</Button> : null}
      />
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        {search.platform == 'weixin' ? <Card title="基本信息" bordered={false} style={{ width: '100%', margin: '20px 0' }}>
          <p><span>线索ID：{props.clueDetail.id}</span></p>
          <p>
            <span style={{ paddingRight: '100px' }}>行业分类：{props.clueDetail.extensionIndustryName}</span>
            <span>任务预算：{props.clueDetail.extensionBudget}</span>
          </p>
          <p><span>任务开始时间：{props.clueDetail.extensionStartTime}</span></p>
          <p><span>任务结束时间：{props.clueDetail.extensionEndTime}</span></p>
          <p><span>任务持续时间：{props.clueDetail.duration}</span></p>
        </Card> : <Card title="基本信息" bordered={false} style={{ width: '100%', margin: '20px 0' }}>
            <p>
              <span style={{ paddingRight: '100px' }}>线索ID：{props.clueDetail.id}</span>
              <span style={{ paddingRight: '100px' }}>投放模式：{props.clueDetail.adClueTripContentRes && props.clueDetail.adClueTripContentRes.putType}</span>
              <span>内容类型：{props.clueDetail.adClueTripContentRes && props.clueDetail.adClueTripContentRes.mediaType}</span>
            </p>
            <p>
              <span style={{ paddingRight: '100px' }}>行业分类：{props.clueDetail.extensionIndustryName}</span>
              <span>任务预算：{props.clueDetail.extensionBudget}</span>
            </p>
            <p>
              <span style={{ paddingRight: '100px' }}>出发城市：{props.clueDetail.adClueTripContentRes && props.clueDetail.adClueTripContentRes.leavePalce}</span>
              <span>到达城市：{props.clueDetail.adClueTripContentRes && props.clueDetail.adClueTripContentRes.arrivePlace}</span>
            </p>
            <p><span>任务开始时间：{props.clueDetail.extensionStartTime}</span></p>
            <p><span>任务结束时间：{props.clueDetail.extensionEndTime}</span></p>
            <p><span>任务持续时间：{props.clueDetail.duration}</span></p>
          </Card>}
        {props.clueDetail.adInfo ? <Card title="广告主信息" bordered={false} style={{ width: '100%', margin: '20px 0' }}>
          <p><span>所属公司：{props.clueDetail.adInfo.companyName}</span></p>
          <p><span>销售经理：{props.clueDetail.adInfo.salesManager}</span></p>
          <p><span>联系人姓名：{props.clueDetail.adInfo.contactsName}</span></p>
          <p><span>联系人手机号：{props.clueDetail.adInfo.contactsMobile}</span></p>
          <p><span>联系人邮箱：{props.clueDetail.adInfo.contactsEmail}</span></p>
        </Card> : null}
        <Card title="推广简述" bordered={false} style={{ width: '100%', margin: '20px 0' }}>
          <p>{props.clueDetail.extensionRemark}</p>

        </Card>
      </div>
      {visible ? <Modal
        title="确认处理"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确认已经处理（ {props.clueDetail.companyFullName} ）的线索么？</p>
      </Modal> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    clueDetail: state.taskPoolReducers.clueDetail
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClueDetail)
