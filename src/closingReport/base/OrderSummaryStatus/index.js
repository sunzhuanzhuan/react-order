import React from "react";
import { Badge } from "antd";
// 订单结案状态
const OrderSummaryStatus = ({ status, reason }) => {
  let _display = {
    '1': {
      status: 'default',
      text: '待提交内审'
    },
    '2': {
      status: 'processing',
      text: '待内审'
    },
    '3': {
      status: 'processing',
      text: '内审通过'
    },
    '4': {
      status: 'error',
      text: '内审被拒' //待修改
    },
    '5': {
      status: 'processing',
      text: '待品牌方审核'
    },
    '6': {
      status: 'error',
      text: '品牌方审核被拒' //待修改
    },
    '7': {
      status: 'success',
      text: '审核通过'
    }
  };
  let props = _display[status];
  return (
    <div className='head-left'>
      <Badge {...props} />
      {reason && <div style={{ color: 'red' }}>{reason}</div>}
    </div>
  );
};
export default OrderSummaryStatus;

// 数据完善状态
const OrderPlatformStatus = ({ orderStatus, data }) => {
  let orderStatusToStatus = {
    '1': 'is_finish',
    '2': 'check_status',
    '3': '__none__',
    '4': 'modify_status',
    '5': '__none__',
    '6': '__none__',
    '7': '__none__'
  };
  // ['1待完善' '2已完善' '3待审核' '4已审核' '5无需修改' '6待修改' '7已修改' '8品牌拒绝，待修改' '9审核完成']
  let _display = {
    'modify_status': {
      '1': {
        status: 'default',
        text: '待修改',
        index: '6'
      },
      '2': {
        status: 'success',
        text: '已修改',
        index: '7'
      },
      '3': {
        status: 'success',
        text: '无需修改',
        index: '5'
      }
    },
    'is_finish': {
      '1': {
        status: 'success',
        text: '已完善',
        index: '2'
      },
      '2': {
        status: 'error',
        text: '待完善',
        index: '1'
      }
    },
    'check_status': {
      '1': {
        status: 'processing',
        text: '待审核',
        index: '3'
      },
      '2': {
        status: 'success',
        text: '内审通过',
        index: '4'
      },
      '3': {
        status: 'error',
        text: '内审拒绝',
        index: '4'
      },
      '4': {
        status: 'processing',
        text: '品牌方待审核'
      },
      '5': {
        status: 'success',
        text: '品牌方通过',
        index: '9'
      },
      '6': {
        status: 'error',
        text: '品牌方拒绝',
        index: '8'
      }
    }
  };
  let key = orderStatusToStatus[orderStatus];
  let props = _display[key] && _display[key][data[key]];
  return (
    <div className='card-item-status'>
      {props ? <Badge {...props} /> : null}
    </div>
  );
};
