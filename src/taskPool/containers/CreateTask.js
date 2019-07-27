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
import * as commonActions from "@/actions";
import * as actions from "@/taskPool/actions";
import moment from "moment";

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
      /*authToken: '',
      disabled: hasCompany,
      base: {
        platformId: Number(platformId) || 1,
        company: hasCompany ? {
          label: companyName,
          key: companyId
        } : undefined,
      },
      budget: {},
      content: {}*/
      authToken: "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6Imp2NTBBQ19ycDl0cDlCeXFWam4xdjNTb3ZoZ3lMcVQzM2tmOGI5aTBOTENfWUZkeiJ9.7_EKsPXVrWBqnWA_mpyOUoqUqg4kh0xr6hO22zN_sU6ferIFhdYhmcgSsSSY5fosMbOgsxveqiwJEJK80off-g",
      base:{
        company: {
          key: "2",
          label: "可口可乐有限公司",
        },
        industry: [
          "zhejiang",
          "hangzhou"
        ],
        orderName: "刘治兵",
        platformId: 1,
      },
      budget: {
        taskContentStyle: 11,
        actionNum:12333,
        followerCountLimit: 2222,
        orderEndDate: moment(),
        retainTime: 24,
        taskTarget: 22,
        totalAmount: 12333,
      },
      content: {
        coverImage: [{
          uid: "rc-upload-1564223659679-2",
          url:  "http://prd-wby-img.oss-cn-beijing.aliyuncs.com/B_GZA_ORDER_IMG_NORMAL_UPLOAD/891914dc09094f7db8be44ac8cf9c11a.jpg",
        }],
        attachment: {
          images: [{
            uid: "rc-upload-1564223659679-2",
            url:  "http://prd-wby-img.oss-cn-beijing.aliyuncs.com/B_GZA_ORDER_IMG_NORMAL_UPLOAD/891914dc09094f7db8be44ac8cf9c11a.jpg",
          }],
          type:1,
          video: "",
        },
        content: "123123",
        taskContentStyle: 21,
      }
    }
  }

  componentDidMount() {
    const { actions } = this.props
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
  taskPoolReducers: state.taskPoolReducers
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
