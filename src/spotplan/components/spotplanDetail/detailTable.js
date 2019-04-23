import React from 'react'
import { Table } from 'antd'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

class DetailTable extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { columns, dataSource, rowSelection, options, type, loading } = this.props;
    const _type = type == 'all' ? '' : type
    const paginationObj = {
      onChange: (current) => {
        this.props.queryData({ ...search.keys, page: current, page_size: options && options.page_size, type: _type });
        this.props.history.replace({
          pathname: this.props.location.pathname,
          search: `?${qs.stringify({ ...search, keys: { ...search.keys, page: current } })}`,
        });
      },
      // onShowSizeChange: (current, page_size) => {
      //   this.queryData({ ...search.keys, page: 1, page_size, type: _type });
      //   this.props.history.replace({
      //     pathname: this.props.location.pathname,
      //     search: `?${qs.stringify({ ...search, keys: { ...search.keys, page: current, page_size } })}`,
      //   });
      // },
      total: parseInt(options && options.total),
      current: parseInt(options && options.page),
      pageSize: parseInt(options && options.page_size),
      showQuickJumper: true,
      // showSizeChanger: true,
      // pageSizeOptions: ['50', '100', '200'],
      size: 'small'
    };
    return <Table
      rowSelection={rowSelection}
      rowKey={record => { return record.order_id ? record.order_id.toString() : '' }}
      columns={columns}
      dataSource={dataSource}
      bordered
      scroll={{ x: 1580 }}
      pagination={(options && options.page_size > 50) ? paginationObj : false}
      loading={loading}
    />
  }
}

export default withRouter(DetailTable)
