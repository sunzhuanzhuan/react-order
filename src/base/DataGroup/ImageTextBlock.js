import React from 'react'

const ImageTextBlock = (props) => {
  return (
    <div className='image-text-infos'>
      <div className='left'>
        <img src={props.src} alt={props.alt} />
      </div>
      <div className='right'>
        {props.children}
      </div>
    </div>
  )
}

export default ImageTextBlock
