import React, { Component } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonAction from '@/actions/index'
import * as action from '../actions/index'
import { PageHeader, Steps, Icon, Empty } from 'antd'
import {
  FormBase,
  FormBudget,
  FormContent, FormPreview
} from "../components/CreateForms/index";
import { parseUrlQuery } from "@/util/parseUrl";

const { Step } = Steps;
let forms = {
  '9': [
    FormBase,
    FormBudget.weixin,
    FormContent.weixin,
    FormPreview.weixin,
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
    const { step = 1, company, platformId } = parseUrlQuery()
    this.state = {
      current: step - 1,
      authToken: '',
      base: {
        platformId: Number(platformId) || 9,
        company: company,
        name: '',
        classification: 1
      },
      budget: {},
      content: {}
    }
  }

  componentDidMount() {
    const { actions } = this.props
    // 获取上传图片token
    actions.getNewToken().then(({ data: authToken }) => {
      this.setState({ authToken })
    })
  }

  next = () => {
    this.setState({
      current: this.state.current + 1
    });
  }

  prev = () => {
    this.setState({
      current: this.state.current - 1
    });
  }


  render() {
    const { current, base, budget, content } = this.state
    const { platformId = 9 } = base
    const FormComponent = forms[platformId][current] || Empty
    return <div className='task-pool-page-container create-page'>
      <PageHeader onBack={() => null} title="新建任务" />
      <header>
        <Steps current={current}>
          <Step title="任务基本信息" icon={<Icon type="profile" />} />
          <Step title="设置预算" icon={<Icon type="pay-circle" />} />
          <Step title="撰写内容" icon={<Icon type="edit" />} />
          <Step title="预览" icon={<Icon type="read" />} />
        </Steps>
      </header>
      <main>
        <FormComponent
          formLayout={formLayout}
          next={this.next}
          prev={this.prev}
          data={{ ...this.state }}
        />
      </main>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    // accountManage: state.accountManageReducer,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTask)
