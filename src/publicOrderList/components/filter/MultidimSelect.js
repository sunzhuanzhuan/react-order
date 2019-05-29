/*

*这是多选
*@author fuyu
*2019.3.19

*/
import React from 'react';
import { Form, Select, message } from 'antd';
import api from '../../../api/index'
const FormItem = Form.Item;
const Option = Select.Option;
class MultidimSelect extends React.Component {
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
              this.state.data.map(item => {
                return <Option key={item.id} value={item.id}>{item.platformName}</Option>
              })
            }
          </Select>
        )}
      </FormItem>
    )
  }
}

export default MultidimSelect
