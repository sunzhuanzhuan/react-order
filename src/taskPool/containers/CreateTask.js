import React, { Component } from "react"
import { PageHeader, Steps, Icon, Empty } from 'antd'
import { FormBase, FormBudget } from "../components/CreateForms/index";
import { parseUrlQuery } from "@/util/parseUrl";

const { Step } = Steps;
let forms = {
  '9': [
    FormBase,
    FormBudget.weixin
  ],
  '1': [
    FormBase,
    FormBudget.weibo
  ]
}

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
  labelAlign: "left",
  colon: false
}


export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    const { step = 1, company } = parseUrlQuery()
    this.state = {
      current: step - 1,
      base: {
        platformId: 9,
        company: company,
        name: '',
        classification: 1
      },
      budget: {},
      content: {}
    }
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
          data={{ base, budget, content }}
        />
      </main>
    </div>
  }
}
