import React from 'react'
import ImageTextBlock from "@/base/DataGroup/ImageTextBlock";
import { Link } from 'react-router-dom'

const defaultImage = "http://img.weiboyi.com/vol1/1/102/124/v/f/42r16109n87o11r99p5o506o4op229o2/default.jpg"

const KolInfo = (props) => {
  return (
    <ImageTextBlock src={props.avatar || defaultImage}>
			<span style={{ wordBreak: "break-all" }}>
        {
          props.src ? <Link to={props.src} target="_blank">{props.title || '-'}</Link> : (props.title || '-')
        }
      </span>
    </ImageTextBlock>
  )
}

export default KolInfo
