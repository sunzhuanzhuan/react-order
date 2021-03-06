import React from 'react'
import numeral from "@/util/numeralExpand"
import IconFont from "@/base/IconFont";

const StatisticsData = (props) => {
  let { value, format, iconType } = props
  if (!Array.isArray(value)) {
    value = [value]
  }
  let valueText = value.map(val => {
    val = val === 0 ? "0" : val
    return val ? numeral(val).format(format || '0,0') : '-'
  }).join(' / ') || '-'
  return (
    <div className='statistics-data-wrap' style={props.style}>
      {iconType && <span className='left'>
        <IconFont type={iconType}/>
      </span>}
      <span className='right'>
        {valueText}
      </span>
    </div>
  )
}

export default StatisticsData
