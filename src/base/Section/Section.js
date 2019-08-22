/**
 * Created by lzb on 2019-07-17.
 */
import React from 'react';

const Section = (props) => {
  const { children } = props
  return <section className="component-section-container">
    {children}
  </section>;

};
export default Section
