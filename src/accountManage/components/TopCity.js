import React from 'react';
import '../base/SimpleTag.less';
import { Input, Button, Cascader } from 'antd';
import city from '@/constants/city';
import { analyzeAreaCode } from '@/util/analyzeAreaCode';
import isEqual from 'lodash/isEqual'

const InputGroup = Input.Group;

const fixStyle = {
  color: 'rgba(0, 0, 0, 0.65)',
  padding: '0 11px',
  background: '#fafafa'
};
function disabledList(list, cond) {
  return list.map((item) => {
    item.disabled = !!cond.some((condId = '') => item.id.toString() === condId.toString());
    if (item.childrenList) {
      item.childrenList = disabledList(item.childrenList, cond);
    }
    return item;
  });
}

class TopCity extends React.Component {

  handleSelect = index => n => {
    let _val = n || 0;
    let value = [...this.state.value];
    value[index] = _val.slice(-1)[0] || 0;
    if(!isEqual(this.state.value, value)){
      this.setState({
        list: disabledList(this.state.list, value)
      })
    }
    this.setState({
      value
    }, () => {
      this.props.onChange && this.props.onChange(value);
    });
  };
  constructor(props){
    super(props)
    let value = this.props.value || Array(3).fill(undefined)
    this.state = {
      value,
      list: disabledList(city, value)
    };
  }

  render() {
    const { value, list } = this.state;
    let _value = value.map(code => analyzeAreaCode(code));
    let filterList = list
    return <div>
      {
        _value.map((val, index) => (
          <InputGroup key={index} compact style={{ width: '186px', marginRight: '28px' }}>
            <Button disabled style={fixStyle}>TOP{index + 1}</Button>
            <Cascader
              fieldNames={{
                label: 'areaName',
                value: 'id',
                children: 'childrenList'
              }}
              defaultValue={val}
              placeholder="选择城市"
              displayRender={label => label.slice(-1)}
              style={{ width: 120 }}
              options={filterList}
              onChange={this.handleSelect(index)}
            />
          </InputGroup>
        ))
      }
    </div>;
  }

}

export default TopCity;
