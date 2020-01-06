/**
 * Created by lzb on 2019-11-05.
 */
import React, {} from 'react';
import { Alert, Spin } from 'antd'

const style = {
  textAlign: "center",
  background: "rgba(0, 0, 0, 0.03)",
  borderRadius: "4px",
  marginBottom: "20px",
  padding: "50px 0"
}


const LoadingWrapped = props => {
  if (typeof props.loading === "object") {
    let error = props.loading
    let description = error.errorMsg || '未知错误!'
    let code = error.code || '未知错误!'
    let type = error.type || "error"
    return <Alert
      message={`状态异常 - ${code}`}
      description={description}
      type={type}
      showIcon
    />
  } else if (props.loading) {
    return (
      <div style={style}>
        <Spin tip={'加载中...'} />
      </div>
    )
  } else {
    return (
      props.children
    )
  }

};

export default LoadingWrapped;
