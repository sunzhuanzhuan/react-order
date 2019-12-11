/**
 * Created by lzb on 2019-11-04.
 */
import React from "react"
import { Popover, Icon } from "antd"
import "./index.less"
const QuestionTip = props => {
  const { title, content, type = "click", placement = "topLeft" } = props
  return (
    <span className="question-wrapped">
      <Popover
        arrowPointAtCenter
        placement={placement}
        title={ title }
        content={ <div style={{maxWidth: 300}}>
			{content}
		</div> }
        trigger={ type }
      >
        <Icon className="tip-icon" type="question-circle" />
      </Popover>
    </span>
  )
}

export default QuestionTip
