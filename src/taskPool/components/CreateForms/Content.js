/**
 * 创建任务-撰写内容表单
 */
import React from 'react'
import BraftEditor from "braft-editor";
import moment from "moment";
import {
  Form,
  Radio,
  Button,
  DatePicker,
  InputNumber,
  Input,
  Icon,
  message
} from 'antd'
import { InputCount } from "@/base/Input";
import { previewHtml } from "@/taskPool/constants/utils";
import axios from "axios";
import { OssUpload } from "wbyui";

import cookie from "js-cookie";
import 'braft-editor/dist/index.css'
import UploadMaterial from "@/taskPool/components/CreateForms/UploadMaterial";


const FormItem = Form.Item

const controls = [
  'undo', 'redo', 'separator',
  'headings', 'font-size', 'line-height', 'letter-spacing', 'emoji', 'hr',
  'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
  'superscript', 'subscript', 'remove-styles', 'text-indent', 'separator', 'text-align',
  'list-ul', 'list-ol', 'blockquote', 'code', 'link', 'media'
]

/**
 * 微信平台
 */
@Form.create()
class ContentForWeixin extends React.Component {
  state = {}

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    this.props.prev("content", newVal)
  }

  // 富文本编辑自定义上传
  customUpload = (param) => {
    const { data } = this.props
    let formData = new window.FormData();
    let config = {
      headers: {
        'Authorization': data.authToken,
        'sessionId': cookie.get('token')
      },
      onUploadProgress: ({ total, loaded }) => {
        param.progress(parseFloat(Math.round(loaded / total * 100).toFixed(2)))
      }
    };
    formData.append("file", param.file);
    formData.append("bizzCode", 'VIDEO_TEST');
    axios.post("/api/common-file/file/v1/uploadPubBucket", formData, config)
      .then(({ data: response }) => {
        if (response.code === '1000') {
          // 处理文件显示
          response.url = response.data;
          param.success({
            url: response.data,
            meta: {
              id: 'xxx',
              title: param.file.name,
              alt: param.file.name
            }
          })
        } else {
          message.error(response.msg)
          param.error({
            msg: response.msg
          })
        }
      })
      .catch(error => {
        console.warn(error);
        message.error("上传失败")
        param.error({
          msg: '上传失败.'
        })
      });

  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        this.props.next("content", newVal)
      }
    });
  }

  validatorContent = (rules, value, callback) => {
    if (value.isEmpty()) {
      callback('请输入正文')
    } else {
      callback()
    }
  }

  render() {

    const { form, formLayout, data } = this.props
    const { base, budget, content } = data
    const { getFieldDecorator, getFieldValue } = form
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="标题">
          {getFieldDecorator('title', {
            initialValue: content.title,
            rules: [
              { required: true, message: '请输入标题' },
              { max: 64, message: '最多输入64个字' }
            ]
          })(
            <InputCount max={64} placeholder="请输入标题" />
          )}
        </FormItem>
        <FormItem label="封面">
          {getFieldDecorator('coverImage', {
            initialValue: content.coverImage,
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            rules: [
              { required: true, type: "array", message: '请上传文章封面' }
            ]
          })(
            <OssUpload
              authToken={data.authToken}
              listType='picture-card'
              rule={{
                bizzCode: 'B_GZA_ORDER_IMG_NORMAL_UPLOAD',
                max: 2,
                suffix: 'jpg,jpeg,gif,png'
              }}
              len={1}
              tipContent={budget.taskContentStyle === 11 ? '图片尺寸比例为2.35:1,最大不能超过2MB' : '图片尺寸比例为1:1,最大不能超过2MB'}
            />
          )}
        </FormItem>
        <FormItem label={<span>&nbsp;&nbsp;&nbsp;作者</span>}>
          {getFieldDecorator('author', {
            initialValue: content.author,
            rules: [
              { max: 8, message: '最多输入8个字' }
            ]
          })(
            <InputCount max={8} placeholder="请输入作者" />
          )}
        </FormItem>
        <FormItem label="摘要">
          {getFieldDecorator('remark', {
            initialValue: content.remark,
            rules: [
              { required: true, message: '请填写摘要' },
              { max: 120, message: '最多输入120字的摘要' }
            ]
          })(
            <Input.TextArea
              placeholder='文章摘要'
              autosize={{
                minRows: 3,
                maxRows: 3
              }}
            />
          )}
        </FormItem>
        <FormItem label="阅读原文链接">
          {getFieldDecorator('articleUrl', {
            initialValue: content.articleUrl
          })(
            <Input placeholder='请输入网址' />
          )}
        </FormItem>
        <FormItem label="文章正文">
          {getFieldDecorator('richContent', {
            initialValue: content.richContent,
            validateTrigger: 'onBlur',
            rules: [
              { required: true, validator: this.validatorContent },
              {
                max: 2000,
                message: '最多输入2000个字',
                transform: value => value.toText()
              }
            ]
          })(
            <BraftEditor
              className="form-editor-container"
              controls={controls}
              media={{
                uploadFn: this.customUpload
              }}
              placeholder="请输入正文内容"
            />
          )}
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button onClick={this.cached}>上一步</Button>
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}

const validatorUploadMaterial = (rule, value, callback) => {
  if (!value) return callback('请上传素材')
  if (!value.type) return callback('请选择素材类型')
  if (value.type === 1) {
    if (value.images.length > 0) {
      callback()
    } else {
      callback('请上传素材')
    }
  }
  if (value.type === 2) {
    if (value.video) {
      callback()
    } else {
      callback('请上传素材')
    }
  }
}


/**
 * 微博平台
 */
@Form.create()
class ContentForWeibo extends React.Component {
  state = {}

  componentDidMount() { }

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    this.props.prev("content", newVal)
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        this.props.next("content", newVal)
      }
    });
  }

  render() {

    const { form, formLayout, data } = this.props
    const { base, budget, content } = data
    const { getFieldDecorator, getFieldValue, getFieldsValue } = form
    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="内容形式">
          {getFieldDecorator('taskContentStyle', {
            initialValue: (budget.taskTarget === 22 || !content.taskContentStyle) ? 21 : content.taskContentStyle,
            rules: [{
              required: true,
              message: '请选择内容发布形式'
            }]
          })(
            <Radio.Group>
              <Radio value={21}>直发</Radio>
              <Radio value={22} disabled={budget.taskTarget === 22}>转发</Radio>
            </Radio.Group>
          )}
        </FormItem>
        {getFieldValue('taskContentStyle') === 21 && <FormItem label="内容描述">
          {getFieldDecorator('content', {
            initialValue: content.content,
            rules: [
              { required: true, message: '请输入内容描述' },
              { max: 2000, message: '最多输入2000个字' }
            ]
          })(
            <Input.TextArea
              placeholder='微博内容'
              autosize={{
                minRows: 4,
                maxRows: 4
              }}
            />
          )}
        </FormItem>}
        {getFieldValue('taskContentStyle') === 21 && <FormItem label="素材">
          {getFieldDecorator('attachment', {
            initialValue: content.attachment,
            rules: [
              {
                required: true,
                type: "object",
                validator: validatorUploadMaterial
              }
            ]
          })(
            <UploadMaterial authToken={data.authToken} />
          )}
        </FormItem>}
        {getFieldValue('taskContentStyle') === 22 && <FormItem label="微博地址">
          {getFieldDecorator('url', {
            initialValue: content.url,
            rules: [
              { required: true, message: '请填写微博地址' },
              { type: "url", message: '请填写正确的链接' }
            ]
          })(
            <Input placeholder='输入微博文章链接' />
          )}
        </FormItem>}
        {getFieldValue('taskContentStyle') === 22 && <FormItem label="转发语">
          {getFieldDecorator('forwardWord', {
            initialValue: content.forwardWord,
            rules: [
              { max: 120, message: '最多输入120个字' }
            ]
          })(
            <Input.TextArea
              placeholder='输入转发语'
              autosize={{
                minRows: 2,
                maxRows: 2
              }}
            />
          )}
        </FormItem>}
        <footer>
          <FormItem label=' '>
            <Button onClick={this.cached}>上一步</Button>
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}

export default {
  weixin: ContentForWeixin,
  weibo: ContentForWeibo
}
