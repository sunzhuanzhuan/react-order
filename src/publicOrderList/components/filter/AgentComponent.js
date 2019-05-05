/*

*这是下单平台/代理商
*@author fuyu
*2019.4.3

*/
import React from 'react';
import api from '../../../api/index'
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
    api.get("/operator-gateway/trinityAgent/v1/getAgentList", {
      params: {
        agentStatus: 1
      }
    })
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
    const { form, label, id, layout } = this.props
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
              return <Option key={item.id} value={item.id}>{`${item.cooperationPlatformName}-${item.agentName}`}</Option>
            })
          }
        </Select>
      )}
    </FormItem>
  }
}

export default AgentComponent
