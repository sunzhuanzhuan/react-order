import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Radio } from 'antd';
import  WBYUploadFile  from '@/accountManage/base/NewUpload';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
// const Option = Select.Option

export const Fans = (props) => {
	const { isEdit = true } = props;
	return <FansEdit {...props} disabled={!isEdit} />
}
//是否粉丝数认证 1:是 2:否 100:拒绝认证
const plainOptions = [
	{ label: '是', value: 1 },
	{ label: '否', value: 2 },
	{ label: '拒绝认证', value: 100 }
];

const FollowersCount = (props) => {
	const {
		getFieldDecorator,
		formItemLayout,
		disabled,
		count,
	} = props
	const max = Math.pow(10, 10) - 1;
	return <FormItem {...formItemLayout} label='粉丝数：'>
		{getFieldDecorator('base.followerCount', {
			initialValue: count,
			rules: [{ required: true, message: '粉丝数不能为空' },{
				pattern: /^\d{0,9}$/,
				message: '只能输入不超过9位数的数字'
			}]
		})(
			<InputNumber style={{ width: '320px' }} max={max} disabled={disabled} placeholder="粉丝数" />
		)}
	</FormItem>
}

const FollowersScreenShot = (props) => {
	const {
		getFieldDecorator,
		formItemLayout,
		disabled,
		url,
		actions
	} = props
	return <FormItem {...formItemLayout} label='粉丝截图'>
		<div className='clearfix'>
			{getFieldDecorator('extend.followerCountScreenshotUrl', {
				initialValue: url ? [{
					name: url,
					url: url,
					filepath:url
				}] : [],
				rules: [{ required: true, message: '请上传粉丝截图' }]
			})(
				<WBYUploadFile tok={actions.getNewToken}  uploadUrl='/api/common-file/file/v1/uploadPubBucket' disabled={disabled}  accept={'.bmp, .gif, image/jpeg'} uploadText={'点击上传'} size={5} showUploadList={{showPreviewIcon: true, showRemoveIcon: !disabled}}/>
			)}
		</div>
		<p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
	</FormItem>
}
const FollowerBeIdentified = (props) => {
	const {
		getFieldDecorator,
		formItemLayout,
		disabled,
		status = 1
	} = props
	return <FormItem {...formItemLayout} label='粉丝数目认证'>
		{getFieldDecorator('extend.followerCountVerificationStatus', {
			initialValue: status || 1,
			rules: [{ required: false, message: '粉丝数目认证必填' }]
		})(
			<RadioGroup disabled={disabled} options={plainOptions} />
		)}
	</FormItem>
}

const FansEdit = (props) => {
	const {
		children,
		isFansNumberImg, disabled,
		data: { accountInfo },
		isDisableFollowersCount,
		getFieldDecorator,
		isUpdate
	} = props
	const {
		followerCount,
		followerCountFrom,
		followerCountMaintainedTime,
		followerCountVerificationStatus,
		followerCountScreenshotUrl,
		token,
		catched_at
	} = accountInfo
	return <div>
		<FollowersCount {...props} count={followerCount} disabled={isDisableFollowersCount || followerCountFrom == 2 || disabled} />
		{isFansNumberImg && <FollowersScreenShot {...props} url={followerCountScreenshotUrl} token={token}/>}
		{isUpdate && <FollowerBeIdentified {...props} status={followerCountVerificationStatus} />}
		{/* 隐藏域提交 */}
		{getFieldDecorator('base.followerCountFrom', {initialValue: followerCountFrom})(<input type="hidden" />)}
		{getFieldDecorator('base.followerCountMaintainedTime', {initialValue: followerCountMaintainedTime})(<input type="hidden" />)}
		{getFieldDecorator('catched_at', {initialValue: catched_at})(<input type="hidden" />)}
		{children}
	</div>
}

Fans.propTypes = {
	isFansNumberImg: PropTypes.bool,	//是否有粉丝截图
	isEdit: PropTypes.bool,			//是否是编辑状态
	isDisableFollowersCount: PropTypes.bool		//是否禁用粉丝数
}


