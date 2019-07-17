/**
 * Created by lzb on 2019-07-17.
 */
import React from 'react';

const Header = (props) => {
  return <div className={'component-section-header h' + (props.level || 1)}>
    <span>{props.title}</span>
  </div>;

};
export default Header
