/**
 * Created by lzb on 2020-01-08.
 */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Filters from '@/taskPool/components/Attribute/Filters';
import { Badge, Divider, message, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import CertificateOperationModal from '@/taskPool/components/Attribute/CertificateOperationModal';
import IndustryOperationModal from '@/taskPool/components/Attribute/industryOperationModal';

const CertificateList = (props, ref) => {
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

  useEffect(() => {
    getList()
  }, [])

  const getList = that.current.getList = (params = {}) => {
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

  // 删除行业资质
  const deleted = (id, record) => {
    const { actions } = props
    Modal.confirm({
      title: '删除行业资质',
      content: `确认要删除行业资质“${record.qualificationName}”么？`,
      onOk: () => {
        return actions.TPUpdateQualification({ id: record.id,  isDeleted: 1}).then(() => {
          message.success('删除成功')
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
        return <div style={{maxWidth: 600}} className="break-all">
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
          <a onClick={() => {
            setId(id)
            setRecord(record)
          }}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => deleted(id, record)}>删除</a>
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
      {id > 0 && <CertificateOperationModal
        record={record}
        type="update"
        id={id}
        onClose={() => {
        setId(false)
        setRecord({})
      }}
        onOk={() => getList()}
      />}
      <Table
        loading={searching}
        dataSource={dataSource}
        pagination={pagination}
        columns={columns}
      />
    </div>
  );
};

export default forwardRef(CertificateList);
