import React, { Component } from "react"
import { Icon, Input, message, Tree, Popover } from 'antd'
import CheckTag from "@/accountManage/base/CheckTag";
import debounce from 'lodash/debounce'

const { TreeNode } = Tree;
const Search = Input.Search;

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.childrenList) {
      if (node.childrenList.some(item => item.id === key)) {
        parentKey = node.id;
      } else if (getParentKey(key, node.childrenList)) {
        parentKey = getParentKey(key, node.childrenList);
      }
    }
  }
  return parentKey;
};


class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      chinaCheckedKeys: [],
      otherCheckedKeys: []
    }
    this.coreSearch = debounce(this.coreSearch, 400)
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let chinaCheckedKeys = [], otherCheckedKeys = [];
      (nextProps.value || []).forEach(areaId => {
        if ((areaId + '').length > 3) {
          chinaCheckedKeys.push(areaId)
        } else {
          otherCheckedKeys.push(areaId)
        }
      })
      // let value = (nextProps.value || []).map(item => item.id)
      return {
        chinaCheckedKeys,
        otherCheckedKeys
      };
    }
    return null
  }

  triggerChange = (changedValue) => {
    const {
      areasMap
    } = this.props.areas
    const onChange = this.props.onChange;
    if (onChange) {
      // changedValue = changedValue.map(key => areasMap[key])
      onChange(changedValue);
    }
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  coreSearch = (value) => {
    const {
      cityList, chinaAreas
    } = this.props.areas
    let expandedKeys = []
    if (value) {
      expandedKeys = cityList.map(item => {
        if (item.areaName.indexOf(value) > -1) {
          return getParentKey(item.id, chinaAreas);
        }
        return null;
      })
        .filter((item, i, self) => item && self.indexOf(item) === i);
    }
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  }

  onChange = e => {
    const value = e.target.value;
    this.coreSearch(value)
  };

  onCheck = ({ chinaCheckedKeys, otherCheckedKeys }) => {
    if (chinaCheckedKeys) {
      otherCheckedKeys = [...this.state.otherCheckedKeys]
    } else {
      chinaCheckedKeys = [...this.state.chinaCheckedKeys]
    }
    let newKeys = [].concat(chinaCheckedKeys, otherCheckedKeys)
      .filter((item, i, self) => item && self.indexOf(item) === i).map(item => Number(item));
    if (newKeys.length > 5) {
      message.destroy()
      message.warn('最多不超过5个地点!', 1.5)
      return
    }

    this.setState({
      chinaCheckedKeys,
      otherCheckedKeys
    })

    this.triggerChange(newKeys)
  }

  onChinaCheck = (checkedKeys) => {
    this.onCheck({ chinaCheckedKeys: checkedKeys.checked })
  }
  onOtherCheck = (checkedKeys) => {
    this.onCheck({ otherCheckedKeys: checkedKeys })
  }
  hotCityCheck = (city) => {
    let newKeys = [...this.state.chinaCheckedKeys]
    let index = newKeys.indexOf(city.id)
    if (index > -1) {
      newKeys.splice(index, 1)
    } else {
      newKeys.push(city.id)
    }
    this.onCheck({ chinaCheckedKeys: newKeys })
  }

  render() {
    const {
      searchValue,
      expandedKeys,
      autoExpandParent,
      chinaCheckedKeys,
      otherCheckedKeys
    } = this.state;
    const {
      chinaAreas, foreignAreas, hotCity
    } = this.props.areas
    const loop = data =>
      data.map(item => {
        const index = item.areaName.indexOf(searchValue);
        const beforeStr = item.areaName.substr(0, index);
        const afterStr = item.areaName.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.areaName}</span>
          );
        if (item.childrenList) {
          return (
            <TreeNode key={item.id} title={title} checkable={item.areaLevel > 2}>
              {loop(item.childrenList)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.id} title={title} textKey={item.areaName} />;
      });
    return chinaAreas.length > 0 && <div className='popup-search-tree-select'>
      <header>
        <Search placeholder='搜索' onChange={this.onChange} />
      </header>
      <main>
        <ul className='shortcut-list'>
          {
            hotCity.map(city =>
              <li
                onClick={() => this.hotCityCheck(city)}
                className={chinaCheckedKeys.indexOf(city.id) > -1 ? 'active' : ''}
                key={city.id}
              >
                {city.areaName}
              </li>)
          }
        </ul>
        <div className='tree-content'>
          <h3>国内</h3>
          <Tree
            checkable
            checkStrictly
            checkedKeys={chinaCheckedKeys}
            selectable={false}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={this.onChinaCheck}
          >
            {loop(chinaAreas)}
          </Tree>
          <h3>国外</h3>
          <Tree
            checkable
            selectable={false}
            checkedKeys={otherCheckedKeys}
            // filterTreeNode={this.filterTreeNode}
            onCheck={this.onOtherCheck}
          >
            {loop(foreignAreas)}
          </Tree>
        </div>
      </main>
    </div>
  }
}


export default class AreasTreeSelect extends Component {
  constructor(props) {
    super(props);
    const value = props.value;
    this.state = {
      value
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || []
      };
    }
    return null
  }

  componentDidMount() {
    const { chinaAreas } = this.props.areas
    if (chinaAreas.length === 0) {
      this.props.actions.getAreasHotCity()
    }
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  onChange = (area, index) => {
    const { value } = this.state
    let newValue = [...value]
    // let index = value.indexOf(word)
    if (index < 0) {
      newValue.push(area)
    } else {
      newValue.splice(index, 1)
    }

    this.setState({ value: newValue }, () => {
      this.triggerChange(newValue)
    })
  }

  onPopChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value)
  }


  render() {
    // const { } = this.props
    const { value = [] } = this.state
    const { areas: { areasMap } } = this.props
    return <div>
      {
        value.map((item, index) => {
          const area = areasMap[item] || {areaName: '--', areaId: index}
          return <CheckTag checked key={area.id}>
            {area.areaName}
            <Icon
              style={{ fontSize: "14px", color: "#256ea3", marginLeft: '6px' }}
              type="close-circle"
              theme="filled"
              onClick={() => this.onChange(area, index)}
            />
          </CheckTag>
        })
      }
      <Popover
        overlayStyle={{ padding: 0 }}
        content={
          <SearchSelect value={value} onChange={this.onPopChange} areas={this.props.areas} />}
        placement="bottomLeft"
        trigger={value.length >= 5 ? [] : ['click']}
      >
        <a style={value.length >= 5 ? { color: '#aaa' } : {}} className='no-select-text' onClick={() => this.setState({ visible: true })}>+
          添加地点</a>
      </Popover>
    </div>
  }
}
