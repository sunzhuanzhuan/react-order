import React from 'react'
import { Table, Form, Modal, message,Alert } from 'antd'
import { EditOrderFunc } from '../constants'
import Header from '../components/header'
import ScrollTable from '../../components/Scolltable'
import moment from 'moment'
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
        [`${item.order_id}.weibo_id`]: item.weibo_type == 23 ? '-' : item.weibo_id,
        [`${item.order_id}.client`]: item.client || undefined,
        [`${item.order_id}.content_type`]: item.content_type || undefined,
        [`${item.order_id}.content`]: item.content || undefined,
        [`${item.order_id}.publish_articles_address`]: item.publish_articles_address || undefined,
        [`${item.order_id}.cost`]: item.cost || undefined,
        [`${item.order_id}.costwithfee`]: item.costwithfee || undefined,
        [`${item.order_id}.publish_articles_at`]: moment(item.publish_articles_at).isValid() ? moment(item.publish_articles_at) : undefined,
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
        handleDelete({ spotplan_id: search.spotplan_id, order_id: [order_id] }).then(() => {
          message.success('操作成功');
          this.props.queryData(3, { spotplan_id: search.spotplan_id }, this.handleEditTable);
        })
      }
    })
  }
  render() {
    const { getFieldDecorator, getFieldValue, setFieldsValue, validateFields } = this.props.form;
    const { data, handleUpdate, headerData, loading, search } = this.props;
    const EditOrderCols = EditOrderFunc(getFieldDecorator, handleUpdate, this.handleDelete, getFieldValue, setFieldsValue, validateFields);
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
    return <div className='splotplan-edit-container'>
      <Header data={headerData} />
      <h3 className='top-gap'>订单列表    
       <Alert message="若包含返税订单，返税订单的Costwithfee请输入（返税金额/1.06），Cost请输入（Costwithfee金额/1.04）" type="warning" showIcon style={{display:'inline-block',marginLeft:'10px'}}/>
       </h3>
      <div className='edit-table-container top-gap'>
        <Form>
          <ScrollTable scrollClassName='.ant-table-body' widthScroll={3060}>
            <Table
              className='edit-table edit-table-fixed-width'
              rowKey='id'
              columns={EditOrderCols}
              dataSource={data && data.list || []}
              bordered
              loading={loading}
              scroll={{ x: 2600 }}
              pagination={data && data.total > 50 ? paginationObj : false}
            />
          </ScrollTable>
        </Form>
      </div>
    </div>
  }
}
export default Form.create()(EditOrder)
