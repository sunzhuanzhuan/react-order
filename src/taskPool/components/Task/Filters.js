/**
 * 列表筛选组件, 包括tab和筛选表单
 * Created by lzb on 2019-12-03.
 */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import {
  Button, Dropdown, Form, Icon,
  Input, Menu, Tabs, Select
} from "antd";
import { platformTypes } from "../../constants/config";
import { WBYPlatformIcon } from "wbyui";

const { TabPane } = Tabs;
const { Option } = Select;


const FilterForm = (props) => {

  const { getFieldDecorator } = props.form;
  return (
    <div className="page-filter-form">
      <Form.Item label="任务名称">
        {getFieldDecorator('snsName', {})(
          <Input placeholder="请输入" style={{ width: 120 }} allowClear />
        )}
      </Form.Item>
      <Form.Item label="任务ID">
        {getFieldDecorator('isFamous', {})(
          <Select style={{ width: 120 }} placeholder="请选择" allowClear>
            <Option value="1">是</Option>
            <Option value="2">否</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="创建人">
        {getFieldDecorator('platformId', {})(
          <Select style={{ width: 120 }} placeholder="请选择" allowClear>
            {
              [].map(item =>
                <Option key={item.id}>{item.platformName}</Option>)
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="任务状态">
        {getFieldDecorator('businessDeviserId', {})(
          <Select style={{ width: 120 }} optionLabelProp="name" allowClear placeholder="请选择"
                  dropdownMatchSelectWidth={false}>
            {
              [].map(item =>
                <Option key={item.id} name={item.realName}>
                  {item.realName}
                  <br />
                  {item.cellPhone}
                </Option>)
            }
          </Select>
        )}
      </Form.Item>
      <Form.Item label="任务类型">
        {getFieldDecorator('isAssigned', {})(
          <Select style={{ width: 120 }} placeholder="请选择" allowClear>
            <Option value="1">是</Option>
            <Option value="2">否</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>查询</Button>
        <Button type="primary" ghost onClick={() => props.form.resetFields()}>重置</Button>
      </Form.Item>
    </div>
  );
}

const Filters = (props) => {
  const [active, setActive] = useState('1')
  const filterForm = useRef(null);

  useEffect(() => {
    // onSearch(props.initialForms)
  }, [active])

  const tabChange = (key) => {
    props.form.resetFields()
    setActive(key)
  }

  const submit = e => {
    e && e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let filter = Object.assign({ pageNum: 1, active }, values)
        props.search(filter)
      }
    });
  };

  return (
    <Form className="page-filter" onSubmit={submit} layout="inline">
      <Tabs activeKey={active} onChange={tabChange} animated={false}>
        {
          platformTypes.map(pane => (
            <TabPane key={pane.id} tab={
              <span>
                {pane.title}
              </span>} />
          ))
        }
      </Tabs>
      <FilterForm
        form={props.form}
        key={"filter-" + active}
      />
    </Form>
  );
};

export default Form.create()(Filters);
