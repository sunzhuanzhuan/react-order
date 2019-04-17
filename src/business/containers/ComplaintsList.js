import React, { Component } from 'react'
import { Button, Table, message, Form, Input, InputNumber } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { IconText } from '../../base/DataGroup';
import Modal from 'antd/es/modal';
import moment from 'moment';


const CountDown = ({ date }) => {
  function appendZero(obj) {
    if (obj < 10) return '0' + '' + obj;
    else return obj;
  }
  if (!date) return ''
  let now = moment()
  let diff = moment(date) - now
    let duration = moment.duration(diff)
  let days = duration.days()
  let hours = duration.hours()
  let minutes = duration.minutes()
  let seconds = duration.seconds()
  if (days > 0) {
    return days + '天'
  } else {
    return <span style={{ color: 'red', fontWeight: '700' }}>
      {appendZero(hours) + ':' + appendZero(minutes) + ':' + appendZero(seconds)}
    </span>
  }
}

const mapStateToProps = (state) => ({
  business: state.business
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actions
  }, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
@Form.create()
export default class ComplaintsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratioLoading: false,
      id: '',
      search: {
        page: 1,
        page_size: 10
      }
    }
    this.columns = [
      {
        title: '申请时间',
        align: 'center',
        dataIndex: 'created_time'
      }, {
        title: '帐号信息',
        dataIndex: 'sns_name',
        render: (name, record) => {
          return <IconText text={name} platform={record.platform_id} />
        }
      }, {
        title: '订单ID',
        dataIndex: 'order_id'
      }, {
        title: '客户名称',
        align: 'center',
        dataIndex: 'company_name'
      }, {
        title: '所属销售',
        align: 'center',
        dataIndex: 'sale_name'
      }, {
        title: '处理倒计时',
        align: 'right',
        dataIndex: 'handle_count_down',
        render: (ratio, record) => {
          if (record.progress === 1) {
            // 小于一天加红加粗
            return <CountDown date={record.refund_end_time}/>
          }
          if (record.progress === 5) {
            return '已处理'
          }
          if (record.progress === 10) {
            return <span style={{ color: 'red' }}>过期未处理</span>
          }
        }
      }, {
        title: '退款比例',
        align: 'center',
        dataIndex: 'refund_ratio',
        render: (ratio, record) => {
          if (record.progress === 1) {
            return <Button ghost type='primary' onClick={() => this.handleRatio(record)}>输入比例</Button>
          }
          return <span style={{ color: 'red' }}>{ratio}%</span>
        }
      }, {
        title: '备注',
        dataIndex: 'note'
      }, {
        title: '操作人',
        dataIndex: 'operator'
      }
    ];
  }

  componentDidMount() {
    // 获取商户投诉列表
    this.getList()
  }

  getList = (params = {}) => {
    const { actions } = this.props
    this.setState({ listLoading: true })
    let search = { ...this.state.search, ...params }
    actions.BSGetCompensationList(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { actions } = this.props
        this.setState({ ratioLoading: true })
        actions.BSUpdateCompensation(values)
          .then(() => {
            message.success('处理成功', 1.3)
            this.getList()
            this.setState({ id: '' })
          })
          .finally(() => {
            this.setState({ ratioLoading: false })
          })
      }
    });
  }

  handleRatio = (record) => {
    this.setState({
      id: record.id,
      orderId : record.order_id
    })
  }

  render() {
    const { form, business } = this.props;
    const { pagination = {}, rows = [] } = business.businessCompensationList
    const { getFieldDecorator } = form;
    return <div className='complaints-list-container'>
      <header className='complaints-list-head'>
        <h2>
          投诉列表
        </h2>
      </header>
      <Table
        loading={this.state.listLoading}
        dataSource={rows}
        rowKey='id'
        columns={this.columns}
        pagination={{
          total: pagination.total,
          current: pagination.page,
          pageSize: pagination.page_size,
          onChange: (page) => {
            this.getList({ page })
          }
        }}
      />
      <Modal
        title={'订单: ' + this.state.orderId}
        visible={!!this.state.id}
        destroyOnClose
        onCancel={() => this.setState({ id: '' })}
        onOk={this.submit}
        okButtonProps={{ loading: this.state.ratioLoading }}
      >
        <Form layout='inline'>
          <Form.Item label="退款比例">
            {getFieldDecorator('refund_ratio', {
              rules: [
                { required: true, message: '请输入退款比例' }
              ]
            })(
              <InputNumber min={0} max={100} precision={0} placeholder='25' />
            )}
            <span style={{ margin: '0 14px 0 4px' }}>%</span>
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', margin: '0' }}>
            {getFieldDecorator('note')(
              <Input placeholder='添加退款备注内容' style={{ width: '240px' }} />
            )}
            {getFieldDecorator('id', {
              initialValue: this.state.id
            })(
              <input type='hidden' />
            )}
          </Form.Item>
        </Form>
        <ul className='complaints-list-modal-tips'>
          <li>
            1、请输入与媒介、客户协商后的比例；
          </li>
          <li>
            2、退款比例仅能输入1次，确定后不可修改比例；
          </li>
          <li>
            3、输入后<strong style={{ color: 'red' }}>订单完结</strong>，不可进行再次投诉；
          </li>
          <li>
            4、输入完毕将会触发退款动作，请谨慎操作。
          </li>
        </ul>
      </Modal>
    </div>
  }
}
