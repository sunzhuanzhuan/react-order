import React from "react"
import './style.less'

const CheckTag = props => {

  return <div {...props} className={'check-tag ' + (props.checked ? 'checked' : '')}>
    {props.children}
  </div>
}

export default CheckTag
