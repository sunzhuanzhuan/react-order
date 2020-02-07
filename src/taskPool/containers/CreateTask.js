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
import { parseUrlQuery } from "@/util/parseUrl";
import update from 'immutability-helper'
import moment from 'moment';

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

const CreateTask = (props) => {
  // 获取url上的数据
  const { step = 1, company = '', platform } = parseUrlQuery()
  // 步骤
  const [ current, setCurrent ] = useState(step - 1)
  // 图片上传Token
  const [ authToken, setAuthToken ] = useState("")
  // 行业分类
  const [ industryList, setIndustryList ] = useState([])
  // 经营内容
  const [ businessScopeList, setBusinessScopeList ] = useState([])
  // 该平台是否需要上传资质
  const [ isCheckQualification, setIsCheckQualification ] = useState(() => {
    return (platform === "1000") ? 1 : 2
      })
  // 资质组信息
  const [ qualificationsGroups, setQualificationsGroups ] = useState([])
  // 账户余额
  const [ balance, setBalance ] = useState(0)
  // 任务发文位置
  const [ taskPositionList, setTaskPositionList ] = useState([])
  // 任务保留时长列表
  const [ taskRetainTimeList, setTaskRetainTimeList ] = useState([])
  // 是否锁定公司选择
  const [ lockCompanySelect ] = useState(!!company)

  // 任务数据
  const [ state, setDataState ] = useState(() => {
    let defaultPlatformId = Object.keys(forms).indexOf(platform) === -1 ? 9 : Number(platform)

    const [ companyId, companyName ] = company.split("::")
    return {
      base: {
        platformId: defaultPlatformId,
        company: lockCompanySelect ? {
          label: companyName,
          key: companyId
        } : undefined,
        // FIXME: 调试
        /*"orderName": "123123",
        "industry": [
          1,
          2
        ],
        "orderDate": [

        ],
        "taskPattern": 2,
        "showPictureUrl": [
          {
            "uid": "rc-upload-1580960941787-2",
            "url": "http://prd-wby-img.oss-cn-beijing.aliyuncs.com/FWP_IMG_UPLOAD/dcab1be06ee246cb8225b324a98f3656.jpg"
          }
        ],
        "retainTime": 48,
        "businessScopeId": "1"*/
      },
      budget: {},
      content: {}
    }
  })

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


  const next = (...arg) => {
    setCurrent(current + 1)
    setData(...arg)
  }

  const prev = (...arg) => {
    setCurrent(current - 1)
    setData(...arg)
  }

  const setData = (key1, data1, key2, data2) => {
    setDataState(update(state,
      {
        [key1]: { $set: data1 },
        [key2]: { $set: data2 },
      }
    ))
  }

  useEffect(() => {
    const { actions } = props
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

    if (company) {
      getCompanyBalance(state.base.company)
    }

    if(base.industry || base.businessScopeId){
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

  const childProps = {
    current,
    authToken,
    industryList,
    balance,
    lockCompanySelect,
    taskPositionList,
    businessScopeList,
    taskRetainTimeList,
    isCheckQualification,
    qualificationsGroups
  }
  const { base, budget, content } = state
  const { actions, taskPoolData = {} } = props;
  const { platformId } = base
  const FormComponent = forms[platformId][current] || Empty
  return (
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
          formLayout={formLayout}
          next={next}
          prev={prev}
          setData={setData}
          data={state}
          actions={actions}
          getCompanyBalance={getCompanyBalance}
          getBusinessScope={getBusinessScope}
          getQualificationsGroup={getQualificationsGroup}
          {...childProps}
        />}
      </main>
    </div>
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
)(CreateTask)
