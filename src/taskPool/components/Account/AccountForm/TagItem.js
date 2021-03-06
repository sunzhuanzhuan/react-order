/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-01-06 15:29:58
 * @LastEditors  : wangxinyue
 * @LastEditTime : 2020-02-06 12:01:21
 */
import React, { useEffect, useState } from 'react'
import './TagItem.less'
import { Icon } from 'antd'
const list = [
  { name: '母婴鱼儿', value: 'D00' },
  { name: '鱼儿', value: 'D01' }
]
function TagItem(props) {
  const [value, setValue] = useState(props.value || [])

  useEffect(() => {
    props.onChange(value)
  }, [value])

  function changeValue(item) {
    if (value.includes(item)) {
      setValue(value.filter(one => one != item))
    } else {
      setValue([...value, item])
    }
  }

  return (
    <div className='tag-item'>
      {props.list.map(item => {
        const isActive = value.includes(item.itemKey)
        return <div key={item.itemKey} className={`item ${isActive ? 'active' : ''}`} onClick={() => changeValue(item.itemKey)}>{item.itemValue}
          {isActive ? <Icon type="close-circle" className='icon' /> : null}
        </div>
      })}
    </div>
  )
}

export default TagItem
