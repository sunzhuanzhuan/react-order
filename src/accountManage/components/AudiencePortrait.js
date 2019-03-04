import React, { Component } from 'react';
import { Form, Radio } from 'antd';
import  WBYUploadFile  from '@/accountManage/base/NewUpload'
import GenderPercent from './GenderPercent'
import TopCity from "./TopCity";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const checkGenderRadio = (rule, value, callback) => {
	if((value[0] + value[1]) > 100){
		callback('男女性别分布比例之和不能超过100%')
	}
	callback()
}

export default class AudiencePortrait extends Component {
	render() {
		const {
			getFieldDecorator, formItemLayout, children, data: { accountInfo }, actions
		} = this.props
		const {
			audienceGenderDistributionVerificationStatus,
			audienceGenderMaleRatio = 50,
			audienceGenderFemaleRatio = 50,
			audienceCityDistributionSceenshotUrl,
			audienceCityTop1,
			audienceCityTop2,
			audienceCityTop3,
		} = accountInfo
		return <div>
			<FormItem {...formItemLayout} label='性别分布认证'>
				{getFieldDecorator('audiencePortrait.audienceGenderDistributionVerificationStatus', {
					initialValue: audienceGenderDistributionVerificationStatus || 2
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='性别分布'>
				{getFieldDecorator('audiencePortrait.genderRadio', {
					initialValue: [parseInt(audienceGenderMaleRatio), parseInt(audienceGenderFemaleRatio)],
					first: true,
					rules: [{validator: checkGenderRadio}]
				})(<GenderPercent />)}
			</FormItem>
			<FormItem {...formItemLayout} label='城市分布截图'>
				<div className='clearfix'>
					{getFieldDecorator('audiencePortrait.cityUrl', {
						initialValue: audienceCityDistributionSceenshotUrl ? [{
							name: audienceCityDistributionSceenshotUrl,
							url: audienceCityDistributionSceenshotUrl,
							filepath: audienceCityDistributionSceenshotUrl
						}] : []
					})(
						<WBYUploadFile tok={actions.getNewToken} accept={'.bmp, .gif, image/jpeg'} uploadText={'点击上传'} size={5} uploadUrl='/api/common-file/file/v1/uploadPubBucket'/>
					)}
				</div>
				<p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
			</FormItem>
			<FormItem {...formItemLayout} label='粉丝城市分布'>
				<div>
					{getFieldDecorator('audiencePortrait.cityRadio', {
						initialValue: [audienceCityTop1,audienceCityTop2,audienceCityTop3]
					})(<TopCity getList={actions.getChineseCities}/>)}
					<p className='input-desc-bottom'>建议选择前三名城市</p>
				</div>
			</FormItem>
			{children}
		</div>
	}
}
