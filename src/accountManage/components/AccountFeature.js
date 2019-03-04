import React from 'react';
import {
	Form,
	Input,
	Select,
	Radio,
	InputNumber,
	Cascader,
	Checkbox,
	Icon,
	DatePicker
} from 'antd';
import moment from 'moment';
import areas from '@/constants/areas.json'
import { analyzeAreaCode } from '@/util/analyzeAreaCode'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

export class AccountFeature extends React.Component {
	handleExtraContent = () => {
		this.setState({
			visibleForExtarContent: !this.state.visibleForExtarContent
		})
	}
	countTextLen = (e) => {
		let str = e.target.value;
		this.setState({
			textCount: str.length
		})
	}
	validaVerificationLen = (rule, value, callback) => {
		let length = value.length
		if (length > 1000) {
			callback('认证信息不能超过1000字')
		} else {
			callback();
		}
	}

	constructor(context, props) {
		super(context, props);
		this.state = {
			visibleForExtarContent: false,
			textCount: 0
		}
		this.randomKey = 1;
	}

	componentDidMount() {
		/*const { getRegionCode } = this.props.actions;
		getRegionCode();*/
	}

	componentWillReceiveProps(nextProps) {
		if ('data' in nextProps && nextProps.data.accountInfo && nextProps.data.accountInfo.verificationInfo) {
			if (this.randomKey == 1) {
				let verificationInfo = nextProps.data.accountInfo.verificationInfo;
				let len = verificationInfo.length;
				this.setState({
					textCount: len
				}, () => {
					this.randomKey = Math.random()
				})
			}
		}
	}

	render() {
		const {
			getFieldDecorator,
			formItemLayout, data, pid
		} = this.props;

		const { accountInfo, industryListForAccount } = data;
		let {
			mediaType, areaId, gender,
			industryId, level, verifiedStatus,
			verificationInfo, weiboUrl,
			realName, supportMultiPlatformOriginalPost,
			multiPlatformOriginalPostTips, snbt,
			trueFansRate, hasHouse,
			hasCar, hasBaby, accountId,
			genderFrom, genderMaintainedTime, areaIdFrom,areaIdMaintainedTime,
			levelFrom, levelMaintainedTime, birthDate
		} = accountInfo;
		const width = { width: '40%' };
		let area = analyzeAreaCode(areaId)
		let { visibleForExtarContent, textCount } = this.state;
		return <div>
			{getFieldDecorator('id', {
				initialValue: accountId
			})(
				<input type="hidden" />
			)}
			{/*{getFieldDecorator('base.userId', {
				initialValue: userId
			})(
				<input type="hidden" />
			)}*/}
			{getFieldDecorator('base.genderFrom', {
				initialValue: genderFrom
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('base.genderMaintainedTime', {
				initialValue: genderMaintainedTime
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('base.areaIdFrom', {
				initialValue: areaIdFrom
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('base.areaIdMaintainedTime', {
				initialValue: areaIdMaintainedTime
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('base.levelFrom', {
				initialValue: levelFrom
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('base.levelMaintainedTime', {
				initialValue: levelMaintainedTime
			})(
				<input type="hidden" />
			)}
			{/*{getFieldDecorator('catched_at', {
				initialValue: catchedAt
			})(
				<input type="hidden" />
			)}*/}
			<FormItem {...formItemLayout} label='账号类型:'>
				{getFieldDecorator('base.mediaType', {
					// rules: [{ required: true, message: '账号类型不能为空!' }],
					initialValue: mediaType
				})(
					<Select style={width}>
						<Option value={3}>未知</Option>
						<Option value={1}>草根</Option>
						<Option value={2}>名人</Option>
						<Option value={4}>媒体</Option>
						<Option value={5}>个人</Option>
					</Select>
				)}
				{
					<a style={{ float: 'right' }} onClick={this.handleExtraContent}>{!visibleForExtarContent ?
						<span>展开更多设置<Icon type="down" theme="outlined" /></span> :
						<span>收起更多设置<Icon type="up" theme="outlined" /></span>} </a>}
			</FormItem>
			<div style={{ display: visibleForExtarContent ? 'block' : 'none' }}>
				<FormItem {...formItemLayout} label='地域:'>
					{getFieldDecorator('base.areaId', {
						rules: [{ required: false }],
						initialValue: area
					})(
						<Cascader fieldNames={{
							label: 'areaName',
							value: 'id',
							children: 'childrenList'
						}} options={areas} placeholder="请选择地域！" style={width} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='性别:'>
					{getFieldDecorator('base.gender', {
						rules: [{ required: false }],
						initialValue: gender
					})(
						<RadioGroup style={width} disabled={parseInt(genderFrom) !== 1}>
							<Radio value={3}>未知/其他</Radio>
							<Radio value={1}>男</Radio>
							<Radio value={2}>女</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='出生日期:'>
					{getFieldDecorator('extend.birthDate', {
						rules: [{ required: false }],
						initialValue: birthDate ? moment(birthDate, 'YYYY-MM-DD') : null
					})(
						<DatePicker />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='行业:'>
					{getFieldDecorator('extend.industryId', {
						rules: [{ required: false }],
						initialValue: industryId ? industryId : undefined
					})(
						<Select placeholder="请输入对应的行业信息!" style={width}>
							{industryListForAccount && industryListForAccount.map(item => {
								return <Option key={item.id} value={item.id}>{item.name}</Option>
							})}
						</Select>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='平台等级:'>
					{getFieldDecorator('base.level', {
						rules: [{ required: false }],
						initialValue: level
					})(
						<InputNumber min={0} max={300} disabled={parseInt(levelFrom) !== 1} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='是否认证:'>
					{getFieldDecorator('extend.verifiedStatus', {
						rules: [{ required: false }],
						initialValue: verifiedStatus
					})(
						<RadioGroup>
							<Radio value={1}>否</Radio>
							<Radio value={2}>黄V</Radio>
							<Radio value={3}>蓝V</Radio>
							<Radio value={4}>达人</Radio>
							<Radio value={5}>其他</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='认证信息:'>
					{getFieldDecorator('extend.verificationInfo', {
						rules: [{ required: false }, {
							validator: this.validaVerificationLen
						}],
						initialValue: verificationInfo
					})(
						<TextArea placeholder="" autosize={{
							minRows: 2,
							maxRows: 6
						}} style={{ width: '70%' }} onChange={this.countTextLen} />
					)}
					<span style={{
						position: 'absolute',
						top: '-9px',
						right: '20px'
					}}><span style={{ color: (textCount > 1000) ? 'red' : 'black' }}>{textCount}</span>/1000</span>
				</FormItem>
				{pid != 1 && <FormItem {...formItemLayout} label='新浪微博:'>
					{getFieldDecorator('extend.weiboUrl', {
						rules: [{ required: false }, {
							pattern: /^htt(p|ps):\/\//,
							message: '新浪微博链接格式不正确，请填写前缀为“http://或https://”的新浪微博链接'
						}, { max: 1024, message: '新浪微博链接最多可输入1024个字符' }],
						initialValue: weiboUrl
					})(
						<Input style={width} />
					)}
				</FormItem>}
				<FormItem {...formItemLayout} label='真实姓名:'>
					{getFieldDecorator('extend.realName', {
						rules: [{ required: false }, {
							max: 60, message: '真实姓名不能超过60字'
						}],
						initialValue: realName
					})(
						<Input style={width} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='是否多平台原创发布:'>
					{getFieldDecorator('extend.supportMultiPlatformOriginalPost', {
						rules: [{ required: false }],
						initialValue: supportMultiPlatformOriginalPost
					})(
						<RadioGroup>
							<Radio value={2}>否</Radio>
							<Radio value={1}>是</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label=' ' colon={false}>
					{getFieldDecorator('extend.multiPlatformOriginalPostTips', {
						rules: [{ required: false }, {
							max: 1000, message: '备注信息不能超过1000字'
						}],
						initialValue: multiPlatformOriginalPostTips
					})(
						<TextArea placeholder="输入平台名" autosize={{
							minRows: 2,
							maxRows: 6
						}} style={width} />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label='SNBT:'>
					<span>{snbt ? snbt : '--'}</span>
				</FormItem>
				<FormItem {...formItemLayout} label='真粉率:'>
					<span>{trueFansRate ? trueFansRate : '--'}</span>
				</FormItem>
				<FormItem {...formItemLayout} label='家庭状况:'>
					<FormItem {...formItemLayout}
						label=' '
						colon={false}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('extend.hasHouse', {
							rules: [{ required: false }],
							valuePropName: 'checked',
							initialValue: (parseInt(hasHouse) === 1)
						})(
							<Checkbox>有房</Checkbox>
						)}
					</FormItem>
					<FormItem {...formItemLayout}
						label=' '
						colon={false}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('extend.hasCar', {
							rules: [{ required: false }],
							valuePropName: 'checked',
							initialValue: (parseInt(hasCar) === 1)
						})(
							<Checkbox>有车</Checkbox>
						)}
					</FormItem>
					<FormItem labelCol={{ sm: 0 }}
						label=' '
						colon={false}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('extend.hasBaby', {
							rules: [{ required: false }],
							valuePropName: 'checked',
							initialValue: (parseInt(hasBaby) === 1)
						})(
							<Checkbox>有子女</Checkbox>
						)}
					</FormItem>
				</FormItem>
			</div>
		</div>
	}
}

