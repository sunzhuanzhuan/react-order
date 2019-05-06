import React, { Component } from 'react'
import OrderItem from './OrderItem';
import './CampaignCard.less'
import Yuan from '../../base/Yuan';

export default class CampaignCard extends Component {
    componentDidMount() {}

    render() {
        const { data } = this.props
        return <section className='campaign-card-container'>
            <header className='campaign-card-head'>
                <div className='campaign-head-info-item'>
                    <span className='title'>
                        开始时间
                    </span>
                    <span className='value'>
                        {data.start_time}
                    </span>
                </div>
                <div className='campaign-head-info-item'>
                    <span className='title'>
                        活动ID
                    </span>
                    <span className='value'>
                        {data.campaign_id}
                    </span>
                </div>
                <div className='campaign-head-info-item'>
                    <span className='title'>
                        活动名称
                    </span>
                    <span className='value'>
                        {data.name}
                    </span>
                </div>
                <div className='campaign-head-info-item'>
                    <span className='title'>
                        订单数
                    </span>
                    <span className='value'>
                        {data.order_total}
                    </span>
                </div>
                <div className='campaign-head-info-item'>
                    <span className='title'>
                        活动成本
                    </span>
                    <span className='value'>
                        <Yuan value={data.cost_amount} />
                    </span>
                </div>
                {data.type === 1 && <div className='campaign-head-info-item'>
                    <span className='title'>
                        实收商户
                    </span>
                    <span className='value'>
                        <Yuan value={data.start_time} />
                    </span>
                </div>}
                <div className='campaign-head-info-item'>
                    <span className='title'>
                        活动状态
                    </span>
                    <span className='value'>
                        {data.status_text}
                    </span>
                </div>
                <div className='campaign-head-info-item head-right'>
                    <a>活动详情</a>
                </div>
            </header>
            <main className='campaign-card-main'>
                {
                    (data.order_list || []).map(order => {
                        return <OrderItem key={order.order_id} data={order}/>
                    })
                }
            </main>
        </section>
    }
}
