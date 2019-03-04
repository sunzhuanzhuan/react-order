import React from 'react';
import { Form, Input, Radio, Checkbox, DatePicker, TimePicker, InputNumber } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import numeral from 'numeral';
import 'numeral/locales/chs';

numeral.locale('chs')
moment.locale('zh-cn');
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

function handleWeeks(weeks) {
  let result = []
  if(weeks){
    if(Array.isArray(weeks)){
      return weeks.map(num => num.toString())
    }
    try {
      result = JSON.parse(weeks)
    }catch (e) {
      result = []
    }
  }
  return result.map(num => num.toString())
}
export class OrderTakeStrategy extends React.Component {
	initiaCheckBoxValue = () => {
		let [...tempContent] = this.checkedArr;
		this.setState({
			visibleForContent: tempContent
		})
	}
	handleChangeForStartegy = (e, type) => {
		let checked = e.target.checked;
		let [...templateContent] = this.state.visibleForContent;
		if (checked) {
			templateContent.push(type);
		} else {
			let index = templateContent.findIndex((item) => {
				return item == type;
			})
			templateContent.splice(index, 1);
		}
		this.setState({
			visibleForContent: templateContent
		})

	}
	handleChangeForTime = (e, type) => {
		let target = type || e && e.target.value;
		if (target != 3) {
			//baseTimeNode
			this.setState({
				visibleForBaseTime: true,
				startValue: null,
				endValue: null,
				endOpen: false,
				visibleForUserDefine: false
			})
			if (target == 2) {
				this.setState({
					visibleForWeek: true
				})
			} else {
				this.setState({
					visibleForWeek: false
				})
			}
		} else {
			//处理自定义时间
			this.setState({
				visibleForBaseTime: false,
				visibleForWeek: false,
				visibleForUserDefine: true
			})
		}
	}
	onOk = (field, value) => {
		// this.onChange('startValue', value);
		this.setState({
			[field]: value
		});
	}
	onStartOK = (value) => {
		this.onOk('startValue', value)
	}
	onEndOK = (value) => {
		this.onOk('endValue', value)
	}
	range = (start, end) => {
		const result = [];
		for (let i = start; i < end; i++) {
			result.push(i);
		}
		return result;
	}
	disabledStartDate = () => {
		const endValue = this.state.endValue;
		if (endValue) {
			let flag = moment(endValue).hour();
			return this.range(0, 24).slice(flag, 24)
		}
		return [23]
	}
	disabledEndDate = () => {
		const startValue = this.state.startValue;
		if (startValue) {
			let flag = moment(startValue).hour();
			return this.range(0, 24).slice(0, flag + 1)
		}
		return [0]
	}
	onChange = (field, value) => {
		if (value) {
			if (value.minute() % 15) {
				value.minute(0)
			}
			value.second(0);
		}
		this.setState({
			[field]: value
		});
	}
	onRangeChange = (value) => {
		if (value && value.length) {
			let [start, end] = value
			if (start.minute() % 15) {
				start.minute(0)
			}
			if (end.minute() % 15) {
				end.minute(0)
			}
			start.second(0);
			end.second(0);
		}
		this.setState({
			'rangeValue': value
		});
	}
	onStartChange = (value) => {
		const { endValue } = this.state
		if (value && endValue) {
			if (value.hour() >= endValue.hour()) {
				(endValue.hour() - 1) < 0 ? value.hour(0) : value.hour(endValue.hour() - 1)
			}
		}
		this.onChange('startValue', value);
	}
	onEndChange = (value) => {
		const { startValue } = this.state
		if (value && startValue) {
			if (value.hour() <= startValue.hour()) {
				(startValue.hour() + 1) > 23 ? value.hour(23) : value.hour(startValue.hour() + 1)
			}
		}
		this.onChange('endValue', value);
	}
	handleStartOpenChange = (open) => {
		if (!open) {
			this.setState({ endOpen: true });
		}
	}
	handleEndOpenChange = (open) => {
		this.setState({ endOpen: open });
	}
	handleChangeForCheckBox = (checkedValues) => {
		this.patchHandleDisabledForCheckbox(checkedValues);
	}
	patchHandleDisabledForCheckbox = (checkedValues) => {
		checkedValues = handleWeeks(checkedValues)
		let len = checkedValues.length;
		let tempArr = [...this.state.options];
		if (len == 6) {
			//置灰处理
			let flag = 0;
			checkedValues.sort();
			for (let i = 1; checkedValues.length; i++) {
				if (checkedValues[i - 1] != i) {
					flag = i;
					break;
				}
			}

			tempArr[flag - 1].disabled = true;
		} else if (len == 5) {
			tempArr.map((item) => {
				if ('disabled' in item) {
					item.disabled = false;
				}
			})
		}
		this.setState({
			options: tempArr
		})
	}

	constructor(context, props) {
		super(context, props);
		this.state = {
			visibleForContent: [],
			startValue: null,
			endValue: null,
			endOpen: false,
			visibleForBaseTime: false,
			visibleForWeek: false,
			visibleForUserDefine: false,
			randomKey: 1,
			randomKeyForPrice: 1,
			options: [{ label: '星期一', value: '1' },
				{ label: '星期二', value: '2' },
				{ label: '星期三', value: '3' },
				{ label: '星期四', value: '4' },
				{ label: '星期五', value: '5' },
				{ label: '星期六', value: '6' },
				{ label: '星期日', value: '7' }]
		}
		this.checkedArr = []
	}

	componentWillReceiveProps(nextProps) {
		if ('data' in nextProps && nextProps.data.accountInfo) {
			if (this.state.randomKey == 1) {
				if (nextProps.data.accountInfo.strategy && nextProps.data.accountInfo.strategy.type) {
					//数据初始化处理
					let strategy = nextProps.data.accountInfo.strategy
					this.handleChangeForTime(undefined, strategy.type);
					this.checkedArr.push("0")
					this.initiaCheckBoxValue()
					this.patchHandleDisabledForCheckbox(strategy.weeks);

				}
				if (nextProps.data.accountInfo.maxOrderCount) {
					this.checkedArr.push("1")
					this.initiaCheckBoxValue()
				}

			}
			this.setState({
				randomKey: Math.random()
			})
		}
		if ('data' in nextProps && nextProps.data.priceInfo) {
			if (this.state.randomKeyForPrice == 1) {
				if (nextProps.data.priceInfo.isAcceptHardAd == 1) {
					this.checkedArr.push("2")
					this.initiaCheckBoxValue()
				}
			}
			this.setState({
				randomKeyForPrice: Math.random()
			})
		}
	}

	render() {
		const {
			getFieldDecorator,
			formItemLayout, data
		} = this.props;
		const { accountInfo } = data;
		let {
			strategy,
			maxOrderCount, maxOrderCountNote,
			accountId
		} = accountInfo;
		let {
			visibleForContent,
			visibleForBaseTime,
			visibleForWeek,
			visibleForUserDefine,
			options
		} = this.state;
		const formItemLayoutForTimeBase = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 10 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 }
			}
		}
		const baseTimeNode = (visibleForBaseTime) => {
			if (!visibleForBaseTime) {
				return null;
			} else {
				return <div style={{ marginLeft: '50px' }}>
					<FormItem {...formItemLayoutForTimeBase}
						label='离开时间'
						style={{ display: 'inline-block', marginRight: '20px' }}
					>
						{getFieldDecorator('strategy.startTimeOfTime', {
							rules: [{ required: true, message: '离开时间不能为空' }],
							initialValue: (strategy && strategy.startTimeOfTime ) ? moment(strategy.startTimeOfTime, 'HH:mm') : null
						})(
							<TimePicker
								placeholder="离开时间"
								disabledHours={this.disabledStartDate}
								minuteStep={15}
								format="HH:mm"
								onOk={this.onStartOK}
								onChange={this.onStartChange}
								onOpenChange={this.handleStartOpenChange}
							/>
						)}
					</FormItem>
					<FormItem {...formItemLayoutForTimeBase}
						label='返回时间'
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('strategy.endTimeOfTime', {
							rules: [{ required: true, message: '返回时间不能为空' }],
							initialValue: (strategy && strategy.endTimeOfTime)? moment(strategy.endTimeOfTime, 'HH:mm') : null
						})(
							<TimePicker
								placeholder="返回时间"
								disabledHours={this.disabledEndDate}
								minuteStep={15}
								format="HH:mm"
								onOk={this.onEndOK}
								onChange={this.onEndChange}
								onOpenChange={this.handleEndOpenChange}
							/>
						)}
					</FormItem>
					<FormItem labelCol={{
						xs: { span: 24 },
						sm: { span: 2 }
					}}
						wrapperCol={{
							xs: { span: 24 },
							sm: { span: 20 }
						}}
						label='备注'
						style={{ margin: '20px 0' }}
					>
						{getFieldDecorator('strategy.comment', {
							rules: [{ required: false }, {
								max: 1000, message: '备注不能超过1000字'
							}],
							initialValue: strategy && strategy.comment
						})(
							<TextArea style={{ width: '35%' }} />
						)}
					</FormItem>
				</div>
			}
		}
		const timeNodeForWeek = (visibleForWeek) => {
			if (!visibleForWeek) {
				return null
			} else {
				return <div style={{ marginLeft: '40px' }}><FormItem
					labelCol={{ sm: { span: 1 } }}
					label=" "
					colon={false}
					style={{ margin: '20px 0' }}
				>
					{getFieldDecorator('strategy.weeks', {
						rules: [{ required: true, message: '请选择星期！' }],
						initialValue: handleWeeks(strategy && strategy.weeks)
					})(
						<CheckboxGroup options={options} onChange={this.handleChangeForCheckBox} />
					)}
				</FormItem></div>
			}
		}
		const rangeConfig = {
			rules: [{ type: 'array', required: true, message: '请填入对应的时间！' }],
			initialValue: (strategy && strategy.startTimeOfDate && strategy.endTimeOfDate) ? [moment(strategy.startTimeOfDate), moment(strategy.endTimeOfDate)] : []
		};
		const userDefineTimeNode = () => {
			if (!visibleForUserDefine) {
				return null;
			} else {
				return <div>
					<FormItem
						{...formItemLayout}
						label="选择时间"
					>
						{getFieldDecorator('strategy.otherTime', rangeConfig)(
							<RangePicker
								showTime={{ minuteStep: 15, format: "HH:mm" }}
								format="YYYY-MM-DD HH:mm"
								disabledDate={(current) => current && current < moment().startOf('day')}
								onChange={this.onRangeChange}
							/>
						)}
					</FormItem>
				</div>
			}
		}
		return <div>
			{getFieldDecorator('id', {
				initialValue: accountId ? accountId : undefined
			})(
				<input type="hidden" />
			)}
			<FormItem {...formItemLayout}
				label='选择接单策略:'
			>
				<div>
					{getFieldDecorator('id', {
						initialValue: strategy && strategy.accountId
					})(
						<input type="hidden" />
					)}
					<FormItem
						label=" "
						colon={false}
						labelCol={{
							sm: { span: 0 }
						}}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('isLeave', {
							rules: [{ required: false }],
							valuePropName: 'checked',
							initialValue: (strategy && strategy.type) ? Object.keys(strategy).length > 0 : false
						})(
							<Checkbox onChange={(e) => this.handleChangeForStartegy(e, '0')}>暂离</Checkbox>
						)}
					</FormItem>
					{visibleForContent.includes("0") &&
					<FormItem labelCol={{
						sm: { span: 0 }
					}}
						label=" "
						colon={false}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('strategy.type', {
							initialValue: strategy && strategy.type,
							rules: [{
								required: true,
								message: <span style={{ marginLeft: '50px' }}>请选择对应的时间类型</span>
							}]

						})(
							<RadioGroup onChange={this.handleChangeForTime} style={{ marginLeft: '50px' }}>
								<Radio value={1}>每日</Radio>
								<Radio value={2}>每周</Radio>
								<Radio value={3}>自定义时间</Radio>
							</RadioGroup>
						)}
					</FormItem>
					}
					{visibleForContent.includes("0") && visibleForWeek && timeNodeForWeek(visibleForWeek)}
					{visibleForContent.includes("0") && visibleForBaseTime && baseTimeNode(visibleForBaseTime)}
					{visibleForContent.includes("0") && visibleForUserDefine && userDefineTimeNode(visibleForUserDefine)}
				</div>
			</FormItem>
			<FormItem {...formItemLayout}
				label=" "
				colon={false}
			>
				<div>
					<FormItem
						label=" "
						colon={false}
						labelCol={{
							sm: { span: 0 }
						}}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('isFinite', {
							rules: [{ required: false }],
							valuePropName: 'checked',
							initialValue: !!maxOrderCount
						})(
							<Checkbox onChange={(e) => this.handleChangeForStartegy(e, '1')}>接单上限</Checkbox>
						)}
					</FormItem>
					{visibleForContent.includes("1") &&
					<div>
						<FormItem
							label="每日最大接单数"
							{...formItemLayout}
						>
							{getFieldDecorator('extend.maxOrderCount', {
								rules: [{ required: true, message: '请填写每日最大接单数！' }],
								initialValue: maxOrderCount || 1
							})(
								<InputNumber min={1} max={99} />
							)}
						</FormItem>
						<FormItem
							label="备注"
							{...formItemLayout}
						>
							{getFieldDecorator('extend.maxOrderCountNote', {
								rules: [{ required: false, message: '' }, {
									max: 1000,
									message: '备注不能超过1000字'
								}],
								initialValue: maxOrderCountNote
							})(
								<TextArea style={{ width: '30%' }} />
							)}
						</FormItem>
					</div>}
				</div>
			</FormItem>
		</div>
	}
}



