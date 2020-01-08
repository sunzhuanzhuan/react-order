import React, { Component, useEffect, useState } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonActions from '@/actions'
import * as actions from '../actions'
import LoadingWrapped from '@/base/LoadingWrapped';
import { useParams, useHistory } from 'react-router-dom'
import { DetailsFor12306, DetailsForWeiXin } from '@/taskPool/components/Task/Details';
import { Empty } from 'antd';

const children = {
  "9": DetailsForWeiXin,
  "1000": DetailsFor12306,
  "default": Empty
}

const TaskDetail = (props) => {
  const { id } = useParams()
  const history = useHistory()
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    getDetail()
  }, [])

  // 获取任务详情
  const getDetail = () => {
    setLoading(true);
    actions.TPTaskDetail({ id }).then(() => {
      setLoading(false)
    })
  }
  const { actions, taskPoolData } = props
  const { mcnOrderList, taskDetail, mcnOrderListByTemp } = taskPoolData
  const Child = children[taskDetail.platformId || "default"]

  return (
    <LoadingWrapped loading={loading}>
      <div className='task-pool-page-container detail-page'>
        <Child
          details={taskDetail}
          mcnOrderList={mcnOrderList}
          mcnOrderListByTemp={mcnOrderListByTemp}
          actions={actions}
          history={history}
        />
      </div>
    </LoadingWrapped>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail)
