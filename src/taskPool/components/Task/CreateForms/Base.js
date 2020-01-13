/**
 * 创建任务-基本信息表单
 */
import React from 'react'
import { Form, Radio, Button, Cascader, Tooltip, DatePicker, Select } from 'antd'
import RemoteSearchSelect from "@/taskPool/base/RemoteSearchSelect";
import { InputCount } from "@/base/Input";
import { OssUpload, WBYPlatformIcon } from "wbyui";
import numeral from '@/util/numeralExpand';
import moment, { duration } from 'moment';
import { getCountDownTimeText } from '@/taskPool/constants/utils';
import QuestionTip from '@/base/QuestionTip';
import { MEDIA_TASK_PATTERN_BIDDING, MEDIA_TASK_PATTERN_RUSH } from '@/taskPool/constants/config';

const { RangePicker } = DatePicker
const FormItem = Form.Item

@Form.create()
class BaseForMedia extends React.Component {
  constructor(props) {
    super(props)
    this.defaultDisableDate = moment().add(31, 'm').startOf('m')
    let [ startData, endData ] = props.data.base.orderDate || []
    this.state = {
      endOpen: false,
      dateDuration: (startData && endData) ?
        "共计" + getCountDownTimeText(endData, 0, 5, startData) :
        "请选择时间",
      disabledDateFlag: this.defaultDisableDate
    }
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        this.props.next("base", newVal)
      }
    });
  }

  disabledDate = (current) => {
    return current && current < this.state.disabledDateFlag
  }

  render() {
    const { form, formLayout, data, actions, taskRetainTimeList } = this.props
    const { base } = data
    const { getFieldDecorator, getFieldValue, resetFields } = form

    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务所属公司">
          <div className='flex-form-input-container'>
            {getFieldDecorator('company', {
              initialValue: base.company,
              rules: [ {
                required: true,
                message: '请选择任务所属公司'
              } ]
            })(
              <RemoteSearchSelect
                style={{ flex: 'auto', width: "auto" }}
                action={actions.TPFuzzyQueryCompany}
                placeholder="请选择任务所属公司"
                disabled={this.props.lockCompanySelect}
                onChange={this.props.getCompanyBalance}
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(this.props.balance).format('0,0.00')} 元
            </div>
          </div>
        </FormItem>
        <FormItem label="任务发布平台">
          {getFieldDecorator('platformId', {
            initialValue: base.platformId,
            rules: [ {
              required: true,
              message: '请选择平台'
            } ]
          })(
            <Radio.Group>
              <Radio value={9}>
                <WBYPlatformIcon weibo_type={9} widthSize={22} />
                <span style={{
                  verticalAlign: 'text-bottom',
                  marginLeft: 8,
                  userSelect: 'none'
                }}>微信公众号</span>
              </Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="任务名称">
          {getFieldDecorator('orderName', {
            initialValue: base.orderName,
            rules: [
              { required: true, message: '请输入任务名称', whitespace: true },
              { max: 20, message: '任务名称不大于20字' }
            ]
          })(
            <InputCount max={20} placeholder="请输入任务名称" />
          )}
        </FormItem>
        {this.props.industryList.length > 0 && <FormItem label="行业分类">
          {getFieldDecorator('industry', {
            initialValue: base.industry,
            rules: [ {
              required: true,
              message: '请选择行业',
              type: 'array'
            } ]
          })(
            <Cascader
              fieldNames={{
                label: 'industryName',
                value: 'id',
                children: 'taskIndustryList'
              }}
              allowClear={false}
              onChange={val => {
                this.props.getBusinessScope(val.slice(-1))
                resetFields(["businessScopeId"])
              }}
              options={this.props.industryList}
              placeholder='请选择行业'
            />
          )}
        </FormItem>}
        {this.props.businessScopeList.length > 0 ? <FormItem label="经营内容">
          {getFieldDecorator('businessScopeId', {
            initialValue: base.businessScopeId,
            rules: [ {
              required: true,
              message: '请选择经营内容',
            } ]
          })(
            <Select
              placeholder='请选择经营内容'
              onChange={val => {
                this.props.getQualificationsGroup(getFieldValue("industry").slice(-1), val)
              }}
            >
              {this.props.businessScopeList.map(item => <Select.Option
                key={item.id}>{item.scopeName}</Select.Option>)}
            </Select>
          )}
        </FormItem> : null}
        <FormItem label="任务时间">
          <div className='flex-form-input-container'>
            {getFieldDecorator('orderDate', {
              initialValue: base.orderDate,
              validateFirst: true,
              rules: [
                { required: true, message: '请选择任务时间' },
                {
                  validator: (rule, value, callback) => {
                    const [ start, end ] = value

                    const min = moment(start).add(7, 'd')
                    if (end < min) {
                      return callback(`任务结束时间与任务开始时间的间隔至少7天`)
                    }
                    callback()
                  }
                }
              ]
            })(
              <RangePicker
                allowClear={false}
                placeholder={[ "任务开始时间", "任务结束时间" ]}
                format="YYYY-MM-DD HH:mm"
                style={{ flex: 'auto' }}
                disabledDate={this.disabledDate}
                defaultPickerValue={[
                  this.defaultDisableDate,
                  moment(this.defaultDisableDate).add(7, 'd')
                ]}
                onCalendarChange={(range) => {
                  const [ startData, endData ] = range
                  if (range.length === 1) {
                    this.setState({
                      disabledDateFlag: moment(range[0]).add(7, 'd')
                    })
                  }
                  if (range.length === 2) {
                    this.setState({
                      disabledDateFlag: moment(this.defaultDisableDate)
                    })
                    let dateDuration = "请选择时间"
                    if (startData && endData) {
                      dateDuration = "共计" + getCountDownTimeText(endData, 0, 5, startData)
                    }
                    this.setState({ dateDuration })
                  }
                }}
                showTime={{
                  hideDisabledOptions: true,
                  format: "hh:mm"
                }}
                onOpenChange={() => {
                  this.setState({
                    disabledDateFlag: moment(this.defaultDisableDate)
                  })
                }}
              />
            )}
            <div className='flex-form-input-suffix'>
              {this.state.dateDuration}
            </div>
          </div>
        </FormItem>
        {taskRetainTimeList.length > 0 && <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('retainTime', {
              initialValue: base.retainTime || taskRetainTimeList[0].retainTime,
              rules: [ {
                required: true,
                message: '请选择任务保留时长'
              } ]
            })(
              <Radio.Group>
                {
                  taskRetainTimeList.map(item =>
                    <Radio key={item.retainTime}
                           value={item.retainTime}>{item.retainTime}小时</Radio>)
                }
              </Radio.Group>
            )}
            <div className='flex-form-input-suffix'>
              规定时间内，文章质检合格，则自动扣款。
            </div>
          </div>
        </FormItem>}
        <FormItem label={<span>选择任务模式<QuestionTip content={<div>
          <b>抢单模式</b> 固定定价和阅读数，由博主抢单;
          <br />
          <b>竞标模式</b> 固定阅读数，由博主自由报价后再对所报价格进行选择
        </div>} /></span>}>
          {getFieldDecorator('taskPattern', {
            initialValue: base.taskPattern || MEDIA_TASK_PATTERN_RUSH,
            rules: [ {
              required: true,
              message: '选择任务模式'
            } ]
          })(
            <Radio.Group>
              <Radio value={MEDIA_TASK_PATTERN_RUSH}>抢单模式</Radio>
              <Radio value={MEDIA_TASK_PATTERN_BIDDING}>竞标模式</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="上传任务封面">
          {getFieldDecorator('showPictureUrl', {
            initialValue: base.showPictureUrl,
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            rules: [
              { message: '请上传任务封面', required: true, type: "array" }
            ]
          })(
            <OssUpload
              authToken={this.props.authToken}
              listType='picture-card'
              rule={{
                bizzCode: 'ORDER_IMG_UPLOAD',
                max: 2,
                suffix: 'png,jpg,jpeg,gif,webp'
              }}
              len={1}
              tipContent={'请上传PNG,JPG,JPEG,GIF,WEBP格式的图片,最大不能超过2MB'}
            />
          )}
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}

@Form.create()
class BaseForPartner extends React.Component {
  constructor(props) {
    super(props)
    this.defaultDisableDate = moment().endOf('d')
    let [ startData, endData ] = props.data.base.orderDate || []
    this.state = {
      endOpen: false,
      dateDuration: (startData && endData) ?
        "共计" + getCountDownTimeText(endData, 0, 5, startData) :
        "请选择时间",
      disabledEndDate: moment(this.defaultDisableDate).add(1, 'd')
    }
  }

  handleSubmit = (e) => {
    e && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let newVal = Object.assign({}, values)
        this.props.next("base", newVal)
      }
    });
  }

  disabledStartDate = (current) => {
    return current && current < this.defaultDisableDate
  }
  disabledEndDate = (current) => {
    return current && current < this.state.disabledEndDate
  }

  render() {

    const { form, formLayout, data, actions } = this.props
    const { base } = data
    const { getFieldDecorator, getFieldValue, resetFields } = form

    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务名称">
          {getFieldDecorator('orderName', {
            initialValue: base.orderName,
            rules: [
              { required: true, message: '请输入任务名称', whitespace: true },
              { max: 20, message: '任务名称不大于20字' }
            ]
          })(
            <InputCount max={20} placeholder="请输入任务名称" />
          )}
        </FormItem>
        <FormItem label="任务发布平台">
          {getFieldDecorator('platformId', {
            initialValue: base.platformId,
            rules: [ {
              required: true,
              message: '请选择平台'
            } ]
          })(
            <Radio.Group>
              <Radio value={1000}>
                12306行程通知
              </Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="任务所属公司">
          <div className='flex-form-input-container'>
            {getFieldDecorator('company', {
              initialValue: base.company,
              rules: [ {
                required: true,
                message: '请选择任务所属公司'
              } ]
            })(
              <RemoteSearchSelect
                style={{ flex: 'auto', width: "auto" }}
                action={actions.TPFuzzyQueryCompany}
                placeholder="请选择任务所属公司"
                disabled={this.props.lockCompanySelect}
                onChange={this.props.getCompanyBalance}
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(this.props.balance).format('0,0.00')} 元
            </div>
          </div>
        </FormItem>
        {this.props.industryList.length > 0 && <FormItem label="行业分类">
          {getFieldDecorator('industry', {
            initialValue: base.industry,
            rules: [ {
              required: true,
              message: '请选择行业',
              type: 'array'
            } ]
          })(
            <Cascader
              fieldNames={{
                label: 'industryName',
                value: 'id',
                children: 'taskIndustryList'
              }}
              allowClear={false}
              onChange={val => {
                this.props.getBusinessScope(val.slice(-1))
                resetFields(["businessScopeId"])
              }}
              options={this.props.industryList}
              placeholder='请选择行业'
            />
          )}
        </FormItem>}
        {this.props.businessScopeList.length > 0 ? <FormItem label="经营内容">
          {getFieldDecorator('businessScopeId', {
            initialValue: base.businessScopeId,
            rules: [ {
              required: true,
              message: '请选择经营内容',
            } ]
          })(
            <Select
              placeholder='请选择经营内容'
              onChange={val => {
                this.props.getQualificationsGroup(getFieldValue("industry").slice(-1), val)
              }}
            >
              {this.props.businessScopeList.map(item => <Select.Option
                key={item.id}>{item.scopeName}</Select.Option>)}
            </Select>
          )}
        </FormItem> : null}
        <FormItem label="投放开始日期">
          {getFieldDecorator('orderStartDate', {
            initialValue: base.orderStartDate,
            validateFirst: true,
            rules: [
              { required: true, message: '请选择投放开始日期' },
              {
                validator: (rule, value, callback) => {
                  if (value.isBefore(this.defaultDisableDate)) {
                    return callback(`必须是当前日期之后的日期`)
                  }
                  callback()
                }
              }
            ]
          })(
            <DatePicker
              allowClear={false}
              placeholder="投放开始日期"
              format="YYYY-MM-DD"
              showToday={false}
              style={{ width: '100%' }}
              onChange={(m) => this.setState({
                disabledEndDate: moment(m).endOf('d')
              })}
              disabledDate={this.disabledStartDate}
            />
          )}
        </FormItem>
        <FormItem label="投放结束日期">
          <div className='flex-form-input-container'>
            {getFieldDecorator('orderEndDate', {
              initialValue: base.orderEndDate,
              validateFirst: true,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value && value.isBefore(this.state.disabledEndDate)) {
                      return callback(`必须是投放开始日期之后日期`)
                    }
                    callback()
                  }
                }
              ]
            })(
              <DatePicker
                placeholder="投放结束日期"
                format="YYYY-MM-DD"
                showToday={false}
                style={{ flex: 'auto' }}
                disabledDate={this.disabledEndDate}
                // onChange={}
              />
            )}
            <div className='flex-form-input-suffix'>
              如选择按天数投放，则以计算的投放天数为准
            </div>
          </div>
        </FormItem>
        <footer>
          <FormItem label=' '>
            <Button type="primary" htmlType="submit">下一步</Button>
          </FormItem>
        </footer>
      </Form>
    )
  }
}

export default {
  media: BaseForMedia,
  partner: BaseForPartner
}
