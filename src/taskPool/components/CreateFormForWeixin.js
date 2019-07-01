import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button } from 'antd'
import htmlContent from '../constants/_html'
import 'braft-editor/dist/index.css'
import { previewHtml } from "@/taskPool/constants/utils";

const FormItem = Form.Item

const handleHtmlForWeixin = (htmlContent) => {
  let content = htmlContent.replace(/↵/g, "\n")
  let template = `<div id="template">${content}</div>`
  let doc = new window.DOMParser().parseFromString(template, 'text/html');
  let images = doc.getElementsByTagName('img')
  let length = images.length;
  for (let i = 0; i < length; ++i) {
    let imageItem = images[i];
    let src_ = imageItem.getAttribute('data-src');
    let realSrc = imageItem.getAttribute('src');
    if (!src_ || realSrc) continue;
    imageItem.src = src_;
    imageItem.style.cssText += ";margin: 0 auto;";
  }
  let result = doc.getElementById('template').innerHTML
  console.log(result, '===>');
  return result

}

@Form.create()
export default class CreateFormForWeixin extends React.Component {

  componentDidMount() {
    // 异步设置编辑器内容
    setTimeout(() => {
      const content = handleHtmlForWeixin(htmlContent)
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
        console.log(submitData)
      }
    })

  }

  render() {

    const { getFieldDecorator } = this.props.form
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']
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
                className="my-editor"
                controls={controls}
                extendControls={extendControls}
                placeholder="请输入正文内容"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )

  }

}
