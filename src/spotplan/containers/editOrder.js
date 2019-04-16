import React from 'react'
import { Table, Form } from 'antd'
import { EditOrderFunc } from '../constants'
import Header from '../components/header'
class EditOrder extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    const { search } = this.props;
    this.props.queryData(3, { spotplan_id: search.spotplan_id }, this.handleEditTable);

  }
  handleEditTable = data => {
    const { setFieldsValue } = this.props.form;
    data.list.forEach(item => {
      setFieldsValue({
        [`${item.order_id}.price_name`]: item.price_name,
        [`${item.order_id}.account_category_name`]: item.account_category_name,
        [`${item.order_id}.is_replace`]: item.is_replace,
        [`${item.order_id}.release_form`]: item.release_form,
        [`${item.order_id}.content`]: item.content,
      });
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, handleUpdate } = this.props;
    const EditOrderCols = EditOrderFunc(getFieldDecorator, handleUpdate);
    return <div className='splotplan-edit-container'>
      <Header />
      <h3 className='top-gap'>订单列表</h3>
      <div className='edit-table-container top-gap'>
        <Form>
          <Table
            className='edit-table'
            rowKey='id'
            columns={EditOrderCols}
            dataSource={data.list || []}
            bordered
          />
        </Form>
      </div>
    </div>
  }
}
export default Form.create()(EditOrder)
