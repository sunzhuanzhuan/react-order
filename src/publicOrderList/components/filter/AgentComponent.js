/*

*这是下单平台/代理商
*@author fuyu
*2019.4.3

*/
import React from 'react';
import axios from 'axios'
import { Select, Form, message } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class AgentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentWillMount() {
    axios.get("/api/operator-gateway/trinityAgent/v1/getAgentList", {
      params: {
        agentStatus: 1, defaultAgent: 1
      }
    })
      .then((response) => {
        console.log(response)
        let data = response.data.data
        this.setState({
          data: [...data]
        })
      })
      .catch((error) => {
        message.error("数据获取失败")
      });
  }
  render() {
    const { form, label, id, layout } = this.props
    const { getFieldDecorator } = form
    return <FormItem
      {...layout}
      label={label}
      style={{ width: '350px' }}
    >
      {getFieldDecorator(id, { initialValue: 0 })(
        <Select>
          <Option key={0} value={0}>请选择</Option>
          {
            this.state.data.map(item => {
              return <Option key={item.id} value={item.id}>{`${item.cooperationPlatformName}-${item.agentName}`}</Option>
            })
          }
        </Select>
      )}
    </FormItem>
  }
}

export default AgentComponent
