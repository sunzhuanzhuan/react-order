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

/**
 * 微信平台
 */
@Form.create()
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
    this.success()
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.next()
  }

  render() {

    const { form, formLayout } = this.props
    const { getFieldDecorator } = form
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={9} widthSize={26} />
      <span className='title'>这里是任务名称</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="行业分类">1810000000</Descriptions.Item>
          <Descriptions.Item label="预算">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="任务结束时间">empty</Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">24小时</Descriptions.Item>
          <Descriptions.Item label="内容发布位置">24小时</Descriptions.Item>
          <Descriptions.Item label="文章封面">
            <div className='image-wrap'>
              <img src="https://mmbiz.qpic.cn/mmbiz_png/5r2fdOVlScpTy1TGoAmCIW6cvw8YGRygsBB4vwBgX1uv7zOEKZswEEcoNfiaufdPQ9R4YwA1amvPcw2fTMcxEHA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="" />
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
@Form.create()
class PreviewForWeibo extends React.Component {
  state = {}

  componentDidMount() { }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.next()
  }

  render() {

    const { form, formLayout } = this.props
    const { getFieldDecorator } = form
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={1} widthSize={26} />
      <span className='title'>这里是任务名称</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="行业分类">1810000000</Descriptions.Item>
          <Descriptions.Item label="预算">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="任务结束时间">empty</Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">24小时</Descriptions.Item>
          <Descriptions.Item label="内容发布位置">24小时</Descriptions.Item>
          <Descriptions.Item label="文章封面">
            <div className='image-wrap'>
              <img src="https://mmbiz.qpic.cn/mmbiz_png/5r2fdOVlScpTy1TGoAmCIW6cvw8YGRygsBB4vwBgX1uv7zOEKZswEEcoNfiaufdPQ9R4YwA1amvPcw2fTMcxEHA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="" />
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

export default {
  weixin: PreviewForWeixin,
  weibo: PreviewForWeibo
}
