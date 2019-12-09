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


function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const CreateTask = (props) => {
  // 初始化数据
  const [authToken, setAuthToken] = useState("")
  const [industryList, setIndustryList] = useState([])
  const [state, setState] = useState(() => {
    const { step = 1, company = '', platformId } = parseUrlQuery()
    const [companyId, companyName] = company.split("::")
    const hasCompany = !!(companyId && companyName)
    return {
      current: step - 1,
      disabled: hasCompany,
      base: {
        platformId: Number(platformId) || 9,
        company: hasCompany ? {
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
      companyId: company.key || state.base.company.key,
      accountType: 1
    }).then(({ data }) => {
      setState(update(state,
        {
          budget: { balance: { $set: data } },
        }
      ))
    })
  }


  const next = (key, data) => {
    setState(update(state,
      {
        current: { $set: state.current + 1 },
        [key]: { $set: data }
      }
    ))
  }

  const prev = (key, data) => {
    setState(update(state,
      {
        current: { $set: state.current - 1 },
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
    actions.TPGetTaskPosition();

    if (state.base.company) {
      getCompanyBalance()
    }
  }, [])

  const { current, base, budget, content } = state
  const { actions, taskPoolData = {} } = props;
  const { taskPositionList = [] } = taskPoolData;
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
          data={{ ...state, authToken, industryList }}
          actions={actions}
          taskPositionList={taskPositionList}
          getCompanyBalance={getCompanyBalance}
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
