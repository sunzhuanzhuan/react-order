import React from 'react'
import { Input } from 'antd';

function EditReceipt(props) {
  return (
    <div>
      回执链接:<Input onClick={props.onClick} />
    </div>
  )
}
export default EditReceipt
