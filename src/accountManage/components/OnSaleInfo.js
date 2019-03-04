import React from 'react';
import { Divider, Form, Input, Radio,Tooltip } from 'antd';
import { handleReason } from '../util'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

export class OnSaleInfoForAdd extends React.Component {

	render() {
		const {
			getFieldDecorator,
			formItemLayout, data
		} = this.props;
		const { accountInfo } = data;
		let { isContacted, isOpen, isSignedOff } = accountInfo
		return <div>
			<FormItem {...formItemLayout} label='是否与博主联系'>
				{getFieldDecorator('extend.isContacted', {
					initialValue: isContacted ? isContacted : 1,
					rules: [{ required: true, message: '是否与博主联系为必填项！' }]
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='是否公开'>
				{getFieldDecorator('extend.isOpen', {
					initialValue: isOpen ? isOpen : 1,
					rules: [{ required: true, message: '是否公开为必填项！' }]
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='是否在C端已注销'>
				{getFieldDecorator('extend.isSignedOff', {
					initialValue: isSignedOff ? isSignedOff : 2,
					rules: [{ required: true, message: '是否在C端已注销为必填项！' }]
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
		</div>
	}
}

export class OnSaleInfo extends React.Component {
	handleChangeForVerifyType = (e) => {
		let target = e.target.value;
		if (target == 3) {
			this.setState({
				is_fail: true
			})
		} else {
			this.setState({
				is_fail: false
			})
		}
	}

	constructor(context, props) {
		super(context, props);
		this.state = {
			is_fail: false
		}
		this.randomKey = 1;
	}

	componentWillReceiveProps(nextProps) {
		if ('data' in nextProps && nextProps.data.accountInfo && nextProps.data.accountInfo.approvedStatus == 3) {
			if (this.randomKey == 1) {
				this.setState({
					is_fail: true
				}, () => {
					this.randomKey = Math.random()
				})
			}
		}
	}

	render() {
		const {
			getFieldDecorator,
			formItemLayout, data
		} = this.props;
		const { accountInfo } = data;
		let {
			approvedStatus, disapprovalReason,
			isContacted, isShielded,
			isSignedOff, isOnline,
			offlineReason, isOpen,
			accountId,
			aOnShelfStatus, aOffShelfReasonStringList,
			bOnShelfStatus, bOffShelfReasonStringList

		} = accountInfo
		const width = { width: '40%' };
		const { is_fail } = this.state;
		return <div>
			{getFieldDecorator('id', {
				initialValue: accountId
			})(
				<input type="hidden" />
			)}
			{/*{getFieldDecorator('userId', {
				initialValue: userId
			})(
				<input type="hidden" />
			)}*/}
			<FormItem {...formItemLayout} label='审核状态:'>
				{getFieldDecorator('base.approvedStatus', {
					rules: [{ required: false }],
					initialValue: approvedStatus ? approvedStatus : 0
				})(
					<RadioGroup style={width} onChange={this.handleChangeForVerifyType}>
						<Radio value={1}>未审核</Radio>
						<Radio value={2}>审核成功</Radio>
						<Radio value={3}>审核失败</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{is_fail && <FormItem {...formItemLayout} label=' ' colon={false}>
				{getFieldDecorator('base.disapprovalReason', {
					rules: [{ required: true, message: '审核失败原因不能未空！' },
						{ max: 1000, message: '审核失败原因不能超过1000字' }
					],
					initialValue: disapprovalReason
				})(
					<TextArea style={{ width: '30%' }} placeholder="请输入失败原因！" autosize={{
						minRows: 2,
						maxRows: 6
					}} />
				)}
			</FormItem>}
			<FormItem {...formItemLayout} label='	是否与博主联系'>
				{getFieldDecorator('extend.isContacted', {
					rules: [{ required: true, message: '是否与博主联系为必填项！' }],
					initialValue: isContacted ? isContacted : 1
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='是否在C端已注销'>
				{getFieldDecorator('extend.isSignedOff', {
					rules: [{ required: true, message: '是否在C端已注销为必填项！' }],
					initialValue: isSignedOff ? isSignedOff : 2
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='是否可售卖'>
				<div>
					{isOnline && isOnline == 2 && <span>否</span>}
					{isOnline && isOnline == 2 && offlineReason &&
					<Tooltip title={handleReason(offlineReason)}>
						<a style={{ marginLeft: '20px' }}>显示原因</a>
					</Tooltip>
					}
					{isOnline && isOnline == 1 && <span>是</span>}
				</div>
			</FormItem>
			<Divider />
			<FormItem {...formItemLayout} label='是否公开'>
				{getFieldDecorator('extend.isOpen', {
					rules: [{ required: true, message: '是否公开为必填项！' }],
					initialValue: isOpen ? isOpen : 1
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='是否被官方屏蔽'>
				{getFieldDecorator('extend.isShielded', {
					rules: [{ required: true, message: '是否被官方屏蔽必填项！' }],
					initialValue: isShielded ? isShielded : 2
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='可在A端上架'>
				<div>
					{aOnShelfStatus && aOnShelfStatus == 2 && <span>否</span>}
					{aOnShelfStatus && aOnShelfStatus == 2 && aOffShelfReasonStringList &&
					<Tooltip title={handleReason(aOffShelfReasonStringList)}>
						<a style={{ marginLeft: '20px' }}>显示原因</a>
					</Tooltip>
					}
					{aOnShelfStatus && aOnShelfStatus == 1 && <span>是</span>}
					{!aOnShelfStatus && '--'}
				</div>
			</FormItem>
			<FormItem {...formItemLayout} label='可在B端上架'>
				<div>
					{bOnShelfStatus && bOnShelfStatus == 2 && <span>否</span>}
					{bOnShelfStatus && bOnShelfStatus == 2 && bOffShelfReasonStringList &&
					<Tooltip title={handleReason(bOffShelfReasonStringList)}>
						<a style={{ marginLeft: '20px' }}>显示原因</a>
					</Tooltip>
					}
					{bOnShelfStatus && bOnShelfStatus == 1 && <span>是</span>}
					{!bOnShelfStatus && '--'}
				</div>
			</FormItem>
		</div>
	}
}



