import React, { Component } from 'react';
import { Radio, Input, Form } from 'antd';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;


export default class DataDetailsReviewWrap extends Component {

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { field = 'review[xxx]' } = this.props;
    return <div className='data-details-review-wrap'>
      {this.props.children}
      <footer className='review-actions'>
        <Form.Item>
          {getFieldDecorator(`${field}.value`, {
            rules: [{
              required: true,
              message: '必填!'
            }]
          })(<RadioGroup>
            <Radio value={1}>审核通过</Radio>
            <Radio value={2}>审核拒绝</Radio>
          </RadioGroup>)}
        </Form.Item>
          {getFieldValue(`${field}.value`) === 2 ? getFieldDecorator(`${field}.reason`, {
            rules: [{
              required: true,
              message: '必填!'
            }]
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />) : null}
      </footer>
    </div>;
  }
}
