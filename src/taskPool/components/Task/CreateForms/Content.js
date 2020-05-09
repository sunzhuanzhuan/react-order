/**
 * 创建任务-撰写内容表单
 */
import React from 'react'
import BraftEditor from "braft-editor";
import {
  Form,
  Radio,
  Button,
  Input,
  message, Icon
} from 'antd'
import { InputCount } from "@/base/Input";
import axios from "axios";
import { OssUpload } from "wbyui";

import cookie from "js-cookie";
import 'braft-editor/dist/index.css'
import UploadMaterial from "@/taskPool/components/Task/CreateForms/UploadMaterial";
import { MEDIA_TYPE_VIDEO } from '@/taskPool/constants/config';
import { uploadRequired } from '@/util/uploadRequired';


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
  static mediaAccepts = {
    image: 'image/png,image/jpeg,image/gif,image/webp',
    video: 'video/mp4,video/x-flv,flv-application/octet-stream,video/quicktime,video/x-msvideo',
    audio: false
  }
  state = {}

  // 暂存 & 上一步
  cached = () => {
    let newVal = Object.assign({}, this.props.form.getFieldsValue())
    this.props.prev("content", newVal)
  }

  // 富文本编辑自定义上传
  customUpload = (param) => {
    const { data, authToken } = this.props
    let formData = new window.FormData();
    let config = {
      headers: {
        'Authorization': authToken,
        'sessionId': cookie.get('token')
      },
      onUploadProgress: ({ total, loaded }) => {
        param.progress(parseFloat(Math.round(loaded / total * 100).toFixed(2)))
      }
    };
    let rules = {
      "image": "ORDER_IMG_UPLOAD",
      "video": "ORDER_VIDEO_UPLOAD"
    }
    if (/^image\//.test(param.file.type)) {
      formData.append("bizzCode", rules['image']);
    } else {
      formData.append("bizzCode", rules['video']);
    }

    formData.append("file", param.file);
    axios.post("/api/common-file/file/v1/uploadPubBucket", formData, config)
      .then(({ data: response }) => {
        if (response.code === '1000') {
          // 处理文件显示
          response.url = response.data;
          param.success({
            url: response.data,
            meta: {
              id: param.file.uid,
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
    if (!value || value.isEmpty()) {
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
        <FormItem label="文章标题">
          {getFieldDecorator('title', {
            initialValue: content.title,
            rules: [
              { required: true, message: '请输入标题', whitespace: true },
              { max: 64, message: '最多输入64个字' }
            ]
          })(
            <InputCount max={64} placeholder="请输入标题" />
          )}
        </FormItem>
        <FormItem label={<span>&nbsp;&nbsp;&nbsp;文章作者</span>}>
          {getFieldDecorator('author', {
            initialValue: content.author,
            rules: [
              { max: 8, message: '最多输入8个字' }
            ]
          })(
            <InputCount max={8} placeholder="请输入作者" />
          )}
        </FormItem>
        <FormItem label="文章封面">
          {getFieldDecorator('coverImage', {
            initialValue: content.coverImage,
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            validateTrigger: 'onSubmit',
            rules: [
              { message: '请上传文章封面', ...uploadRequired }
            ]
          })(
            <OssUpload
              authToken={this.props.authToken}
              listType='picture-card'
              rule={{
                bizzCode: 'FWP_IMG_UPLOAD',
                max: 2,
                suffix: 'png,jpg,jpeg,gif,webp'
              }}
              len={1}
              tipContent={'请上传PNG,JPG,JPEG,GIF,WEBP格式的图片,尺寸比例为2.35:1,最大不能超过2MB'}
            />
          )}
        </FormItem>
        <FormItem label={<span>&nbsp;&nbsp;&nbsp;摘要</span>}>
          {getFieldDecorator('remark', {
            initialValue: content.remark,
            rules: [
              { max: 120, message: '最多输入120字的摘要' }
            ]
          })(
            <Input.TextArea
              placeholder='选填，如果不填写会默认抓取正文前54个字'
              autoSize={{
                minRows: 3,
                maxRows: 3
              }}
            />
          )}
        </FormItem>
        <FormItem label={<span>&nbsp;&nbsp;&nbsp;阅读原文链接</span>}>
          {getFieldDecorator('articleUrl', {
            initialValue: content.articleUrl,
            rules: [ {
              pattern: /^htt(p|ps):\/\//,
              message: '链接格式不正确'
            } ]
          })(
            <Input placeholder='请输入阅读原文链接' />
          )}
        </FormItem>
        <FormItem label="内容正文" extra="请输入不超过20000字的正文内容">
          {getFieldDecorator('richContent', {
            initialValue: content.richContent,
            validateTrigger: 'onBlur',
            rules: [
              { required: true, validator: this.validatorContent },
              {
                max: 20000,
                message: '最多输入20000个字',
                transform: value => value && value.toText()
              }
            ]
          })(
            <BraftEditor
              className="form-editor-container"
              controls={controls}
              media={{
                uploadFn: this.customUpload,
                accepts: this.mediaAccepts
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

/**
 * 12306平台
 */
@Form.create()
class ContentFor12306 extends React.Component {
  state = {}

  componentDidMount() {
  }

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
        <FormItem label="内容正文">
          {getFieldDecorator('content', {
            initialValue: content.content,
            rules: [
              { required: true, message: '请输入内容正文' },
              { max: 140, message: '最多输入140个字' }
            ]
          })(
            <Input.TextArea
              placeholder='请输入内容正文，最多为140字'
              autoSize={{
                minRows: 2,
                maxRows: 2
              }}
            />
          )}
        </FormItem>
        <FormItem label="上传图片">
          {getFieldDecorator('image', {
            initialValue: content.image || [],
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            validateTrigger: 'onSubmit',
            rules: [ { message: '请上传图片', ...uploadRequired } ]
          })(
            <OssUpload
              authToken={this.props.authToken}
              listType='picture-card'
              rule={{
                bizzCode: 'FWP_TRIP_IMG_UPLOAD',
                max: 1 / 1024 * 50,
                suffix: 'png,jpg,jpeg,gif,webp'
              }}
              len={1}
              tipContent="请上传PNG,JPG格式的图片,横图尺寸比例为800px*600px，文件大小需小于50kb"
            />
          )}
        </FormItem>
        {budget.mediaType === MEDIA_TYPE_VIDEO && <FormItem label="上传视频">
          {getFieldDecorator('video', {
            initialValue: content.video || [],
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList.slice(-1),
            validateTrigger: 'onSubmit',
            rules: [ { message: '请上传视频', ...uploadRequired } ]
          })(
            <OssUpload
              authToken={this.props.authToken}
              listType='picture'
              rule={{
                bizzCode: 'FWP_TRIP_VIDEO_UPLOAD',
                max: 1.5,
                suffix: 'mp4'
              }}
              tipContent="请上传MP4格式的视频，文件大小需不超过1.5Mb"
            >
              <a><Icon type="upload" /> {getFieldValue('video').length > 0 ? "重新上传" : "上传视频"}</a>
            </OssUpload>
          )}
        </FormItem>}
        {
          this.props.qualificationsGroups.map((item, n) => {
            const value = (content.qualificationsFile || [])[n] || {}
            return <div key={item.id}>
              <FormItem label={`资质上传(${n + 1})`}>
                <div>
                  需上传
                  {
                    item.groupQualificationMappingReqList.map(item => "《" + item.qualificationName + "》")
                      .join("或")
                  }
                </div>
                {getFieldDecorator(`qualificationsFile[${n}].files`, {
                  initialValue: value.files || [],
                  valuePropName: 'fileList',
                  getValueFromEvent: e => e && e.fileList.slice(-1),
                  validateTrigger: 'onSubmit',
                  rules: [ { message: '请上传资质', ...uploadRequired} ]
                })(
                  <OssUpload
                    authToken={this.props.authToken}
                    listType='picture'
                    rule={{
                      bizzCode: 'FWP_QUALIFICATIONS_UPLOAD',
                      max: 50,
                    }}
                    tipContent="上传格式为全文件，文件大小不超过50Mb"
                  >
                    <a><Icon type="upload" /> {getFieldValue(`qualificationsFile[${n}]`).length > 0 ? "重新上传" : "上传资质文件"}</a>
                  </OssUpload>
                )}
              </FormItem>
              {getFieldDecorator(`qualificationsFile[${n}].id`, {
                initialValue: item.id,
              })(<Input type="hidden"/>)}
            </div>
          })
        }
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
  if (value.type === 0) {
    callback()
  }
  if (!value.type) return callback('请选择素材类型')
  if (value.type === 1) {
    if (value.images.length > 0 && value.images.every(item => item.url)) {
      callback()
    } else {
      callback('请上传素材')
    }
  }
  if (value.type === 2) {
    if (value.video && value.video.url) {
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

  componentDidMount() {
  }

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
            rules: [ {
              required: true,
              message: '请选择内容发布形式'
            } ]
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
              autoSize={{
                minRows: 4,
                maxRows: 4
              }}
            />
          )}
        </FormItem>}
        {getFieldValue('taskContentStyle') === 21 && <FormItem label="素材">
          {getFieldDecorator('attachment', {
            initialValue: content.attachment,
            validateTrigger: "onSubmit",
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
              { type: "url", message: '请填写正确的微博地址' }
            ]
          })(
            <Input placeholder='输入微博文章链接' />
          )}
        </FormItem>}
        {getFieldValue('taskContentStyle') === 22 &&
        <FormItem label={<span>&nbsp;&nbsp;&nbsp;转发语</span>}>
          {getFieldDecorator('forwardWord', {
            initialValue: content.forwardWord,
            rules: [
              { max: 120, message: '最多输入120个字' }
            ]
          })(
            <Input.TextArea
              placeholder='输入转发语'
              autoSize={{
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
  weibo: ContentForWeibo,
  12306: ContentFor12306
}
