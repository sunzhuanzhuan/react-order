import React from 'react'
import { Tag, Divider, Icon } from 'antd'
import TitleBox from '../../base/TitleBox'
import './DetailsShow.less'
import { PopoverIcon } from '../../base/MessageIcon'
import { auditStateMap, getValueByFormat } from '../../constants/accountConfig'
import numeral from 'numeral'
function DetailsShow(props) {
  const { accountDetail = {}, accountId } = props
  const { base = {}, acceptCrowd = {}, auditState = 1, remark } = accountDetail
  const { classification = [], appraiserImgUrl } = base
  const { sex = {}, age = [], area = [] } = acceptCrowd
  const baseConfig = [
    { label: "账号名称", value: base.snsName },
    { label: "账号ID", value: base.snsId },
    { label: "主页链接", value: '' },
    {
      label: "二维码", value: <div>
        <PopoverIcon type="qrcode" marginLeft='0'
          content={<img src={base.qrCodeUrl} width='100' height='100' alt='二维码' />}
        />
      </div>
    },
    { label: "账号简介", value: base.introduction },
    { label: "account ID", value: accountId }
  ]

  return (
    <div className='task-account-details'>
      <TitleBox title='基础信息'>
        <div className='base-info'>
          <div className='avatar'>
            <img src='http://img.weiboyi.com/vol1/1/102/124/y/a/635qoq6r22qn11rn9p5o506o4op229o2/default.jpg' />
            <Tag color="volcano">
              {auditStateMap[auditState]}
              {auditState == 2 && <PopoverIcon title='未通过原因' content={remark} placement="bottom" />}
            </Tag>
          </div>
          <div className='info'>
            <LineList list={baseConfig} />
          </div>
        </div>

      </TitleBox>
      <TitleBox title='数据信息'>
        <div className='data-right'>
          <LineList list={[{ label: '粉丝数：', value: base.followerCount },
          { label: '粉丝数截图：', value: <img src={base.followerCountScreenshotUrl} width='200' height='200' onClick={() => window.open(base.followerCountScreenshotUrl)} className='follower-count-img' /> }]} />
        </div>
        <Divider orientation="left">内容分类</Divider>
        <div className='data-right'>
          {classification.map(one => <Tag color="gold" key={one.key}>{one.name}</Tag>)}
        </div>
        <Divider orientation="left">账号特权</Divider>
        <div className='data-right'>
          <LineList list={[{
            label: '是否认证：',
            value: (base.isVerified ? '-' : base.isVerified == 1 ? '是' : '否')
          }]} />
        </div>
      </TitleBox>
      <TitleBox title='博主个人信息'>
        <Divider orientation="left">博主信息</Divider>
        <div className='data-right'>
          <LineList list={[{
            label: '性别：',
            value: (
              base.gender ? '-' :
                base.gender == 1 ? '男'
                  : base.gender == 2 ? '女'
                    : '未知'
            )
          }, { label: '生日：', value: base.birthDate }]} />
        </div>
        <Divider orientation="left">受众信息</Divider>
        <div className='data-right'>
          <LineList list={[
            {
              label: '受众性别：', value: <div>
                <Tag color="geekblue"> 男 [{getValueByFormat(sex.manRate)}%] </Tag>
                <Tag color="geekblue"> 女 [{getValueByFormat(sex.womanRate)}%] </Tag>
              </div>
            },
            { label: '受众地域Top3：', value: <AudienceArea list={area} /> },
            { label: '受众年龄Top3：', value: <AudienceLine list={age} /> },
            { label: '数据截图：', value: <img src={appraiserImgUrl} width='200' height='200' onClick={() => window.open(base.appraiserImgUrl)} className='follower-count-img' /> },
            { label: 'KPI/KPI上线', value: base.birthDate }
          ]} />
        </div>
      </TitleBox>
    </div>
  )
}

export default DetailsShow

const LineList = ({ list = [] }) => {
  return list.map(item => <div className='line-item' key={item.label}>
    <span className='label'>{item.label}</span>
    <span className='value'>{item.value ? item.value : '-'} </span>
  </div>)
}

const AudienceLine = ({ list = [] }) => {
  return <div className='audience-line'>
    {list.map(item => <Tag key={item.description} color="purple"> <span className='type'>  {item.description} [{getValueByFormat(item.value)}%]</span>
    </Tag>)}
  </div>
}
const AudienceArea = ({ list = [] }) => {
  return list.map(one => <Tag color="blue" key={one.description}>{one.description}</Tag>)
}
