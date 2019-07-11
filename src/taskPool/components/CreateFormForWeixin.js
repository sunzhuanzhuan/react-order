import React from 'react'
import BraftEditor from 'braft-editor'
import { convertRawToHTML, convertHTMLToRaw } from "braft-convert";
import { Form, Input, Button, Modal, message } from 'antd'
import htmlContent from '../constants/_html'
import { previewHtml } from "@/taskPool/constants/utils";
import 'braft-editor/dist/index.css'
import { parseUrlQuery } from "@/util/parseUrl";
import axios from "axios";
const { CancelToken, isCancel } = axios;

const FormItem = Form.Item

const handleHtmlToRawForWeixin = (htmlContent) => {
  let content = htmlContent.replace(/↵/g, "\n")
  let template = `<div id="template">${content}</div>`
  let doc = new window.DOMParser().parseFromString(template, 'text/html');
  // 处理图片
  let images = doc.getElementsByTagName('img')
  let length = images.length;
  for (let i = 0; i < length; ++i) {
    let imageItem = images[i];
    let src_ = imageItem.getAttribute('data-src');
    let realSrc = imageItem.getAttribute('src');
    if (!src_ || realSrc) continue;
    imageItem.src = src_;
    imageItem.parentElement.classList.add('media-wrap')
  }
  // 处理嵌入式媒体
  let embeds = doc.getElementsByTagName('iframe')
  for (let i = 0; i < embeds.length; ++i) {
    let embed = embeds[i];
    let src_ = embed.getAttribute('src') || embed.getAttribute('data-src') || "";
    let w_ = 660 || embed.getAttribute('data-w')
    let h_ = w_ / embed.getAttribute('data-ratio')
    let vid = parseUrlQuery(src_).vid;
    if (!vid) {
      continue;
    }
    vid = vid.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    embed.src = `//v.qq.com/txp/iframe/player.html?origin=https%3A%2F%2Fmp.weixin.qq.com&amp;vid=${vid}&amp;autoplay=false&amp;full=true&amp;show1080p=false&amp;isDebugIframe=false`;
    // embed.style = `width:100%;height:auto;display:block;overflow:hidden;`
    embed.style = `width:${w_}px;height:${h_}px;display:block;overflow:hidden;`
    embed.parentElement.classList.add('media-wrap', 'embed-wrap')
  }

  let result = doc.getElementById('template').innerHTML
  return convertHTMLToRaw(result)

}

const editorConfig = {
  controls: ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']
}

const myUploadFn = (param) => {
  let cancel;
  let formData = new window.FormData();
  let config = {
    headers: {
      'Authorization': "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IndlcXEtcXA4dXB5QmVlWEZzQXlhQmNJRVNoWUlURlhTdUxVMTM4SzV5YlVKSmtPSCJ9.mpK3jpsuXH62K2yW8sU9xIXQnClynqhGbQ8cTwJgrOhSaDUkiXLdxAWIpdIBOVZTWxX6opMD8gvND-zrin7s1g",
      'sessionId': "weqq-qp8upyBeeXFsAyaBcIEShYITFXSuLU138K5ybUJJkOH",
    },
    cancelToken: new CancelToken(c => { cancel = c;}),
    onUploadProgress: ({ total, loaded }) => {
      param.progress(parseFloat(Math.round(loaded / total * 100).toFixed(2)))
    }
  };
  formData.append("file", param.file);
  formData.append( "bizzCode", 'VIDEO_TEST');
  console.log(param, '===>>');
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
            alt: param.file.name,
          }
        })
      } else {
        param.error({
          msg: 'unable to upload.'
        })
      }
    })
    .catch(error => {
      if (isCancel(error)) {
        param.error({
          msg: '取消上传.'
        })
      } else {
        param.error({
          msg: 'unable to upload.'
        })
      }
    });

}


@Form.create()
export default class CreateFormForWeixin extends React.Component {

  state = {
    previewContent: null
  }

  componentDidMount() {
    // 异步设置编辑器内容
    setTimeout(() => {
      const content = handleHtmlToRawForWeixin(htmlContent)
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState(content)
      })
    }, 1000)

  }

  buildPreviewHtml() {
    let content = this.props.form.getFieldValue('content')
    let _html = content.toHTML()
    return previewHtml(_html)

  }

  preview = () => {
    /*
    this.setState({
      previewContent: <div
        className="braft-output-content"
        dangerouslySetInnerHTML={{ __html: this.buildPreviewHtml() }}
      />
    });
    */
    if (window.previewWindow) {
      window.previewWindow.close()
    }
    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()
  }
  handleSubmit = (event) => {

    event.preventDefault()

    this.props.form.validateFields((error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content.toRAW() // or values.content.toHTML()
        }
        // console.log(submitData)
        console.log(values.content.toHTML())
      }
    })

  }

  render() {

    const { getFieldDecorator } = this.props.form
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      }
    ]
    return (
      <div className="demo-container">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="文章标题">
            {getFieldDecorator('title', {
              rules: [{
                required: true,
                message: '请输入标题'
              }]
            })(
              <Input placeholder="请输入标题" />
            )}
          </FormItem>
          <FormItem label="文章正文">
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容')
                  } else {
                    callback()
                  }
                }
              }]
            })(
              <BraftEditor
                className="antd-editor-weixin"
                extendControls={extendControls}
                // excludeControls={['undo', 'redo', 'separator']}
                media={{
                  uploadFn: myUploadFn
                }}
                placeholder="请输入正文内容"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
        <Modal
          visible={!!this.state.previewContent}
          bodyStyle={{
            padding: "50px  16px 16px",
          }}
          footer={null}
          width={720}
          zIndex={99999}
          onCancel={() => {
            this.setState({
              previewContent: null
            });
          }}
        >
          {this.state.previewContent}
        </Modal>
      </div>
    )

  }

}
