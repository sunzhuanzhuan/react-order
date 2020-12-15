import React from 'react'
import { Select, Form, Spin } from 'antd'
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

  getOptionItem = (id, label, isTitle) => {
    const cls = isTitle ? `price_id_select_wrapper margin_item` : 'price_id_select_wrapper'
    return (
      <div className={cls}>
        <div className='price_id_wrapper'>{id}</div>
        <div>{label}</div>
      </div>
    )
  }

  getHistoryItem = (info, isTitle) => {
    const { price_id, price_name, created_at } = info;
    const cls = isTitle ? 'history_item_wrapper history_title_item' : 'history_item_wrapper';
    return (
      <div className={cls} key={`${price_id}-${created_at}`}>
        <div className='history_left'>{price_id}</div>
        <div className='history_center'>{price_name}</div>
        <div className='history_right'>{created_at}</div>
      </div>
    )
  }

  getSelectOption = price => {
    if(!(Array.isArray(price) && price.length)) {
      return null
    }
    return price.map(item => {
      const { price_id, price_name } = item;
      return (
        <Option value={price_id} key={price_id}>
          {
            this.getOptionItem(price_id, price_name)
          }
        </Option>
      )
    })
  }

  render() {
    const { form, priceIdInfo = {}, priceIdHistoryInfo = [], initialValue, loading } = this.props;
    const { getFieldDecorator } = form;
    const { rows = []} = priceIdInfo;
    const { price = [] } = rows[0] || {};
    const history_title_info = {
      price_id: 'price id',
      price_name: '价格名称',
      created_at: '修改时间',
    }
    console.log('lskdjflskjdflj', initialValue)
    const isShowHistory = Array.isArray(priceIdHistoryInfo) && priceIdHistoryInfo.length;
    const history_cls = isShowHistory ? 'history_comp' : 'empty_history_comp';
    return <Spin spinning={Boolean(loading)}>
      <div className='price_id_title'>当前price id</div>
      <Form>
        <Form.Item>
        {
          getFieldDecorator('price_id', {
            initialValue
          })(
              <Select 
                onChange={this.props.handlePriceIdChange}
                dropdownClassName='price_id_select_comp' 
                dropdownRender={node => (
                  <>
                    {
                      this.getOptionItem('price id', '价格名称', true)
                    }
                    {node}
                  </>
                )}
              >
                {
                  this.getSelectOption(price)
                }
              </Select>
          )
        }
        </Form.Item>
      </Form>
      <div className='history_label'>历史记录</div>
      {
        this.getHistoryItem(history_title_info, true)
      }
      <div className={history_cls}>
        {
          isShowHistory ? priceIdHistoryInfo.map(item => this.getHistoryItem(item)) : <div>暂无历史记录</div>
        }
      </div>
    </Spin>
  }
})
