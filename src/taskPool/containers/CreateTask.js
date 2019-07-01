import React, { Component } from "react"
import { PageHeader, Steps, Icon, Button, message } from 'antd'
import CreateFormForWeixin from "../components/CreateFormForWeixin";

const { Step } = Steps;

export default class CreateTask extends Component {
  state = {
    current: 0
  }

  componentDidMount() {
  }

  render() {
    return <div className='task-pool-page-container create-page'>
      <header>
        <PageHeader onBack={() => null} title="创建任务" subTitle="create new task" />
        {/*<Steps current={0}>
          <Step title="任务基本信息" icon={<Icon type="user" />} />
          <Step title="设置预算" icon={<Icon type="solution" />} />
          <Step title="撰写内容" icon={<Icon type="loading" />} />
          <Step title="预览" icon={<Icon type="smile-o" />} />
        </Steps>*/}
      </header>
      <main>
        <CreateFormForWeixin/>
      </main>
      <footer>
        <Button type="primary" onClick={() => message.success('Processing complete!')}>
          Done
        </Button>
      </footer>
    </div>
  }
}
