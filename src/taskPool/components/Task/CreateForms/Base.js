/**
 * 创建任务-基本信息表单
 */
import React from 'react'
import { Form, Radio, Button, Cascader, Tooltip, DatePicker } from 'antd'
import RemoteSearchSelect from "@/taskPool/base/RemoteSearchSelect";
import { InputCount } from "@/base/Input";
import { OssUpload, WBYPlatformIcon } from "wbyui";
import numeral from '@/util/numeralExpand';
import moment, { duration } from 'moment';
import { getCountDownTimeText } from '@/taskPool/constants/utils';

const { RangePicker } = DatePicker
const FormItem = Form.Item

@Form.create()
export default class Base extends React.Component {
  constructor() {
    super()
    this.defaultDisableDate = moment().add(31, 'm').startOf('m')
    this.state = {
      endOpen: false,
      dateDuration: "请选择时间",
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

    const { form, formLayout, data, actions } = this.props
    const { base } = data
    const { getFieldDecorator } = form

    return (
      <Form onSubmit={this.handleSubmit}  {...formLayout}>
        <FormItem label="任务所属公司">
          <div className='flex-form-input-container'>
            {getFieldDecorator('company', {
              initialValue: base.company,
              rules: [{
                required: true,
                message: '请选择任务所属公司'
              }]
            })(
              <RemoteSearchSelect
                style={{ flex: 'auto', width: "auto" }}
                action={actions.TPFuzzyQueryCompany}
                placeholder="请选择任务所属公司"
                disabled={data.disabled}
                onChange={this.props.getCompanyBalance}
              />
            )}
            <div className='flex-form-input-suffix'>
              任务账户余额：{numeral(data.budget.balance || 0).format('0,0.00')} 元
            </div>
          </div>

        </FormItem>
        <FormItem label="任务发布平台">
          {getFieldDecorator('platformId', {
            initialValue: base.platformId,
            rules: [{
              required: true,
              message: '请选择平台'
            }]
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
              {/*<Tooltip title="糟糕，我们还没有准备好">
                <Radio value={1} disabled>
                  <WBYPlatformIcon weibo_type={1} widthSize={22} />
                  <span style={{
                    verticalAlign: 'text-bottom',
                    marginLeft: 8,
                    userSelect: 'none'
                  }}>新浪微博</span>
                </Radio>
              </Tooltip>*/}
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
        <FormItem label="行业分类">
          {getFieldDecorator('industry', {
            initialValue: base.industry,
            rules: [{
              required: true,
              message: '请选择行业',
              type: 'array'
            }]
          })(
            <Cascader
              fieldNames={{
                label: 'itemValue',
                value: 'itemKey',
                children: 'childrenList'
              }}
              options={data.industryList}
              placeholder='请选择行业'
            />
          )}
        </FormItem>
        <FormItem label="任务时间">
          <div className='flex-form-input-container'>
            {getFieldDecorator('orderDate', {
              // initialValue: base.orderDate,
              validateFirst: true,
              rules: [
                { required: true, message: '请选择任务时间' },
                {
                  validator: (rule, value, callback) => {
                    const [start, end] = value

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
                placeholder={["任务开始时间", "任务结束时间"]}
                format="YYYY-MM-DD HH:mm"
                style={{ flex: 'auto' }}
                disabledDate={this.disabledDate}
                defaultPickerValue={[
                  this.defaultDisableDate,
                  moment(this.defaultDisableDate).add(7, 'd')
                ]}
                onCalendarChange={(range) => {
                  const [startData, endData] = range
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
        <FormItem label="发布后保留时长">
          <div className='flex-form-input-container'>
            {getFieldDecorator('retainTime', {
              initialValue: base.retainTime || 24,
              rules: [{
                required: true,
                message: '请选择任务保留时长'
              }]
            })(
              <Radio.Group>
                <Radio value={24}>24小时</Radio>
                <Radio value={48}>48小时</Radio>
              </Radio.Group>
            )}
            <div className='flex-form-input-suffix'>
              规定时间内，文章质检合格，则自动扣款。
            </div>
          </div>
        </FormItem>
        <FormItem label={<span>选择任务模式 </span>}>
          <div className='flex-form-input-container'>
            {getFieldDecorator('retainTime222', {
              initialValue: base.retainTime || "1",
              rules: [{
                required: true,
                message: '选择任务模式'
              }]
            })(
              <Radio.Group>
                <Radio value={"1"}>抢单模式</Radio>
                <Radio value={"2"}>竞标模式</Radio>
              </Radio.Group>
            )}
            <div>
              {/*<Icon/>*/}
            </div>
          </div>
        </FormItem>
        <FormItem label="上传任务封面">
          {getFieldDecorator('orderCoverImage', {
            initialValue: base.orderCoverImage,
            valuePropName: 'fileList',
            getValueFromEvent: e => e && e.fileList,
            rules: [
              { message: '请上传任务封面', required: true, type: "array" }
            ]
          })(
            <OssUpload
              authToken={data.authToken}
              listType='picture-card'
              rule={{
                bizzCode: 'ORDER_IMG_UPLOAD',
                max: 2,
                suffix: 'png,jpg,jpeg,gif,webp'
              }}
              len={1}
              tipContent={'请上传PNG,JPG,JPEG,GIF,WEBP格式的图片,尺寸比例为2.35:1,最大不能超过2MB'}
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
