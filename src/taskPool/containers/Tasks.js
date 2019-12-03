/**
 * Created by lzb on 2019-12-03.
 */
import React, {} from 'react';
import { Tabs, Typography } from 'antd';
import Filters from '../components/Task/Filters';

const { Title } = Typography;
const { TabPane } = Tabs;

const Tasks = (props) => {
  return (
    <div className='task-pool-page-container manage-page'>
      <Title level={4}>任务管理</Title>
      <Filters/>
    </div>
  );
};

export default Tasks;
