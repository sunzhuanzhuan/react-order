import React, { Component } from 'react'
import { Button, Col, Form, Pagination, Row, Spin } from 'antd'
import { linkTo } from '../../util/linkTo';
import CampaignCard from '../components/CampaignCard';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { parseUrlQuery } from '../../util/parseUrl';
import Yuan from '../../base/Yuan';

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
        // business_account_id
        this.state = {
            page: 1,
            ...parseUrlQuery()
        }
    }

    componentDidMount() {
        const { actions } = this.props
        const { business_account_id } = this.state
        actions.BSGetBusinessAccountInfo({ business_account_id })
        this.getList()
    }

    getList = (params = {}) => {
        const { actions } = this.props
        let search = { ...this.state, ...params }
        this.setState({ ...search, listLoading: true })
        actions.BSGetBusinessAccountCampaignList(search).finally(() => {
            this.setState({ listLoading: false })
        })
    }

    render() {
        const { business_account_id, listLoading } = this.state
        if (!business_account_id) {
            return <div>参数错误!</div>
        }
        const { business } = this.props
        const { businessAccountInfo, businessAccountCampaignList } = business
        const { pagination = {}, rows = [] } = businessAccountCampaignList
        return <div className='merchant-detail-container'>
            面包屑 / <a>面包屑</a>
            <div className='merchant-detail-top business-infos'>
                <Row>
                    <Col span={6}>
                        <span className='info-title'>商户名称</span>
                        <span className='info-value info-cut' title={businessAccountInfo.title || '-'}>{businessAccountInfo.title || '-'}</span>
                    </Col>
                    <Col span={6}>
                        <span className='info-title'>商户行业</span>
                        <span className='info-value'>{businessAccountInfo.industry_name || '-'}</span>
                    </Col>
                    <Col span={6}>
                        <span className='info-title'>商户联系人</span>
                        <span className='info-value info-cut' title={businessAccountInfo.contacter_name || '-'}>{businessAccountInfo.contacter_name || '-'}</span>
                    </Col>
                    <Col span={6}>
                        <span className='info-title'>商户联系方式</span>
                        <span className='info-value'>{businessAccountInfo.contacter_mobile || '-'}</span>
                    </Col>
                    <Col span={6}>
                        <span className='info-title'>商户已下订单数</span>
                        <span className='info-value'>{businessAccountInfo.order_total || '-'}</span>
                    </Col>
                    <Col span={6}>
                        <span className='info-title'>商户已下单金额</span>
                        <span className='info-value'><Yuan style={{ color: '#111' }} value={businessAccountInfo.order_amount} /></span>
                    </Col>
                    <Col span={6}>
                        <span className='info-title'>商户创建时间</span>
                        <span className='info-value'>{businessAccountInfo.contacter_time || '-'}</span>
                    </Col>
                </Row>
            </div>
            <header className='merchant-detail-head'>
                <h2>
                    商户订单
                    <small>共计 <a>{pagination.total}</a> 个订单</small>
                </h2>
                <Button type='primary' href={'/hwcampaign/index/addminiflashactive?business_account_id=' + business_account_id} target='_blank'>创建新活动</Button>
            </header>
            <Spin spinning={listLoading} delay={300}>
                {
                    rows.map(campaign => {
                        return <CampaignCard key={campaign.campaign_id} data={campaign} />
                    })
                }
            </Spin>
            <footer style={{ textAlign: 'right' }}>
                <Pagination
                    size="small"
                    total={pagination.total}
                    current={pagination.page}
                    pageSize={pagination.page_size}
                    showQuickJumper
                    onChange={(page) => {
                        this.getList({ page })
                    }}
                />
            </footer>
        </div>
    }
}
