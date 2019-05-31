import React from 'react'
import { Table, Form, Modal, message } from 'antd'
import { EditOrderFunc } from '../constants'
import Header from '../components/header'
import ScrollTable from '../../components/Scolltable'

class EditOrder extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    const { search } = this.props;
    this.props.queryBasicInfo({ spotplan_id: search.spotplan_id });
    this.props.queryData(3, { spotplan_id: search.spotplan_id }, this.handleEditTable);
  }
  handleEditTable = data => {
    const { setFieldsValue } = this.props.form;
    data.list.forEach(item => {
      // setTimeout(() => {
      setFieldsValue({
        [`${item.order_id}.price_name`]: item.price_name || undefined,
        [`${item.order_id}.account_category_name`]: item.account_category_name || undefined,
        [`${item.order_id}.is_replace`]: item.is_replace || undefined,
        [`${item.order_id}.release_form`]: item.release_form || undefined,
        [`${item.order_id}.content`]: item.content || undefined,
      })
      // }, 0);
    })
  }
  handleDelete = order_id => {
    const { search, handleDelete } = this.props;
    Modal.confirm({
      title: '',
      content: '是否确认将该订单从本spotplan删除？',
      onOk: () => {
        handleDelete({ spotplan_id: search.spotplan_id, order_id }).then(() => {
          message.success('操作成功');
          this.props.queryData(3, { spotplan_id: search.spotplan_id }, this.handleEditTable);
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, handleUpdate, headerData, loading, search } = this.props;
    const EditOrderCols = EditOrderFunc(getFieldDecorator, handleUpdate, this.handleDelete);
    const paginationObj = {
      onChange: (page) => {
        this.props.queryData(3, { spotplan_id: search.spotplan_id, page }, this.handleEditTable);
      },
      total: parseInt(data && data.total),
      current: parseInt(data && data.page),
      pageSize: 50,
      showQuickJumper: true,
      size: 'small'
    };
    const winHeight = document.documentElement.clientHeight - 80 + 'px';
    return <div className='splotplan-edit-container' style={{ height: winHeight, overflowY: 'scroll', overflowX: 'hidden' }}>
      <Header data={headerData} />
      <h3 className='top-gap'>订单列表</h3>
      <div className='edit-table-container top-gap'>
        <Form>
          <ScrollTable scrollClassName='.ant-table-body' widthScroll={1800}>
            <Table
              className='edit-table'
              rowKey='id'
              columns={EditOrderCols}
              dataSource={data && data.list || []}
              bordered
              loading={loading}
              scroll={{ x: 1564 }}
              pagination={data && data.total > 50 ? paginationObj : false}
            />
          </ScrollTable>
        </Form>
      </div>
    </div>
  }
}
export default Form.create()(EditOrder)
