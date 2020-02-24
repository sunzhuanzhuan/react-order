import React, { useState } from 'react';
import { Table, Modal, Button, message, Icon, Alert } from 'antd';
import {
  otherOrderStateMap,
  PARTNER_AWAIT,
  PENDING,
  OVER,
  MEDIUM_AWAIT,
  MEDIUM_REJECT,
  PARTNER_REJECT
} from '../../constants/orderConfig';
import api from '@/api';
import Scolltable from '@/components/Scolltable/Scolltable.js';
import CooperationModel, { RejectForm } from './CooperationModel';
import MessageIcon from '../../base/MessageIcon';
import moment from 'moment';
const format = 'YYYY-MM-DD';
const { confirm } = Modal;
function CooperationList(props) {
  const [selectedRow, setSelectedRow] = useState([]);
  const [isCleanSelected, setIscleanSelected] = useState(false);
  const { platformOrderList = {}, setModalProps, changePage, actions } = props;
  const { list = [] } = platformOrderList;
  //合作方确认
  function orderOK(title, adOrderId, okText) {
    confirm({
      title: title,
      okText: okText,
      onOk() {
        updatePlatformOrderAsync({ operationFlag: 1, adOrderIds: adOrderId });
      }
    });
  }
  //驳回、同意
  async function updatePlatformOrderAsync(params) {
    setIscleanSelected(false);
    await actions.TPUpdatePlatformOrder(params);
    changePage();
    setIscleanSelected(true);
    setSelectedRow([]);
    message.success('操作成功');
  }

  //上传执行单、上传结案报告）
  async function updatePlatformFileAsync(params) {
    await actions.TPUpdatePlatformFile(params);
    changePage();
    message.success('操作成功');
  }
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'adOrderNumber',
      key: 'adOrderNumber',
      align: 'center'
    },
    {
      title: '任务名称',
      dataIndex: 'orderName',
      key: 'orderName',
      width: '130px',
      render: (text, record) => {
        //adOrderId
        return (
          <div>
            <a href={`/order/task/tasks-details/${record.adOrderId}`}>{text}</a>
            <div>ID：{record.adOrderNumber}</div>
          </div>
        );
      }
    },
    {
      title: '所属公司',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '合作平台名称',
      dataIndex: 'platformName',
      key: 'platformName',
      render: (text, record) => text || '12306'
    },
    {
      title: '预计阅读数',
      dataIndex: 'actionNum',
      key: 'actionNum'
    },
    {
      title: '任务创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => `${moment(text).format(format)}`
    },
    {
      title: '投放开始~结束时间',
      dataIndex: 'orderStartEndDate',
      key: 'orderStartEndDate',
      width: '260px',
      align: 'center',
      render: (text, record) => `${moment(record.orderEndDate).format(format)} ~ 
      ${moment(record.orderEndDate).format(format)}`
    },
    {
      title: '销售经理',
      dataIndex: 'salesman',
      key: 'salesman'
    },
    {
      title: '订单状态',
      dataIndex: 'otherOrderState',
      key: 'otherOrderState',
      fixed: 'right',
      width: '120px',
      render: (text, record) => (
        <div>
          {otherOrderStateMap[text]}
          {text == MEDIUM_REJECT || text == PARTNER_REJECT ? (
            <MessageIcon title={record.refusalReason} />
          ) : null}
        </div>
      )
    },
    {
      title: '上传订单文件',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
      width: '130px',
      fixed: 'right',
      render: (text, record) => {
        //待合作方确定
        const partner_await = record.otherOrderState == PARTNER_AWAIT;
        //待执行
        const pending = record.otherOrderState == PENDING;
        const commProps = {
          okFn: updatePlatformFileAsync,
          adOrderId: record.adOrderId,
          item: record,
          cancelFn: () => setModalProps({ visible: false })
        };
        return (
          <>
            {partner_await ? (
              <a
                type="primary"
                onClick={() =>
                  setModalProps({
                    title: '请上传执行单并录入结算金额',
                    visible: true,
                    content: (
                      <CooperationModel
                        isPrice={partner_await}
                        fileUrl={record.execOrderUrl}
                        fileName={record.execOrderName}
                        {...commProps}
                      />
                    )
                  })
                }
              >
                <IconType value={record.execOrderUrl} /> 上传执行单
              </a>
            ) : null}

            {pending ? (
              <a
                type="primary"
                onClick={() =>
                  setModalProps({
                    title: '请上传结案报告',
                    visible: true,
                    content: (
                      <CooperationModel
                        fileUrl={record.finalReportUrl}
                        fileName={record.finalReportName}
                        {...commProps}
                      />
                    )
                  })
                }
              >
                <IconType value={record.finalReportUrl} /> 上传结案报告
              </a>
            ) : null}
          </>
        );
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      width: '230px',
      fixed: 'right',
      render: (text, record) => {
        //待媒介处理
        const medium_await = record.otherOrderState == MEDIUM_AWAIT;
        //待合作方确定
        const partner_await = record.otherOrderState == PARTNER_AWAIT;
        //待执行
        const pending = record.otherOrderState == PENDING;
        //已完成
        const over = record.otherOrderState == OVER;
        const { adOrderId, execOrderUrl, finalReportUrl } = record;
        return (
          <div className="children-mr">
            {medium_await ? (
              <Button type="primary" onClick={() => orderOK('确认订单递交给合作平台', [adOrderId])}>
                确认
              </Button>
            ) : null}
            {partner_await ? (
              <Button
                type="primary"
                disabled={!execOrderUrl}
                onClick={() => orderOK('确认后执行单和结算金额不可撤回', [adOrderId])}
              >
                确认
              </Button>
            ) : null}
            {pending ? (
              <Button
                disabled={!finalReportUrl}
                type="primary"
                onClick={() => orderOK('确认后结案报告不可撤回', [adOrderId])}
              >
                确定
              </Button>
            ) : null}
            {medium_await || partner_await ? (
              <Button
                type="primary"
                onClick={() =>
                  setModalProps({
                    title: '驳回',
                    visible: true,
                    content: (
                      <RejectForm
                        adOrderId={[adOrderId]}
                        okFn={updatePlatformOrderAsync}
                        cancelFn={() => setModalProps({ visible: false })}
                      />
                    )
                  })
                }
              >
                驳回
              </Button>
            ) : null}
            <Button
              onClick={() =>
                window.open(`/order/task/orders-coodetail?orderId=${adOrderId}`, '_self')
              }
            >
              查看详情
            </Button>
          </div>
        );
      }
    }
  ];
  const rowSelection = {
    rowSelection: selectedRow,
    onChange: selectedRowKeys => setSelectedRow(selectedRowKeys),
    getCheckboxProps: record => ({
      disabled: record.otherOrderState == MEDIUM_REJECT || record.otherOrderState == PARTNER_REJECT || record.otherOrderState == OVER
    })
  };
  const selectedRowSize = selectedRow.length;
  return (
    <>
      <Alert
        message={`已选择 ${selectedRowSize} 个账号，合计：${platformOrderList.total || '-'} 个`}
        type="info"
        style={{ marginTop: 20 }}
      />
      <Scolltable scrollClassName=".ant-table-body" widthScroll={2000}>
        <Table
          dataSource={list}
          key={isCleanSelected} //确认执行空清空选中数据
          columns={columns}
          rowSelection={rowSelection}
          scroll={{ x: 1800 }}
          rowKey="adOrderId"
          pagination={{
            pageSize: platformOrderList.pageSize || 1,
            showSizeChanger: true,
            showQuickJumper: true,
            total: platformOrderList.total,
            current: platformOrderList.pageNum,
            onShowSizeChange: (current, size) => {
              changePage({ page: { currentPage: current, pageSize: size } });
            },

            onChange: (page, pageSize) => {
              changePage({ page: { currentPage: page, pageSize: pageSize } });
            }
          }}
        />
      </Scolltable>

      <Button
        onClick={() => orderOK('确定批量执行', selectedRow, '确认执行')}
        disabled={selectedRow.length == 0}
      >
        批量确认
      </Button>
      <Button
        onClick={() =>
          setModalProps({
            title: '批量驳回',
            visible: true,
            content: (
              <RejectForm
                adOrderId={selectedRow}
                okFn={updatePlatformOrderAsync}
                cancelFn={() => setModalProps({ visible: false })}
              />
            )
          })
        }
        style={{ marginLeft: 20 }}
        disabled={selectedRow.length == 0}
      >
        批量驳回
      </Button>
    </>
  );
}

export default CooperationList;

const IconType = ({ value }) => {
  return value ? (
    <Icon type="check-circle" theme="filled" style={{ color: '#5ccd5c' }} />
  ) : (
      <Icon type="exclamation-circle" theme="filled" style={{ color: '#fd3d11' }} />
    );
};
