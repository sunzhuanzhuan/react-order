import React, { Component } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonActions from '@/actions/index'
import * as actions from '../actions'
import { PageHeader, Steps, Icon, Empty } from 'antd'
import {
  FormBase,
  FormBudget,
  FormContent, FormPreview
} from "../components/CreateForms/index";
import { parseUrlQuery } from "@/util/parseUrl";
import moment from "moment";
import BraftEditor from 'braft-editor'


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


class CreateTask extends Component {
  constructor(props) {
    super(props);
    const { step = 1, company = '', platformId } = parseUrlQuery()
    const [companyId, companyName] = company.split("::")
    const hasCompany = !!(companyId && companyName)
    this.state = {
      current: step - 1,
      authToken: '',
      disabled: hasCompany,
      industryList: [],
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
  }

  componentDidMount() {
    const { actions } = this.props
    // 获取任务大厅行业列表
    actions.TPGetTaskIndustry().then(({ data: industryList }) => {
      this.setState({ industryList })
    })
    // 获取上传图片token
    actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })
  }

  saveFormsData = () => {
    this.setState({});
  }

  next = (key, data) => {
    this.setState({
      current: this.state.current + 1,
      [key]: data
    });
  }

  prev = (key, data) => {
    this.setState({
      current: this.state.current - 1,
      [key]: data
    });
  }


  render() {
    const { current, base, budget, content } = this.state
    const { actions } = this.props
    const { platformId = 9 } = base
    const FormComponent = forms[platformId][current] || Empty
    return <div className='task-pool-page-container create-page'>
      <PageHeader onBack={() => this.props.history.push('/order/task/manage')} title="新建任务" />
      <header>
        <Steps current={current}>
          <Step title="任务基本信息" />
          <Step title="设置预算" />
          <Step title="撰写内容" />
          <Step title="预览" />
        </Steps>
      </header>
      <main>
        <FormComponent
          formLayout={formLayout}
          next={this.next}
          prev={this.prev}
          data={this.state}
          actions={actions}
        />
      </main>
    </div>
  }
}

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
)(CreateTask)
