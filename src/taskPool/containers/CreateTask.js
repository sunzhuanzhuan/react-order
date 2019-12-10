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


const { Step } = Steps;
let forms = {
  '9': [
    FormBase,
    FormBudget.weixin,
    FormContent.weixin,
    FormPreview.weixin
  ],
  '1': [
    FormBase,
    FormBudget.weibo,
    FormContent.weibo,
    FormPreview.weibo
  ]
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
  // 账户余额
  const [ balance, setBalance ] = useState(0)
  // 任务发文位置
  const [ taskPositionList, setTaskPositionList ] = useState([])
  // 是否锁定公司选择
  const [ lockCompanySelect ] = useState(!!company)

  // 任务数据
  const [ state, setState ] = useState(() => {
    const [ companyId, companyName ] = company.split("::")
    return {
      base: {
        platformId: Number(platform) || 9,
        company: lockCompanySelect ? {
          label: companyName,
          key: companyId
        } : undefined
      },
      budget: {},
      content: {}
    }
  })

  const getCompanyBalance = (company = {}) => {
    actions.TPQueryAvailableBalance({
      companyId: company.key,
      accountType: 1
    }).then(({ data }) => {
      setBalance(data)
    })
  }


  const next = (key, data) => {
    setCurrent(current + 1)
    setState(update(state,
      {
        [key]: { $set: data }
      }
    ))
  }

  const prev = (key, data) => {
    setCurrent(current - 1)
    setState(update(state,
      {
        [key]: { $set: data }
      }
    ))
  }

  useEffect(() => {
    const { actions } = props
    // 获取任务大厅行业列表
    actions.TPGetTaskIndustry().then(({ data: industryList }) => {
      setIndustryList(industryList)
    })
    // 获取上传图片token
    actions.getNewToken().then(({ data: authToken }) => {
      setAuthToken(authToken)
    })
    // 获取发文位置
    actions.TPGetTaskPosition().then(({ data: taskPositionList }) => {
      setTaskPositionList(taskPositionList)
    })

    if (company) {
      getCompanyBalance(state.base.company)
    }
  }, [])

  const childProps = {
    current, authToken, industryList, balance, lockCompanySelect, taskPositionList
  }
  const { base, budget, content } = state
  const { actions, taskPoolData = {} } = props;
  const { platformId = 9 } = base
  const FormComponent = forms[platformId][current] || Empty
  return (
    <div className='task-pool-page-container create-task-page'>
      <header>
        <Steps current={current}>
          <Step title="填写信息" description="填写任务基本信息，选择任务模式" />
          <Step title="设置预算" description="设置任务的指标或预算" />
          <Step title="撰写内容" description="填写所需发布的内容信息" />
          <Step title="预览" description="生成任务预览" />
        </Steps>
      </header>
      <main>
        <FormComponent
          formLayout={formLayout}
          next={next}
          prev={prev}
          data={state}
          actions={actions}
          getCompanyBalance={getCompanyBalance}
          {...childProps}
        />
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
