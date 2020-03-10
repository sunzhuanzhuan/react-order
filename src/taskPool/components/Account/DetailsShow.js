import React from 'react'
import { Tag, Divider, Icon, Table } from 'antd'
import TitleBox from '../../base/TitleBox'
import './DetailsShow.less'
import { PopoverIcon } from '../../base/MessageIcon'
import { auditStateMap, getValueByFormat } from '../../constants/accountConfig'
import AccountName from './AccountName'
import { KpiTable } from './AccountList'
import moment from 'moment'

function DetailsShow(props) {
  const { accountDetail = {}, accountId } = props
  const { base = {}, acceptCrowd = {}, auditState = 1, remark, kpiTarget = {}, appraiserImgUrl = [], mediaIndex1AvgReadNum28d, offerAndOtherData = [] } = accountDetail
  const { classification = [], avatarUrl, platformId, snsName, isVerified } = base
  const { sex = {}, age = [], area = [] } = acceptCrowd
  const baseConfig = [
    {
      label: "账号名称", value: <AccountName platformId={platformId} snsName={snsName} isVerified={isVerified} />
    },
    { label: "账号ID", value: base.snsId },
    { label: "主页链接", value: base.accountHomepageUrl },
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
            <img src={avatarUrl ? avatarUrl : 'http://img.weiboyi.com/vol1/1/102/124/y/a/635qoq6r22qn11rn9p5o506o4op229o2/default.jpg'} />
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
            value: (base.isVerified == 1 ? '是' : base.isVerified == 2 ? '否' : '-')
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
            {
              label: '数据截图：', value: <div>
                {appraiserImgUrl.length > 0 ? appraiserImgUrl.map(one => <img src={one.fileUrl}
                  key={one.fileUrl}
                  width='200'
                  height='200'
                  onClick={() => window.open(one.fileUrl)} className='follower-count-img'
                />)
                  : '-'}
              </div>
            },

          ]} />
        </div>
      </TitleBox>
      <TitleBox title='任务大厅账号报价及其他数据'>
        <TableAccount data={offerAndOtherData} />
        <div className='account-other'>
          <div>
            28天第一条平均阅读数：{kpiTarget.mediaIndex1stAvgReadNum28d || '-'}
          </div>
          <div >
            更新时间：{kpiTarget.kpiValidDataUnixTimestamp ? moment(kpiTarget.kpiValidDataUnixTimestamp) : '-'}
          </div>
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
  return list.length > 0 ? <div className='audience-line'>
    {list.map(item => <Tag key={item.description} color="purple"> <span className='type'>  {item.description} [{getValueByFormat(item.value)}%]</span>
    </Tag>)}
  </div> : '-'
}
const AudienceArea = ({ list = [] }) => {
  return list.length > 0 ? list.map(one => <Tag color="blue" key={one.description}>{one.description}</Tag>) : '-'
}
const TableAccount = ({ data }) => {
  const columnsKpi = [
    {
      title: '位置',
      dataIndex: 'offerPosition',
      key: 'offerPosition',
      align: 'center',
    }, {
      title: '阅读单价（元/条）',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'center',
      render: (text, record) => (
        <span>
          {text}
        </span>
      )
    }, {
      title: '建议阅读单价（元/条）',
      dataIndex: 'gradeUnitPrice',
      key: 'gradeUnitPrice',
      align: 'center',
      render: (text, record) => (
        <span>
          {text}
        </span>
      )
    }, {
      title: <div>KPI/KPI上限</div>,
      dataIndex: 'kpiReadNum',
      key: 'kpiReadNum',
      align: 'center',
      render: (text, record) => (
        <span>
          {text}/{record.kpiMaxReadNum}
        </span>
      )
    }]
  return <Table
    pagination={false}
    rowKey="id"
    columns={columnsKpi}
    dataSource={data}
    bordered
  />
}
