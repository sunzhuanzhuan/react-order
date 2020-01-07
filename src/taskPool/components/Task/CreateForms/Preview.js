/**
 * 创建任务-预览
 */
import React from 'react'
import {
  Button,
  Descriptions, Typography, Modal, Icon, Form
} from 'antd'
import { withRouter } from 'react-router-dom'
import { WBYPlatformIcon } from "wbyui";
import {
  getCountDownTimeText,
  getIndustryName,
  openNewWindowPreviewForWeibo,
  openNewWindowPreviewForWeixin,
  openNewWindowPreviewFor12306
} from "@/taskPool/constants/utils";
import numeral from '@/util/numeralExpand'
import { OssUpload } from 'wbyui'
import { AGES_OPTIONS, SEAT_OPTIONS, wxPositionToFields } from '@/taskPool/constants/config';
import moment from 'moment';

const { Text } = Typography;


const target = {
  "11": "多图文第一条", "12": "不限", "21": "粉丝覆盖", "22": "粉丝传播"
}
const contentStyle = {
  "w1": "多图文第一条", "w2": "多图文第二条", "w3": "多图文第三-N条"
}

/**
 * 微信平台
 */
@withRouter
class PreviewForWeixin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitLoading: false };
    this.contentStyleWX = {}
    this.getContentStyleWX(props.taskPositionList)
  }

  getContentStyleWX = taskPositionList => {
    if (Array.isArray(taskPositionList) && taskPositionList.length)
      taskPositionList.forEach(item => {
        const { locationKey, locationValue } = item;
        this.contentStyleWX[locationKey] = locationValue;
      })
  }

  success = () => {
    Modal.success({
      className: 'center-success-modal',
      title: '提交成功',
      content: '您可在任务管理页随时查看进度',
      onOk: () => {
        this.props.history.push('/order/task/manage')
      }
    })
  }

  handleValues = (data) => {
    const { base, budget, content } = data
    let body = {}
    body.orderName = base.orderName
    body.companyId = base.company.key
    body.companyName = base.company.label
    body.orderStartDate = base.orderDate[0]
    body.orderEndDate = base.orderDate[1]
    body.platformId = base.platformId
    body.industry = [ ...base.industry ].pop()
    body.businessScopeId = base.businessScopeId

    body.totalAmount = budget.totalAmount

    body.adOrderWeixinContent = {
      "author": content.author,
      "content": content.richContent.toRAW(),
      "contentText": content.richContent.toText(),
      "coverImageUrl": content.coverImage[0].url,
      "coverImageName": content.coverImage[0].name,
      "remark": content.remark || content.richContent.toText().replace(/\s/g, '').slice(0, 54),
      "articleUrl": content.articleUrl,
      "title": content.title,

      "retainTime": base.retainTime,
      "locationLimited": budget.locationLimited,
      "locationLimitedInfo": budget.locationLimitedInfo && budget.locationLimitedInfo.join(','),
      "taskPattern": base.taskPattern,

      "mediaAvgReadNumLimit": budget._mediaAvgReadNumLimit ? budget.mediaAvgReadNumLimit : 0,
      "followerGenderRatioLimit": budget._followerGenderRatioLimit ? budget.followerGenderRatioLimit : 0,
      "minNumOfReadLimit": budget._minNumOfReadLimit ? budget.minNumOfReadLimit : 0,
      "followerCountLimit": budget._followerCountLimit ? budget.followerCountLimit : 0,

      "mediaCountLimit": budget.mediaCountLimit ? 1 : 2,
      "onlyVerified": budget.onlyVerified ? 1 : 2,

      "wxOneNumber": budget.wxOneNumber,
      "wxTwoNumber": budget.wxTwoNumber,
      "wxOtherNumber": budget.wxOtherNumber,
      "showPictureUrl": base.showPictureUrl[0].url
    }


    return body
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    const { data, actions } = this.props
    const { base, budget, content } = data

    this.setState({
      submitLoading: true
    });

    // 处理提交数据
    const values = this.handleValues(data)
    if (this.props.isUpdate) {
      actions.TPUpdateTask({...values, id: this.props.taskId}).then(this.success).finally(() => {
        this.setState({
          submitLoading: false
        });
      })
      return
    }
    actions.TPAddTask(values).then(this.success).finally(() => {
      this.setState({
        submitLoading: false
      });
    })
  }

  // 预览文章内容
  preview = () => {
    const { data } = this.props
    const { base, budget, content } = data
    openNewWindowPreviewForWeixin({
      title: content.title,
      content: content.richContent.toHTML(),
      remark: content.remark,
      author: content.author,
      articleUrl: content.articleUrl
    })
  }

  // 预览发文位置信息
  getLocationLimited = (budget) => {
    const { locationLimited, locationLimitedInfo } = budget;
    if (locationLimited === 2)
      return <div>无限制</div>;
    const posInfo = locationLimitedInfo.map(item => this.contentStyleWX[item]);
    const posDetail = posInfo && posInfo.length ? `（${posInfo.join('、')}）` : '';
    return <div>有限制{posDetail}</div>;
  }

  // 发文位置对应的单价或阅读数 name => value 形式
  getLocationMapping = (budget) => {
    const { locationLimited, locationLimitedInfo } = budget;
    let list = []
    if (locationLimited === 1) {
      list = locationLimitedInfo
    } else {
      list = Object.keys(wxPositionToFields)
    }
    return list.map(key => ({
      name: this.contentStyleWX[key],
      value: budget[wxPositionToFields[key]]
    }))
  }

  // 预览阅读单价
  getUnitPrice = (budget) => {
    const list = this.getLocationMapping(budget)
    return list.map(o => {
      return <div key={o.name}>{o.name} {numeral(o.value).format("0,0")}元/阅读</div>
    })
  }

  // 预览阅读数
  getReadNumber = (budget) => {
    const list = this.getLocationMapping(budget)
    return list.map(o => {
      return <div key={o.name}>{o.name} {numeral(o.value).format("0,0")}阅读</div>
    })
  }

  // 预览博主限制
  getLimit = (budget) => {
    let list = [
      {
        text: "粉丝量大于",
        val: budget._followerCountLimit ? budget.followerCountLimit : 0
      },
      {
        text: "近28天内有发文",
        val: budget.mediaCountLimit ? "" : 0
      },
      {
        text: "28天内第一条平均阅读高于",
        val: budget._mediaAvgReadNumLimit ? budget.mediaAvgReadNumLimit : 0
      },
      {
        text: "性别比例",
        val: budget._followerGenderRatioLimit ? (budget.followerGenderRatioLimit === 1 ? "男性多" : "女性多") : 0
      },
      {
        text: "博主最低领取阅读数不低于",
        val: budget._minNumOfReadLimit ? budget.minNumOfReadLimit : 0
      },
      {
        text: "只允许认证号接单",
        val: budget.onlyVerified ? "" : 0
      },
    ]

    const result = list.filter(({ val }) => val !== 0).map((item, n) => {
      return <div key={n}>{item.text + item.val}</div>
    })
    if (result.length === 0) {
      return "无限制"
    }
    return result
  }


  render() {

    const { data } = this.props
    const { submitLoading } = this.state
    const { base, budget, content } = data
    const [ startDate, endDate ] = base.orderDate
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={9} widthSize={26} />
      <span className='title'>{base.orderName}</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="任务模式">
            <div className='text-red'>
              {base.taskPattern === 1 && "抢单模式"}
              {base.taskPattern === 2 && "竞标模式"}
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="所属公司">{base.company.label}</Descriptions.Item>
          <Descriptions.Item label="行业分类">{
            base.industry.map(id => getIndustryName(this.props.industryList, id).industryName).join(
              '/')
          }</Descriptions.Item>
          <Descriptions.Item
            label="任务开始时间">{startDate.format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item
            label="任务结束时间">{endDate.format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="任务持续时间">
            {getCountDownTimeText(endDate, 0, 5, startDate)}
          </Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">{base.retainTime}小时</Descriptions.Item>
          <Descriptions.Item label="任务预算">{numeral(budget.totalAmount)
            .format("0,0.00")} 元</Descriptions.Item>
          <Descriptions.Item label="冻结服务费">{numeral(budget.serviceFee)
            .format("0,0.00")} 元</Descriptions.Item>
          <Descriptions.Item label="实际扣款">{numeral(budget.actualPayment)
            .format("0,0.00")} 元</Descriptions.Item>
          <Descriptions.Item label="内容发布位置">{this.getLocationLimited(budget)}</Descriptions.Item>
          {
            base.taskPattern === 1 && <Descriptions.Item label="阅读单价">
              {this.getUnitPrice(budget)}
            </Descriptions.Item>
          }
          {
            base.taskPattern === 2 && <Descriptions.Item label="阅读数">
              {this.getReadNumber(budget)}
            </Descriptions.Item>
          }
          {
            base.taskPattern === 1 && <Descriptions.Item label="预计阅读数">
              <div className='text-red'>{budget.readNums.join(" ~ ")}</div>
            </Descriptions.Item>
          }
          {
            base.taskPattern === 2 && <Descriptions.Item label="预计平均阅读单价">
              <div className='text-red'>{budget.unitPrice}元/阅读</div>
            </Descriptions.Item>
          }
          <Descriptions.Item label="博主限制">
            {this.getLimit(budget)}
          </Descriptions.Item>
          <Descriptions.Item label="文章封面">
            <div className='image-wrap'>
              <img src={content.coverImage[0].url} alt="" />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="推广文章">
            <a onClick={this.preview}>预览</a>
          </Descriptions.Item>
        </Descriptions>
        <Text type="danger">确认无误即可提交。任务将会在设定的开始时间到达时上线。</Text>
        <footer>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary" loading={submitLoading} onClick={this.handleSubmit}>提交</Button>
        </footer>
      </div>
    )
  }
}

/**
 * 12306平台
 */
@withRouter
class PreviewFor12306 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitLoading: false };
  }

  preview = () => {
    const { data } = this.props
    const { base, budget, content } = data
    const { video = [ {} ], image = [ {} ] } = content
    openNewWindowPreviewFor12306({
      content: content.content,
      video: video[0].url,
      images: image[0].url,
    })
  }

  success = () => {
    Modal.success({
      className: 'center-success-modal',
      title: '提交成功',
      content: '您可在任务管理页随时查看进度',
      onOk: () => {
        this.props.history.push('/order/task/manage')
      }
    })
  }

  handleValues = (data) => {
    const { base, budget, content } = data
    let body = {}
    body.orderName = base.orderName
    body.companyId = base.company.key
    body.companyName = base.company.label
    body.orderStartDate = base.orderStartDate
    body.orderEndDate = base.orderStartDate
    body.platformId = base.platformId
    body.industry = [ ...base.industry ].pop()
    body.businessScopeId = base.businessScopeId

    body.totalAmount = budget.result.totalAmount

    body.adOrderTripContent = {
      "content": content.content,
      "imageUrl": content.image && content.image[0].url,
      "imageName": content.image && content.image[0].url,
      "videoUrl": content.video && content.video[0].name,
      "videoName": content.video && content.video[0].name,

      "putType": budget.putType,
      "mediaType": budget.mediaType,

      "leavePlace": budget.leavePlace && budget.leavePlace.toString(),
      "arrivePlace": budget.arrivePlace && budget.arrivePlace.toString(),
      "deliverySex": budget.deliverySex && budget.deliverySex.toString(),
      "deliverySeat": budget.deliverySeat && budget.deliverySeat.toString(),
      "deliveryAges": budget.deliveryAges && budget.deliveryAges.toString(),
      "deliveryTrainType": budget.deliveryTrainType && budget.deliveryTrainType.toString(),

      "actionNum": budget.actionNum,
      "actionDay": budget.actionDay
    }


    return body
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    const { data, actions } = this.props
    const { base, budget, content } = data

    this.setState({
      submitLoading: true
    });

    // 处理提交数据
    const values = this.handleValues(data)

    if (this.props.isUpdate) {
      actions.TPUpdateTask({...values, id: this.props.taskId}).then(this.success).finally(() => {
        this.setState({
          submitLoading: false
        });
      })
      return
    }
    actions.TPAddTask(values).then(this.success).finally(() => {
      this.setState({
        submitLoading: false
      });
    })
  }

  /**
   * 获取地区id对应的地区名称
   * @param areaIds
   */
  getAreaName = (areaIds = []) => {
    if (areaIds.length === 0) {
      return '-'
    }
    const { base, budget, content } = this.props.data
    const sources = budget.treeData || []
    return areaIds.map(id => sources.find(item => item.id === id))
      .filter(Boolean)
      .map(item => item.title)
      .join('，')
  }

  /**
   * 根据value 展示 label
   * @param values
   * @param sources
   */
  value2label = (values = [], sources) => {
    if (values.length === 0) {
      return '-'
    }
    return values.map(value => sources.find(item => item.value === value))
      .filter(Boolean)
      .map(item => item.label)
      .join('，')
  }

  render() {

    const { data } = this.props
    const { submitLoading } = this.state
    const { base, budget, content } = data
    const header = <div className='form-preview-header'>
      {base.orderName}
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">{base.company.label}</Descriptions.Item>
          <Descriptions.Item label="行业分类">{
            base.industry.map(id => getIndustryName(this.props.industryList, id).industryName)
              .join('/')
          }</Descriptions.Item>
          <Descriptions.Item label="投放开始日期">
            {base.orderStartDate.format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="投放结束日期">
            {budget.putType === 2 && moment(base.orderStartDate).add(budget.actionDay, 'd').format(
              'YYYY-MM-DD')}
            {budget.putType === 1 && (base.orderEndDate ? base.orderEndDate.format('YYYY-MM-DD') : base.orderStartDate.format(
              'YYYY-MM-DD'))}
          </Descriptions.Item>
          <Descriptions.Item label="任务持续时间">
            {budget.putType === 2 && <div>{budget.actionDay}天</div>}
            {budget.putType === 1 && (base.orderEndDate ? getCountDownTimeText(base.orderEndDate,
              0,
              5,
              base.orderStartDate) : '1天')
            }
          </Descriptions.Item>
          <Descriptions.Item label="任务预算">
            {numeral(budget.result.actualPayment).format("0,0.00")} 元
          </Descriptions.Item>
          <Descriptions.Item label="投放模式">
            {budget.putType === 1 && "按量投放"}
            {budget.putType === 2 && "按天投放"}
          </Descriptions.Item>
          <Descriptions.Item label="出发城市">
            {this.getAreaName(budget.leavePlace)}
          </Descriptions.Item>
          <Descriptions.Item label="到达城市">
            {this.getAreaName(budget.arrivePlace)}
          </Descriptions.Item>
          {budget.putType === 1 && <Descriptions.Item label="坐席类型">
            {this.value2label(budget.deliverySeat, SEAT_OPTIONS)}
          </Descriptions.Item>}
          {budget.putType === 1 && <Descriptions.Item label="人群性别">
            {budget.deliverySex === 0 && "全部"}
            {budget.deliverySex === 10 && "男"}
            {budget.deliverySex === 11 && "女"}
          </Descriptions.Item>}
          {budget.putType === 1 && <Descriptions.Item label="年龄区间">
            {this.value2label(budget.deliveryAges, AGES_OPTIONS)}
          </Descriptions.Item>}
          <Descriptions.Item label="内容类型">
            {budget.mediaType === 3 && "图文+链接+视频"}
            {budget.mediaType === 4 && "图文+链接"}
          </Descriptions.Item>
          <Descriptions.Item label="阅读单价">
            {budget.result.unitPrice} 元/条
          </Descriptions.Item>
          {
            budget.putType === 1 && <Descriptions.Item label="预计阅读数">
              <div className='text-red'>{budget.actionNum}条</div>
            </Descriptions.Item>
          }
          <Descriptions.Item label="内容预览">
            <a onClick={this.preview}>查看</a>
          </Descriptions.Item>
        </Descriptions>
        <Text type="danger">确认无误即可提交。任务将会在设定的开始时间到达时上线。</Text>
        <footer>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary" loading={submitLoading} onClick={this.handleSubmit}>提交</Button>
        </footer>
      </div>
    )
  }
}

/**
 * 微博平台
 */
@withRouter
class PreviewForWeibo extends React.Component {
  state = { submitLoading: false }

  componentDidMount() {
  }

  preview = () => {
    const { data } = this.props
    const { base, budget, content } = data
    let { type, images, video } = content.attachment
    openNewWindowPreviewForWeibo({
      content: content.content,
      video: video && video.url,
      images: images.map(item => item.url),
      mediaType: type
    })
  }

  success = () => {
    Modal.success({
      className: 'center-success-modal',
      title: '提交成功',
      content: '您可在任务管理页随时查看进度',
      onOk: () => {
        this.props.history.push('/order/task/manage')
      }
    })
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    const { data, actions } = this.props
    const { base, budget, content } = data

    this.setState({
      submitLoading: true
    });

    // 处理提交数据
    let body = Object.assign({}, base, budget)
    const { type, images, video } = content.attachment || {}

    body.companyId = body.company.key
    body.companyName = body.company.label
    delete body.company

    body.industry = [ ...body.industry ].pop()
    body.taskContentStyle = content.taskContentStyle
    body.actionNum = body.taskTarget === 21 ? 0 : body.actionNum

    body.adOrderWeiboContent = {
      "content": content.content,
      "forwardWord": content.forwardWord,
      "mediaType": type,
      "url": content.url
    }

    if (type === 1) {
      body.adOrderWeiboContent.attachmentList = images.map(item => ({
        attachmentName: item.name,
        attachmentUrl: item.url
      }))
    } else if (type === 2) {
      body.adOrderWeiboContent.attachmentList = [ {
        attachmentName: video.name,
        attachmentUrl: video.url
      } ]
    }

    actions.TPAddTask(body).then(this.success).finally(() => {
      this.setState({
        submitLoading: false
      });
    })
  }

  render() {
    // TODO: 行业接口调用, 根据code显示汉字
    const { data } = this.props
    const { submitLoading } = this.state
    const { base, budget, content } = data
    const header = <div className='form-preview-header'>
      <WBYPlatformIcon weibo_type={1} widthSize={26} />
      <span className='title'>{base.orderName}</span>
    </div>
    return (
      <div className="form-preview-container">
        <Descriptions title={header} column={1}>
          <Descriptions.Item label="所属公司">{base.company.label}</Descriptions.Item>
          <Descriptions.Item label="行业分类">{getIndustryName(data.industryList,
            [ ...base.industry ].pop()).itemValue}</Descriptions.Item>
          <Descriptions.Item label="任务目标">{target[budget.taskTarget]}</Descriptions.Item>
          <Descriptions.Item label="预算">{numeral(budget.totalAmount)
            .format("0,0.00")} 元</Descriptions.Item>
          <Descriptions.Item
            label="任务结束时间">{base.orderEndDate.format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="发布后保留时长">{base.retainTime}小时</Descriptions.Item>
          <Descriptions.Item
            label="内容形式">{contentStyle[content.taskContentStyle]}</Descriptions.Item>
          <Descriptions.Item label="推广文章">
            <a onClick={this.preview}>预览</a>
          </Descriptions.Item>
        </Descriptions>
        <Text type="danger">确认无误即可提交。博主领取并执行任务后，会自动扣除预算。</Text>
        <footer>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary" loading={submitLoading} onClick={this.handleSubmit}>提交</Button>
        </footer>
      </div>
    )
  }
}

export default {
  weixin: PreviewForWeixin,
  12306: PreviewFor12306,
  weibo: PreviewForWeibo
}
