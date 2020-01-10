/**
 * Created by lzb on 2020-01-08.
 */
import React, { useEffect, useRef, useState } from 'react';
import Filters from '@/taskPool/components/Attribute/Filters';
import { Badge, Divider, message, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import CertificateOperationModal from '@/taskPool/components/Attribute/CertificateOperationModal';

const CertificateList = (props) => {
  const [ searching, setSearching ] = useState(false)
  const [ id, setId ] = useState(0)
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

  useEffect(() => {
    getList()
  }, [])

  const getList = (params = {}) => {
    let search = {
      page: Object.assign({}, that.current.search.page, params.page),
      form: Object.assign({}, that.current.search.form, params.form)
    }
    setSearching(true)
    that.current.search = search

    props.actions.TPQueryQualificationList(search).finally(() => {
      setSearching(false)
    })
  }

  // 下线行业分类
  const offline = (id, record) => {
    const { actions } = props
    Modal.confirm({
      title: '下线行业分类',
      content: `确认要下线${record.industryLevel === 1 ? '一' : '二'}级分类“${record.industryName}”么？`,
      onOk: () => {
        return actions.TPOfflineTask({ id }).then(() => {
          message.success('下线成功')
          getList({ page: { currentPage: 1 } })
        })
      }
    })
  }

  const columns = [
    {
      title: '资质ID',
      dataIndex: 'id',
    },
    {
      title: '资质名称',
      dataIndex: 'qualificationName',
      render: (name, record) => {
        return name
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      render: (text, record) => {
        return <div className="break-all">
          {text}
        </div>
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'option',
      render: (id, record) => {
        return <div>
          <a onClick={() => setId(id)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => offline(id, record)}>删除</a>
        </div>
      }
    }
  ]

  const { qualificationList: { keys, source, total, pageNum, pageSize } } = props.taskPoolData

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
      {id > 0 && <CertificateOperationModal type="update" id={id} onClose={() => setId(false)}/>}
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

export default CertificateList;
