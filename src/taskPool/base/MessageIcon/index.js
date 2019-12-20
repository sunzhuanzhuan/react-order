import React, { PureComponent } from 'react'
import { Tooltip, Icon } from 'antd';
export default class MeassageIcon extends PureComponent {
  render() {
    return (
      <Tooltip {...this.props} trigger="hover">
        <Icon type="question-circle" style={{ marginLeft: 4 }} />
      </Tooltip>
    )
  }
}
