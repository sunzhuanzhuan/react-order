import React, { useEffect, useMemo, useReducer, useState } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonActions from '@/actions/index'
import * as actions from '../actions'
import { PageHeader, Steps, Icon, Empty } from 'antd'
import {
  FormBase,
  FormBudget,
  FormContent, FormPreview
} from "../components/Task/CreateForms/index";
import update from 'immutability-helper'
import moment from 'moment';
import { useParams } from 'react-router-dom'
import LoadingWrapped from '@/base/LoadingWrapped';
import BraftEditor from 'braft-editor';

const { Step } = Steps;
let forms = {
  '9': [
    FormBase.media,
    FormBudget.weixin,
    FormContent.weixin,
    FormPreview.weixin
  ],
  '1': [
    FormBase.media,
    FormBudget.weibo,
    FormContent.weibo,
    FormPreview.weibo
  ],
  '1000': [
    FormBase.partner,
    FormBudget[12306],
    FormContent[12306],
    FormPreview[12306]
  ],
  'default': []
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  labelAlign: "left",
  colon: false
}

const UpdateTask = (props) => {
  // 获取url上的数据
  const { id: taskId } = useParams()
  const [ loading, setLoading ] = useState(true)
  // 步骤
  const [ current, setCurrent ] = useState(1)
  // 图片上传Token
  const [ authToken, setAuthToken ] = useState("")
  // 行业分类
  const [ industryList, setIndustryList ] = useState([])
  // 经营内容
  const [ businessScopeList, setBusinessScopeList ] = useState([])
  // 该平台是否需要上传资质
  const [ isCheckQualification, setIsCheckQualification ] = useState(2)
  // 资质组信息
  const [ qualificationsGroups, setQualificationsGroups ] = useState([])
  // 账户余额
  const [ balance, setBalance ] = useState(0)
  // 任务发文位置
  const [ taskPositionList, setTaskPositionList ] = useState([])
  // 任务保留时长列表
  const [ taskRetainTimeList, setTaskRetainTimeList ] = useState([])

  // 任务数据
  const [ state, setDataState ] = useState({ base: {}, budget: {}, content: {} })

  const getCompanyBalance = (company = {}) => {
    if(company.key){
      actions.TPQueryAvailableBalance({
        companyId: company.key,
        accountType: 1
      }).then(({ data }) => {
        setBalance(data)
      })
    }else {
      setBalance(0)
    }
  }

  // 处理数据
  const handleDetailToValue = (detail) => {
    let feature = {}
    switch (detail.platformId) {
      case 9:
        feature = detail.adOrderWeixinContent
        return {
          base: {
            platformId: detail.platformId,
            company: {
              label: detail.companyName,
              key: detail.companyId
            },
            orderName: detail.orderName,
            taskPattern: feature.taskPattern,
            industry: [ detail.taskIndustryInfo.parentId, detail.taskIndustryInfo.id ].filter(Boolean),
            orderDate: [ moment(detail.orderStartDate), moment(detail.orderEndDate) ],
            showPictureUrl: [ {
              uid: feature.showPictureUrl,
              url: feature.showPictureUrl
            } ],
            businessScope: detail.businessScope,
            retainTime: feature.retainTime,
          },
          budget: {
            totalAmount: detail.totalAmount,
            locationLimited: feature.locationLimited,
            locationLimitedInfo: feature.locationLimitedInfo && feature.locationLimitedInfo.split(','),
            _followerCountLimit: feature.followerCountLimit > 0,
            followerCountLimit: feature.followerCountLimit > 0 ? feature.followerCountLimit : undefined,
            mediaCountLimit: feature.mediaCountLimit === 1,
            _mediaAvgReadNumLimit: feature.mediaAvgReadNumLimit > 0,
            mediaAvgReadNumLimit: feature.mediaAvgReadNumLimit > 0 ? feature.mediaAvgReadNumLimit : undefined,
            _followerGenderRatioLimit: feature.followerGenderRatioLimit > 0,
            followerGenderRatioLimit: feature.followerGenderRatioLimit > 0 ? feature.followerGenderRatioLimit : undefined,
            _minNumOfReadLimit: feature.minNumOfReadLimit > 0,
            minNumOfReadLimit: feature.minNumOfReadLimit > 0 ? feature.minNumOfReadLimit : undefined,
            onlyVerified: feature.onlyVerified === 1,

            wxOneNumber: feature.wxOneNumber,
            wxTwoNumber: feature.wxTwoNumber,
            wxOtherNumber: feature.wxOtherNumber,

            unitPrice: feature.unifiedNumber,
            actualPayment: feature.actualPayment,
            serviceFee: feature.serviceFee,
          },
          content: {
            title: feature.title,
            author: feature.author,
            remark: feature.remark,
            articleUrl: feature.articleUrl,
            coverImage: [ {
              uid: feature.coverImageName,
              url: feature.coverImageUrl
            } ],
            richContent: BraftEditor.createEditorState(feature.content)
          }
        }
      default:
        return {
          base: {}, budget: {}, content: {}
        }
    }
  }

  const next = (key, data) => {
    setCurrent(current + 1)
    setDataState(update(state,
      {
        [key]: { $set: data }
      }
    ))
  }

  const prev = (key, data) => {
    let target = current - 1
    if(target === 0){
      target = 1
    }
    setCurrent(current - 1)
    setDataState(update(state,
      {
        [key]: { $set: data }
      }
    ))
  }

  useEffect(() => {
    const { actions } = props
    getDetail()

    // 获取任务大厅行业列表
    actions.TPGetIndustryCatalog().then(({ data }) => {
      setIndustryList(data.industryList || [])
    })
    // 获取上传图片token
    actions.getNewToken().then(({ data: authToken }) => {
      setAuthToken(authToken)
    })
    // 获取发文位置
    actions.TPGetTaskPosition().then(({ data: taskPositionList }) => {
      setTaskPositionList(taskPositionList)
    })
    // 获取保留时长
    actions.TPQueryRetainTimeList().then(({ data: retainTimeList }) => {
      setTaskRetainTimeList(retainTimeList)
    })

    /*
    // 该平台是否需要上传资质
    actions.TPQueryTaskCheckQualifications({ platformId }).then(({ data }) => {
      setIsCheckQualification(data.isCheckQualification)
    })
    */


    if (base.industry || base.businessScopeId) {
      getQualificationsGroup(base.industry, base.businessScopeId)
    }

  }, [])

  // 获取经营内容列表
  const getBusinessScope = ([ industryId ]) => {
    const { actions } = props
    actions.TPGetIndustryCatalog({ industryId }).then(({ data }) => {
      setBusinessScopeList(data.businessScopeList || [])
      // 假如列表为空则直接获取行业下的资质组
      if (data.length === 0) {
        this.getQualificationsGroup([ industryId ])
      }
    });
  }
  // 获取资质组
  const getQualificationsGroup = ([ industryId ], businessScopeId) => {
    actions.TPQueryQualificationsGroup({ industryId, businessScopeId }).then(({ data }) => {
      setQualificationsGroups(data)
    });
  }

  // 获取任务详情
  const getDetail = () => {
    setLoading(true);
    actions.TPTaskDetail({ id: taskId }).then(({ data }) => {
      setDataState(handleDetailToValue(data))
      getCompanyBalance({ key: data.companyId })
      setLoading(false)
    })
  }

  const childProps = {
    current,
    authToken,
    industryList,
    balance,
    taskPositionList,
    businessScopeList,
    taskRetainTimeList,
    isCheckQualification,
    qualificationsGroups
  }
  const { base, budget, content } = state
  const { actions, taskPoolData = {} } = props;
  const { platformId = "default" } = base
  const FormComponent = forms[platformId][current] || Empty
  return (
    <LoadingWrapped loading={loading}>
      <div className='task-pool-page-container create-task-page'>
        <header>
          <Steps current={current}>
            <Step title="填写信息" description="填写任务基本信息，选择任务模式" disabled />
            <Step title="设置指标" description="设置任务的指标或预算" />
            <Step title="撰写内容" description="填写所需发布的内容信息" />
            <Step title="预览" description="生成任务预览" />
          </Steps>
        </header>
        <main>
          {taskPositionList.length > 0 && <FormComponent
            isUpdate
            taskId={taskId}
            formLayout={formLayout}
            next={next}
            prev={prev}
            data={state}
            actions={actions}
            getCompanyBalance={getCompanyBalance}
            getBusinessScope={getBusinessScope}
            getQualificationsGroup={getQualificationsGroup}
            {...childProps}
          />}
        </main>
      </div>
    </LoadingWrapped>
  )
};


const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers,
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
)(UpdateTask)
