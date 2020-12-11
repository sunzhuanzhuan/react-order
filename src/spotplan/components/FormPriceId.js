


import React from 'react'
import { Select, Form } from 'antd'
const { Option } = Select;
export default Form.create()(class extends React.Component {
  state = {
    btnValidate: false,
    reslutBtn: false,
    validateMessage: false,
    inputValue: '',
    data: {},
    isEdit: false
  }

  getSelectOption = (id, label, isTitle) => {
    const cls = isTitle ? `price_id_select_wrapper margin_item` : 'price_id_select_wrapper'
    return (
      <div className={cls}>
        <div className='price_id_wrapper'>{id}</div>
        <div>{label}</div>
      </div>
    )
  }

  getHistoryItem = (info, isTitle) => {
    const { priceId, label, time } = info;
    const cls = isTitle ? 'history_item_wrapper history_title_item' : 'history_item_wrapper';
    return (
      <div className={cls}>
        <div className='history_left'>{priceId}</div>
        <div className='history_center'>{label}</div>
        <div className='history_right'>{time}</div>
      </div>
    )
  }

  render() {
    const history_title_info = {
      priceId: 'price id',
      label: '价格名称',
      time: '确定时间',
    }
    const fakeData = [
      // {
      //   priceId: 234234234,
      //   label: '多图文第一条',
      //   time: '2020-02-03'
      // },
      // {
      //   priceId: 234234234,
      //   label: '多图文第一条',
      //   time: '2020-02-03'
      // },
      // {
      //   priceId: 234234234,
      //   label: '多图文第一条',
      //   time: '2020-02-03'
      // }
    ];
    const isShowHistory = Array.isArray(fakeData) && fakeData.length;
    const history_cls = isShowHistory ? 'history_comp' : 'empty_history_comp';
    return <>
      <div className='price_id_title'>当前price id</div>
      <Form>
        <Form.Item>
          <Select defaultValue="jadck" dropdownClassName='price_id_select_comp' dropdownRender={node => (
              <>
                {
                  this.getSelectOption('price id', '价格名称', true)
                }
                {node}
              </>
            )}>
            <Option value="jadck">
              {
                this.getSelectOption('234234', '多图文第一条')
              }
            </Option>
            <Option value="jsack">
              {
                this.getSelectOption('234234', '多图文第一条')
              }
            </Option>
            <Option value="jacfk">
              {
                this.getSelectOption('234234', '多图文第一条')
              }
            </Option>
          </Select>
        </Form.Item>
      </Form>
      <div className='history_label'>历史记录</div>
      {
        this.getHistoryItem(history_title_info, true)
      }
      <div className={history_cls}>
        {
          isShowHistory ? fakeData.map(item => this.getHistoryItem(item)) : <div>暂无历史记录</div>
        }
      </div>
    </>
  }
})
