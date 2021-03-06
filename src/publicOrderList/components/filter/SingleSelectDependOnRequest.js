/*

*这是下拉单选组件-下拉框数据依赖请求获取
*@author fuyu
*2019.3.19

*/
import React from 'react';
import api from '../../../api/index'
import { Select, Form, message } from 'antd';
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
    api.get(this.props.url)
      .then((response) => {
        let data = response.data
        this.setState({
          data: [...data]
        })
      })
      .catch((error) => {
        message.error("数据获取失败")
      });
  }
  render() {
    const { form, label, id, layout, data } = this.props
    const { getFieldDecorator } = form
    return <FormItem
      {...layout}
      label={label}
    >
      {getFieldDecorator(id, { initialValue: 0 })(
        <Select style={{ width: '270px' }}>
          <Option key={0} value={0}>请选择</Option>
          {
            this.state.data.map(item => {
              return <Option key={item[data.key]} value={item[data.key]}>{item[data.value]}</Option>
            })
          }
        </Select>
      )}
    </FormItem>
  }
}

export default SingleSelectDependOnRequest
