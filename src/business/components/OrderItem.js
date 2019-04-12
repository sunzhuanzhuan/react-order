import React, { Component } from 'react'
import { Badge, Button } from 'antd'
import AccountInfos, { Name, Avatar, QRCode } from './AccountInfos';
import Yuan from '../../base/Yuan';

export default class OrderItem extends Component {
    componentDidMount() {}

    render() {
        const { data } = this.props
        return <div className='order-item'>
            <div className='columns-order-id'>
                <div className='title'>
                    订单ID
                </div>
                <div className='value'>
                    {data.order_id}
                </div>
            </div>
            <div className='columns-account-infos'>
                <Avatar src={data.face_url}/>
                <AccountInfos>
                    <Name name={data.accountname} platformId={data.weibo_type}/>
                    {
                        data.weibo_type == 9 ?
                            <QRCode
                                sns_id={data.weibo_id}
                                src={data.image_file_name}
                                verification_info={data.verification_info}
                                introduction={data.introduction}
                            /> :
                            <div>{data.introduction}</div>
                    }
                </AccountInfos>
            </div>
            <div className='columns-price align-right'>
                <div className='title '>
                    成本价
                </div>
                <div className='value'>
                    <Yuan value={data.quoted_price} format={'0,0.00'} />
                </div>
            </div>
            <div className='columns-price align-right'>
                <div className='title '>
                    成交价
                </div>
                <div className='value'>
                    <Yuan value={data.quoted_price} format={'0,0.00'} />
                </div>
            </div>
            <div className='columns-status align-center'>
                <div className='title'>
                    状态
                </div>
                <div className='value'>
                    <Badge status="success" text={data.status_text} />
                </div>
            </div>
            <div className='columns-result align-center'>
                <div className='title'>
                    链接/截图
                </div>
                <div className='value'>
                    <a>查看效果</a>
                </div>
            </div>
            <div className='columns-countdown align-center'>
                <div className='title red'>
                    还剩2天21时
                </div>
                <div className='value'>
                    <a>投诉/赔偿</a>
                </div>
            </div>
            <div className='columns-actions align-center'>
                <Button type='primary' ghost>订单确认</Button>
                订单已确认
            </div>
        </div>
    }
}
