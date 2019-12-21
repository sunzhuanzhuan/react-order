import React from 'react'
import { Tag, Divider } from 'antd'
import TitleBox from '../../base/TitleBox'
import './DetailsShow.less'
import { PopoverIcon } from '../../base/MessageIcon'
function DetailsShow(props) {
  const { accountDetail = {}, accountId } = props
  const { base = {}, acceptCrowd = [], auditState = 1, remark } = accountDetail
  const { classification = [] } = base
  function getType(type) {
    if (type == 2) {
      return <div>未通过<PopoverIcon title='未通过原因' content={remark} placement="bottom" /></div>
    } else if (type == 3) {
      return '已通过'
    } else {
      return '待审核'
    }
  }
  const baseConfig = [
    { label: "账号名称", value: base.snsName },
    { label: "账号ID", value: base.snsId },
    { label: "主页链接", value: '' },
    { label: "二维码", value: <div>img</div> },
    { label: "账号简介", value: base.introduction },
    { label: "account ID", value: accountId }
  ]
  function getTypeList(type) {
    const list = acceptCrowd.filter(one => type == one.acceptCrowdType)
    return list[0] && list[0].acceptCrowdVal || []
  }
  return (
    <div className='task-account-details'>
      <TitleBox title='基础信息'>
        <div className='base-info'>
          <div className='avatar'>
            <img src='http://img.weiboyi.com/vol1/1/102/124/y/a/635qoq6r22qn11rn9p5o506o4op229o2/default.jpg' />
            <Tag color="volcano">{getType(2)}</Tag>
          </div>
          <div className='info'>
            <LineList list={baseConfig} />
          </div>
        </div>

      </TitleBox>
      <TitleBox title='数据信息'>
        <div className='data-right'>
          <LineList list={[{ label: '粉丝数：', value: base.followerCount },
          { label: '粉丝数截图：', value: <img src={base.followerCountScreenshotUrl} /> }]} />
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
            { label: '受众性别：', value: <AudienceLine list={getTypeList(1)} /> },
            { label: '受众地域Top3：', value: <AudienceArea list={getTypeList(2)} /> },
            { label: '受众年龄Top3：', value: <AudienceLine list={getTypeList(3)} /> },
            { label: '数据截图：', value: <img src={1} /> },
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
    {list.map(item => <div key={item.position} className='audience-line-item'>
      <span className='type'>{item.position}（{item.acceptCrowdVal}）</span>
    </div>)}
  </div>
}
const AudienceArea = ({ list = [] }) => {
  return list.map(one => <Tag color="blue" key={one.position}>{one.acceptCrowdVal}</Tag>)
}
