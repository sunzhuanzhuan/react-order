/*

*这是下单时间组件，要求：最早可以修改成30天以前，不可选择当前日期之后的日期
*@author fuyu
*2019.03.21

*/

import React from 'react'
import moment from 'moment';
import { Form, DatePicker } from 'antd';
const FormItem = Form.Item;
class PlaceOrderTime extends React.Component {
  disabledDate = (current) => {
    return current < moment().subtract(31, "days").endOf('day') || current > moment().endOf('day')
  }
  render() {
    const { form, type, id, initialValue, formLayout } = this.props
    const { getFieldDecorator } = form;
    return <FormItem
      label="下单时间"
      {...formLayout}
    >
      {getFieldDecorator(id, {
        initialValue: type == "can_label_place_order" ? moment() : moment(initialValue),
        rules: [{
          required: true, message: '本项为必选项，请选择！',
        }]
      })(
        <DatePicker
          disabledDate={this.disabledDate}
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "350px" }}
        />
      )}
    </FormItem>
  }
}

export default PlaceOrderTime
