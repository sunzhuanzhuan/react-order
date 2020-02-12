/**
 * Created by lzb on 2020-01-07.
 */
import React, { Component } from "react"
import {
  PageHeader,
  Descriptions,
  Button,
  Divider,
  Table,
  Modal,
  Badge, message, Rate
} from 'antd'
import Section from "@/base/Section";
import {
  KolInfo,
  QAStatus,
  TaskStatus
} from "@/taskPool/base/ColumnsDataGroup";
import Yuan from "@/base/Yuan";
import {
  dateDisplayByLen,
  getCountDownTimeText,
  openNewWindowPreviewFor12306
} from "@/taskPool/constants/utils";
import { convertRawToHTML } from 'braft-convert'
import moment from 'moment';


export default class DetailsFor12306 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailLoading: false,
    }
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.TPTaskDetailClear()
  }

  preview = () => {
    const { details } = this.props
    const features = details.adOrderTripContent

    return openNewWindowPreviewFor12306({
      content: features.content,
      video: features.vedioUrl,
      image: features.imageUrl
    })
  }

  componentDidMount() {
  }

  render() {
    const { details } = this.props


    const features = details.adOrderTripContent
    const isDiscount = features.discount > 0

    return <>
      <PageHeader
        onBack={() => this.props.history.go(-1)}
        title="任务详情"
      />
      <Section>
        <Section.Header title="基本信息" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务名">{details.orderName}</Descriptions.Item>
            {/*<Descriptions.Item label="任务ID">{details.adOrderNumber}</Descriptions.Item>*/}
            <Descriptions.Item label="投放模式">
              <div className='text-red'>
                {features.putTypeDesc}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="行业分类">
              {
                [details.taskIndustryInfo.parentName, details.taskIndustryInfo.industryName].filter(Boolean).join('/')
              }
            </Descriptions.Item>
            <Descriptions.Item label="经营内容">
              {details.taskIndustryInfo.scopeName}
            </Descriptions.Item>
            <Descriptions.Item label="投放开始日期">
              {dateDisplayByLen(details.orderStartDate, 'd')}
            </Descriptions.Item>
            <Descriptions.Item label="投放结束日期">
              {dateDisplayByLen(details.orderEndDate, 'd')}
            </Descriptions.Item>
            <Descriptions.Item label="投放持续天数">
              {getCountDownTimeText(moment(details.orderEndDate).add(1,'d'), 0, 3, details.orderStartDate)}
            </Descriptions.Item>
            <Descriptions.Item label="任务预算">
              {details.totalAmount}元
              {isDiscount && <span className='text-red' style={{marginLeft: 4, textDecoration: 'line-through'}}>{features.originalPrice}元</span>}
            </Descriptions.Item>
            {isDiscount && <Descriptions.Item label="优惠金额">
              <div className='text-red'>{features.discount}元</div>
            </Descriptions.Item>}
            <Descriptions.Item label="所属公司">{details.companyName}</Descriptions.Item>
            <Descriptions.Item label="出发城市">
              {features.leavePlaceDesc || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="到达城市">
              {features.arrivePlaceDesc || '-'}
            </Descriptions.Item>
            {features.putType === 1 && <Descriptions.Item label="车次类型">
              {features.deliveryTrainTypeDesc || '-'}
            </Descriptions.Item>}
            {features.putType === 1 && <Descriptions.Item label="坐席类型">
              {features.deliverySeatDesc || '-'}
            </Descriptions.Item>}
            {features.putType === 1 && <Descriptions.Item label="人群性别">
              {features.deliverySexDesc || '-'}
            </Descriptions.Item>}
            {features.putType === 1 && <Descriptions.Item label="年龄区间">
              {features.deliveryAgesDesc || '-'}
            </Descriptions.Item>}
            <Descriptions.Item label="内容类型">
              {features.mediaTypeDesc}
            </Descriptions.Item>
            <Descriptions.Item label="阅读单价">
              {features.unitPrice} 元/{features.putType === 1 ? '条' : '天'}
            </Descriptions.Item>
            {features.putType === 1 && <Descriptions.Item label="预计阅读数">
                <div className='text-red'>{features.actionNum}条</div>
              </Descriptions.Item>}
            <Descriptions.Item label="内容预览">
              <a onClick={this.preview}>查看</a>
            </Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
      <Section>
        <Section.Header title="执行进度" level={5} />
        <Section.Content>
          <Descriptions title="">
            <Descriptions.Item label="任务状态">
              <TaskStatus status={details.orderState} />
            </Descriptions.Item>
            <Descriptions.Item label="查看结案文件">
              <a href={features.finalReportUrl} download>下载</a>
            </Descriptions.Item>
          </Descriptions>
        </Section.Content>
      </Section>
    </>
  }
}

