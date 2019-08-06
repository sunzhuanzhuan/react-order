/**
 * 创建任务-预览
 */
import React from 'react'
import {
  Form,
  Radio,
  Button,
  DatePicker,
  InputNumber,
  Descriptions, Typography, Modal
} from 'antd'
import { withRouter } from 'react-router-dom'
import moment from "moment";
import { WBYPlatformIcon } from "wbyui";
import {
  getIndustryName,
  openNewWindowPreview, openNewWindowPreviewForWeibo,
  openNewWindowPreviewForWeixin
} from "@/taskPool/constants/utils";
import numeral from '@/util/numeralExpand'

const { Text } = Typography;

const FormItem = Form.Item

const target = {
  "11": "多图文第一条", "12": "不限", "21": "粉丝覆盖", "22": "粉丝传播"
}
const contentStyle = {
  "11": "多图文第一条", "12": "不限", "21": "直发", "22": "转发"
}

/**
 * 微信平台
 */
@withRouter
class PreviewForWeixin extends React.Component {
  state = { submitLoading: false }

  success = () => {
    Modal.success({
      className: 'center-success-modal',
      title: '提交成功',
      content: '您可在任务管理页随时查看进度',
      onOk: () => {
        this.props.history.push('/order/task/manage')
      }
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    const { data, actions } = this.props
    const { base, budget, content } = data

    this.setState({
      submitLoading: true
    });

    // 处理提交数据
    let body = Object.assign({}, base, budget)

    body.companyId = body.company.key
    body.companyName = body.company.label
    delete body.company

    body.industry = body.industry.pop()
    body.taskTarget = body.taskContentStyle

    body.adOrderWeixinContent = {
      "author": content.author,
      "content": content.richContent.toRAW(),
      "coverImageUrl": content.coverImage[0].url,
      "coverImageName": content.coverImage[0].name,
      "remark": content.remark,
      "title": content.title
    }

    actions.TPAddTask(body).then(this.success).finally(() => {
      this.setState({
        submitLoading: false
      });
    })
  }

  preview = () => {
    const { data } = this.props
    const { base, budget, content } = data
    openNewWindowPreviewForWeixin({
      title: content.title,
      content: content.richContent.toHTML(),
      remark: content.remark,
      author: content.author
    })
  }


  render() {

    const { data } = this.props
    const { submitLoading } = this.state
    const { base, budget, content } = data
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={9} widthSize={26} />
      <span className='title'>{base.orderName}</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">{base.company.label}</Descriptions.Item>
          <Descriptions.Item label="行业分类">{getIndustryName(data.industryList, [...base.industry].pop()).itemValue}</Descriptions.Item>
          <Descriptions.Item label="内容发布位置">{contentStyle[budget.taskContentStyle]}</Descriptions.Item>
          <Descriptions.Item label="预算">{numeral(budget.totalAmount).format("0,0.00")} 元</Descriptions.Item>
          <Descriptions.Item label="任务结束时间">{budget.orderEndDate.format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">{budget.retainTime}小时</Descriptions.Item>
          <Descriptions.Item label="文章封面">
            <div className='image-wrap'>
              <img src={content.coverImage[0].url} alt="" />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="推广文章">
            <a onClick={this.preview}>预览</a>
          </Descriptions.Item>
        </Descriptions>
        <Text type="danger">确认无误即可提交。博主领取并执行任务后，会自动扣除预算。</Text>
        <footer>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary" loading={submitLoading} onClick={this.handleSubmit}>提交</Button>
        </footer>
      </div>
    )
  }
}

/**
 * 微博平台
 */
@withRouter
class PreviewForWeibo extends React.Component {
  state = { submitLoading: false }

  componentDidMount() { }

  preview = () => {
    const { data } = this.props
    const { base, budget, content } = data
    let { type, images, video } = content.attachment
    openNewWindowPreviewForWeibo({
      content: content.content,
      video: video && video.url,
      images: images.map(item => item.url),
      mediaType: type
    })
  }

  success = () => {
    Modal.success({
      className: 'center-success-modal',
      title: '提交成功',
      content: '您可在任务管理页随时查看进度',
      onOk: () => {
        this.props.history.push('/order/task/manage')
      }
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    const { data, actions } = this.props
    const { base, budget, content } = data

    this.setState({
      submitLoading: true
    });

    // 处理提交数据
    let body = Object.assign({}, base, budget)
    const { type, images, video } = content.attachment

    body.companyId = body.company.key
    body.companyName = body.company.label
    delete body.company

    body.industry = body.industry[1]
    body.taskContentStyle = content.taskContentStyle

    body.adOrderWeiboContent = {
      "content": content.content,
      "forwardWord": content.forwardWord,
      "mediaType": type,
      "url": content.url
    }

    if (type === 1) {
      body.adOrderWeiboContent.attachmentList = images.map(item => ({
        attachmentName: item.name,
        attachmentUrl: item.url
      }))
    } else if (type === 2) {
      body.adOrderWeiboContent.attachmentList = [{
        attachmentName: video.name,
        attachmentUrl: video.url
      }]
    }

    actions.TPAddTask(body).then(this.success).finally(() => {
      this.setState({
        submitLoading: false
      });
    })
  }

  render() {
    // TODO: 行业接口调用, 根据code显示汉字
    const { data } = this.props
    const { submitLoading } = this.state
    const { base, budget, content } = data
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={1} widthSize={26} />
      <span className='title'>{base.orderName}</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">{base.company.label}</Descriptions.Item>
          <Descriptions.Item label="行业分类">{getIndustryName(data.industryList, [...base.industry].pop()).itemValue}</Descriptions.Item>
          <Descriptions.Item label="任务目标">{target[budget.taskTarget]}</Descriptions.Item>
          <Descriptions.Item label="预算">{numeral(budget.totalAmount).format("0,0.00")} 元</Descriptions.Item>
          <Descriptions.Item label="任务结束时间">{budget.orderEndDate.format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">{budget.retainTime}小时</Descriptions.Item>
          <Descriptions.Item label="内容形式">{contentStyle[content.taskContentStyle]}</Descriptions.Item>
          <Descriptions.Item label="推广文章">
            <a onClick={this.preview}>预览</a>
          </Descriptions.Item>
        </Descriptions>
        <Text type="danger">确认无误即可提交。博主领取并执行任务后，会自动扣除预算。</Text>
        <footer>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary" loading={submitLoading} onClick={this.handleSubmit}>提交</Button>
        </footer>
      </div>
    )
  }
}

export default {
  weixin: PreviewForWeixin,
  weibo: PreviewForWeibo
}
