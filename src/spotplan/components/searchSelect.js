import React from 'react'
import { Select, Spin } from "antd";
import debounce from 'lodash/debounce';

const Option = Select.Option

export default class SearchSelect extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      value: undefined,
      loading: false,
    }
    this.handleSearch = debounce(this.fetchData, 800);
  }
  componentDidMount() {
    let { action, dataToList, form } = this.props
    setTimeout(() => {
      action().then(dataToList).then((list) => {
        this.setState({ data: list });
        const project_id = form.getFieldValue('project_id');
        form.setFieldsValue({ project_id: `${project_id}` });
      });
    })

  }
  fetchData = (value) => {
    if (!value) {
      return
    }
    let { action, keyWord, dataToList } = this.props
    this.setState({ data: [], loading: true });
    action({ [keyWord]: value }).then(dataToList).then((list) => {
      this.setState({ data: list, loading: false });
    });
  }
  handleChange = (value) => {
    this.setState({ value, data: [] });
  }
  render() {
    const { data, value, loading } = this.state;
    const { item: [id, name] } = this.props;
    const options = data.map(d => <Option key={d[id]}>{d[name]}</Option>);
    return <Select
      showSearch
      value={value}
      showArrow={false}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={this.handleSearch}
      onChange={this.handleChange}
      notFoundContent={loading ? <div style={{ paddingLeft: '10px' }}><Spin size="small" /> </div> : null}
      style={{ width: 140 }}
      placeholder="请输入"
      {...this.props}
    >
      {options}
    </Select>
  }
}
