/**
 * Created by lzb on 2020-01-08.
 */
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Filters from '@/taskPool/components/Attribute/Filters';
import { Badge, Divider, message, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import CertificateOperationModal from '@/taskPool/components/Attribute/CertificateOperationModal';
import IndustryOperationModal from '@/taskPool/components/Attribute/industryOperationModal';

const IndustryList = (props, ref) => {
  const [ searching, setSearching ] = useState(false)
  const [ id, setId ] = useState(0)
  const [ record, setRecord ] = useState({})

  const that = useRef({
    search: {
      page: {
        currentPage: 1,
        pageSize: 20
      },
      form: {}
    },
    isOfflineRequest: false
  })
  useImperativeHandle(ref, () => ({
    getList: () => {
      that.current.getList();
    }
  }));

  const getList = that.current.getList = (params = {}) => {
    let search = {
      page: Object.assign({}, that.current.search.page, params.page),
      form: Object.assign({}, that.current.search.form, params.form)
    }
    setSearching(true)
    that.current.search = search

    props.actions.TPGetIndustryList(search).finally(() => {
      setSearching(false)
    })
  }

  // 下线行业分类
  const offline = (id, record) => {
    const { actions } = props
    Modal.confirm({
      title: '下线行业分类',
      content: `确认要下线${record.industryLevel === 1 ? '一': '二'}级分类“${record.industryName}”么？`,
      onOk: () => {
        return actions.TPIndustryOnOff({ id, onOrOff: 2 }).then(() => {
          message.success('下线成功')
          getList({page: { currentPage: 1 }})
        })
      }
    })
  }
  // 上线行业分类
  const online = (id, record) => {
    const { actions } = props
    Modal.confirm({
      title: '上线行业分类',
      content: `确认要上线${record.industryLevel === 1 ? '一': '二'}级分类“${record.industryName}”么？`,
      onOk: () => {
        return actions.TPIndustryOnOff({ id, onOrOff: 1 }).then(() => {
          message.success('上线成功')
          getList({page: { currentPage: 1 }})
        })
      }
    })
  }

  const columns = [
    {
      title: '行业分类ID',
      dataIndex: 'id',
    },
    {
      title: '行业名称',
      dataIndex: 'industryName',
      render: (name, record) => {
        return name
      }
    },
    {
      title: '行业类型',
      dataIndex: 'industryLevel',
      render: (level, record) => {
        return <div>
          {level === 1 && <Badge status="warning" text="一级行业"/>}
          {level === 2 && <Badge status="success" text="二级行业"/>}
        </div>
      }
    },
    {
      title: '所属一级行业',
      dataIndex: 'parentName',
      render: (text, record) => {
        return text
      }
    },
    {
      title: '经营内容',
      dataIndex: 'scopeName',
      render: (text, record) => {
        return text
      }
    },
    {
      title: '行业备注',
      dataIndex: 'remark',
      render: (text, record) => {
        return <div className="break-all">
          {text}
        </div>
      }
    },
    {
      title: '分类状态',
      dataIndex: 'isOnline',
      render: (state, record) => {
        return <div>
          {state === 1 && "上线"}
          {state === 2 && "下线"}
        </div>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (text, record) => {
        return text
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'option',
      render: (id, record) => {
        return <div>
          {
            record.industryLevel === 1 && <>
              <a onClick={() => {
                setId(id)
                setRecord(record)
              }}>编辑</a>
            </>
          }
          {
            record.industryLevel === 2 && <>
              <Link to={'/order/task/attributes-update/' + id}>编辑</Link>
            </>
          }
          {
            record.isOnline === 1 && <>
              <Divider type="vertical" />
              <a onClick={() => offline(id, record)}>下线</a>
            </>
          }
          {
            record.isOnline === 2 && <>
              <Divider type="vertical" />
              <a onClick={() => online(id, record)}>上线</a>
            </>
          }
          {
            record.industryLevel === 1 && <>
              <Divider type="vertical" />
              <Link to={`/order/task/attributes-create/${id}/${record.industryName}`}>添加行业</Link>
            </>
          }
        </div>
      }
    }
  ]
  const { taskIndustryList: { keys, source, total, pageNum, pageSize } } = props.taskPoolData

  const dataSource = keys.map(key => source[key])

  const pagination = {
    total,
    pageSize,
    current: pageNum,
    showQuickJumper: true,
    showSizeChanger: true,
    onChange: (currentPage) => {
      getList({
        page: { currentPage }
      })
    },
    onShowSizeChange: (currentPage, pageSize) => {
      getList({
        page: { pageSize, currentPage: 1 }
      })
    }
  }

  return (
    <div>
      {id > 0 && <IndustryOperationModal
        record={record}
        type="update"
        id={id}
        onClose={() => {
          setId(false)
          setRecord({})
        }}
        onOk={() => getList()}
      />}
      <Filters search={getList} operation={{}} />
      <Table
        locale={{ emptyText: "还没有任务可以展示" }}
        loading={searching}
        dataSource={dataSource}
        pagination={pagination}
        columns={columns}
      />
    </div>
  );
};

export default forwardRef(IndustryList);
