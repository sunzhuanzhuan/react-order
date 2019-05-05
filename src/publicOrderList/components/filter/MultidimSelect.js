/*

*这是多选
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class MultidimSelect extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <FormItem
        {...this.props.layout}
        label={this.props.label}
      >
        {getFieldDecorator(this.props.id)(
          <Select
            mode="multiple"
            style={{ width: '270px' }}
            allowClear={true}
          >
            {
              this.props.data.map(item => {
                return <Option key={item.value} value={item.value}>{item.key}</Option>
              })
            }
          </Select>
        )}
      </FormItem>
    )
  }
}

export default MultidimSelect
