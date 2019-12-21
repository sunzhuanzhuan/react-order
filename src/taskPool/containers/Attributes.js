/**
 * Created by lzb on 2019-12-03.
 */
import React, {  } from 'react';
import CertificateGroup from '../components/Attribute/CertificateGroup';
import { Collapse, Icon } from 'antd';
const { Panel } = Collapse;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};
const Attributes = (props) => {
  return (
    <div>
      <Collapse  bordered={false} defaultActiveKey={['1']}>
        <Panel header="组1" key="1" style={customPanelStyle}>
          <CertificateGroup/>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Attributes;
