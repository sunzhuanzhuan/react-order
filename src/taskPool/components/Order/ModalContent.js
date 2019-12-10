import React, { useState, useEffect } from 'react'
import { Input, Form, DatePicker, Checkbox, Row, Col } from 'antd';
import { OssUpload } from 'wbyui'
import request from '@/api'
import './ModalContent.less'
//form布局
export const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
}
//接口请求
export const action = () => {
  return request.get('/toolbox-gateway/file/v1/getToken').then(({ data }) => {
    return data
  })
}

export function EditReceipt(props) {
  return (
    <div>
      回执链接:<Input onClick={props.onClick} />
    </div>
  )
}


