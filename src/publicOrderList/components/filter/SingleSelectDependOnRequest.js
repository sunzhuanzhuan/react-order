/*

*这是下拉单选组件-下拉框数据依赖请求获取
*@author fuyu
*2019.3.19

*/
import React from 'react';
import axios from 'axios'
import { Select, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class SingleSelectDependOnRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    axios.get(this.props.url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { form, label, key, layout } = this.props
    const { getFieldDecorator } = form
    return <FormItem
      // {...layout}
      label={label}
      style={{ width: '200px' }}
    >
      {getFieldDecorator(key, "0")(
        <Select style={{ width: 150 }}>
          {
            this.state.data.map(item => {
              return <Option key={item.value} value={item.value}>{item.key}</Option>
            })
          }
        </Select>
      )}
    </FormItem>
  }
}

export default SingleSelectDependOnRequest
