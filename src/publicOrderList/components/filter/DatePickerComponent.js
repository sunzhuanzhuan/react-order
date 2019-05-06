/*

*这是时间选择组件
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Form, DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
    }
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        {...this.props.layout}
        label={this.props.label}
        style={{ width: '560px' }}
      >
        {getFieldDecorator(`${this.props.id}-startTime`)(
          <DatePicker
            disabledDate={this.disabledStartDate}
            format="YYYY-MM-DD"
            placeholder="开始时间"
            onChange={this.onStartChange}
          />
        )}
        <span>-</span>
        {getFieldDecorator(`${this.props.id}-endTime`)(
          <DatePicker
            disabledDate={this.disabledEndDate}
            format="YYYY-MM-DD"
            placeholder="结束时间"
            onChange={this.onEndChange}
          />
        )}
      </FormItem>
    )
  }
}

export default DatePickerComponent
