import React, { PureComponent } from 'react'
import { Tooltip, Popover, Icon } from 'antd';
export default class MeassageIcon extends PureComponent {
  render() {
    return (
      <Tooltip {...this.props} trigger="hover" getPopupContainer={() => document.querySelector('.task-pool-router-wrapper')}>
        <Icon type="question-circle" style={{ marginLeft: 4 }} />
      </Tooltip>
    )
  }
}
export class PopoverIcon extends PureComponent {
  render() {
    return (
      <Popover {...this.props} trigger="hover" getPopupContainer={() => document.querySelector('.task-pool-router-wrapper')}>
        <Icon type="question-circle" style={{ marginLeft: 4 }} />
      </Popover>
    )
  }
}
