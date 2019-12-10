import React, { useState, useEffect } from 'react'
import { Input } from 'antd';

import request from '@/api'
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




