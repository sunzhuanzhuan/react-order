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
import moment from "moment";
import { WBYPlatformIcon } from "wbyui";

const { Text } = Typography;

const FormItem = Form.Item

const target = {
  "11":"多图文第一条","12":"不限","21":"粉丝覆盖","22":"粉丝传播"
}
const contentStyle = {
  "11":"多图文第一条","12":"不限","21":"直发","22":"转发"
}

/**
 * 微信平台
 */
class PreviewForWeixin extends React.Component {
  state = {}

  success = () => {
    Modal.success({
      className: 'center-success-modal',
      title: '提交成功',
      content: '您可在....按时打算'
    })
  }

  componentDidMount() {
    // this.success()
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.next()
  }

  render() {

    const { data } = this.props
    const { base, budget, content } = data
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={9} widthSize={26} />
      <span className='title'>这里是任务名称</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">{base.company.label}</Descriptions.Item>
          <Descriptions.Item label="行业分类">{base.industry}</Descriptions.Item>
          <Descriptions.Item label="内容发布位置">{contentStyle[budget.taskContentStyle]}</Descriptions.Item>
          <Descriptions.Item label="预算">{budget.totalAmount}</Descriptions.Item>
          <Descriptions.Item label="任务结束时间">{budget.orderEndDate.format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">{budget.retainTime}小时</Descriptions.Item>
          <Descriptions.Item label="文章封面">
            <div className='image-wrap'>
              <img src={content.coverImage[0].url} alt="" />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="推广文章">
            <a>预览</a>
          </Descriptions.Item>
        </Descriptions>
        <Text type="danger">确认无误即可提交。博主领取并执行任务后，会自动扣除预算。</Text>
        <footer>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary">提交</Button>
        </footer>
      </div>
    )
  }
}

/**
 * 微博平台
 */
class PreviewForWeibo extends React.Component {
  state = {}

  componentDidMount() { }

  handleSubmit = (e) => {
    e && e.preventDefault()
    // this.props.next()
  }

  render() {

    const { data } = this.props
    const { base, budget, content } = data
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={1} widthSize={26} />
      <span className='title'>{base.orderName}</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">{base.company.label}</Descriptions.Item>
          <Descriptions.Item label="行业分类">{base.industry}</Descriptions.Item>
          <Descriptions.Item label="任务目标">{target[budget.taskTarget]}</Descriptions.Item>
          <Descriptions.Item label="预算">{budget.totalAmount}</Descriptions.Item>
          <Descriptions.Item label="任务结束时间">{budget.orderEndDate.format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">{budget.retainTime}小时</Descriptions.Item>
          <Descriptions.Item label="内容形式">{contentStyle[content.taskContentStyle]}</Descriptions.Item>
          <Descriptions.Item label="推广文章">
            <a>预览</a>
          </Descriptions.Item>
          <Descriptions.Item label="推广文章">
            <div>
              {content.content}
            </div>
            {content.attachment.type === 1 && <div>
              {content.attachment.images.map(item => <img key={item.uid} src={item.url} alt="" />)}
            </div>}
            {content.attachment.type === 2 && <div>
              {content.attachment.video}
            </div>}
          </Descriptions.Item>
        </Descriptions>
        <Text type="danger">确认无误即可提交。博主领取并执行任务后，会自动扣除预算。</Text>
        <footer>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary">提交</Button>
        </footer>
      </div>
    )
  }
}

export default {
  weixin: PreviewForWeixin,
  weibo: PreviewForWeibo
}
