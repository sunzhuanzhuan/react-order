import React, { Component } from 'react'
import { Button, Table, Divider, Modal, Form, Input, Cascader, message } from 'antd'
import { linkTo } from '../../util/linkTo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

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
export default class MerchantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addLoading: false,
      addModal: false,
      search: {
        page: 1,
        page_size: 10
      }
    }
    this.columns = [
      {
        title: '商户名称',
        dataIndex: 'title'
      }, {
        title: '商户行业',
        dataIndex: 'industry_name'
      }, {
        title: '联系人',
        dataIndex: 'contacter_name'
      }, {
        title: '手机号',
        dataIndex: 'contacter_mobile'
      }, {
        title: '已下订单数',
        dataIndex: 'order_total'
      }, {
        title: '商户已下单金额',
        dataIndex: 'order_amount',
        render: (number) => {
          return '￥' + number
        }
      }
    ];
  }


  componentDidMount() {
    const { actions } = this.props
    // 获取可选行业信息
    actions.BSGetIndustryList()
    // 获取商户列表
    this.getList()
  }

  getList = (params = {}) => {
    const { actions } = this.props
    this.setState({ listLoading: true })
    let search = { ...this.state.search, ...params }
    actions.BSGetBusinessAccountList(search).finally(() => {
      this.setState({ listLoading: false })
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { actions } = this.props
        this.setState({ addLoading: true })
        actions.BSUpdateBusinessAccount(values)
          .then(() => {
            message.success('添加成功', 1.3)
            this.getList()
            this.setState({ addModal: false })
          })
          .finally(() => {
            this.setState({ addLoading: false })
          })
      }
    });
  }

  addBusiness = () => {
    this.submit()
  }

  removeBusiness = (id) => {
    const { actions } = this.props
    let hide = message.loading('删除中...')
    actions.BSDeleteBusinessAccount({ business_account_id: id }).then(() => {
      hide()
      message.success('删除成功!')
      this.getList()
    }).catch(hide)

  }

  render() {
    const { form, business } = this.props;
    const { pagination = {}, rows = [] } = business.businessAccountList
    const { getFieldDecorator } = form;
    return <div className='merchant-list-container'>
      <header className='merchant-list-head'>
        <h2>
          商户列表
          <small>共计 <a>{pagination.total}</a> 个商户</small>
        </h2>
        <Button type='primary' onClick={() => this.setState({ addModal: true })}>添加商户</Button>
      </header>
      <Table
        loading={this.state.listLoading}
        dataSource={rows}
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
        visible={this.state.addModal}
        title='填写商户信息'
        okText='添加商户'
        rowKey='id'
        destroyOnClose
        onOk={this.addBusiness}
        onCancel={() => this.setState({ addModal: false })}
        okButtonProps={{ loading: this.state.addLoading }}
      >
        <Form  {...formItemLayout}>
          <Form.Item label="商户名称">
            {getFieldDecorator('title', {
              rules: [
                { required: true, message: '请填写商户名称!' }
              ]
            })(
              <Input placeholder='请输入' />
            )}
          </Form.Item>
          <Form.Item label="商户行业">
            {getFieldDecorator('industry', {
              rules: [
                { required: true, message: '请选择商户行业!' }
              ]
            })(
              <Cascader
                placeholder='请输入'
                options={business.industryList}
                displayRender={(labels) => labels.slice(-1)}
              />
            )}
          </Form.Item>
          <Form.Item label="商户联系人">
            {getFieldDecorator('contacter_name', {
              rules: [
                { required: true, message: '请填写商户联系人!' }
              ]
            })(
              <Input placeholder='请输入' />
            )}
          </Form.Item>
          <Form.Item label="商户手机号">
            {getFieldDecorator('contacter_mobile', {
              rules: [
                { required: true, message: '请填写商户手机号!' },
                { len: 11, message: '请输入正确的手机号!' }
              ]
            })(
              <Input placeholder='请输入' />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  }
}
