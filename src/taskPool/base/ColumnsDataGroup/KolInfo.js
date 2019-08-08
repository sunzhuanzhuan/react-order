import React from 'react'
import ImageTextBlock from "@/base/DataGroup/ImageTextBlock";


const defaultImage = "http://img.weiboyi.com/vol1/1/102/124/v/f/42r16109n87o11r99p5o506o4op229o2/default.jpg"

const KolInfo = (props) => {
  return (
    <ImageTextBlock src={props.avatar || defaultImage}>
			<span style={{ lineHeight: "30px", whiteSpace: "nowrap" }}>
        {props.title}
      </span>
    </ImageTextBlock>
  )
}

export default KolInfo
