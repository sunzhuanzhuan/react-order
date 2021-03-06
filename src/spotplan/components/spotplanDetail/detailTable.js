import React from 'react'
import { Table } from 'antd'
import { withRouter } from 'react-router-dom'
import ScrollTable from './Scrolltable'
import qs from 'qs'

class DetailTable extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { columns, dataSource, rowSelection, options, type, loading } = this.props;
    const _type = type == 'all' ? '' : type;
    const num = type == 'all' ? 0 : parseInt(type);
    const paginationObj = {
      onChange: (current) => {
        if (_type) {
          this.props.queryData({ ...search.keys, spotplan_id: search.spotplan_id, type: _type, page: current });
        } else {
          this.props.queryData({ ...search.keys, spotplan_id: search.spotplan_id, page: current });
        }
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
      pageSize: 50,
      showQuickJumper: true,
      // showSizeChanger: true,
      // pageSizeOptions: ['50', '100', '200'],
      size: 'small'
    };
    return <ScrollTable scrollClassName='ant-table-body' widthScroll={2400} num={num}>
      <Table
        className='spotplan_table_wrapper'
        rowSelection={rowSelection}
        rowKey={record => { return record.order_id ? record.order_id.toString() : '' }}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 2350 }}
        pagination={(options && options.total > 50) ? paginationObj : false}
        loading={loading}
      />
    </ScrollTable>
  }
}

export default withRouter(DetailTable)
