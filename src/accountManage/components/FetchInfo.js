import React from 'react';
import {
	Form,
	Input, Button,
	Row, Col, Radio, message, Modal
} from 'antd';
import { platformToFetch } from '../constants/placeholder'
import { parseUrlQuery } from '@/util/parseUrl'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function info() {
	Modal.info({
		title: '抓取信息有误!',
		content: (
			<div>
				<p>抓取回账号唯一标识与原唯一标识不一致，无法更新账号信息</p>
			</div>
		),
		onOk() { }
	});
}
const rules = {
	'url': new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i')
}

export class FetchInfo extends React.Component {
	handleChange = e => {
		let value = e.target.value.trim()
		this.setState({
			value,
			disabled: !value
		})
	}
	changeKeys = e => {
		let value = e.target.value
		this.setState({
			keys: value,
			placeholder: this.type.placeholder[value] || this.type.placeholder
		})
	}
	handleFetch = () => {
		const { pid, actions: { fetchAccountBaseInfo, fetchAccountBaseInfoByUpdate, updateFetchInfo, addFetchInfo }, form, data: { accountInfo }, isUpdate } = this.props
		const { value, keys } = this.state
		this.setState({ isLoading: true })
		let flag_id = accountInfo.snsUniqueId
		let action = isUpdate ? fetchAccountBaseInfoByUpdate : fetchAccountBaseInfo
		let params = isUpdate ? {
			platformId: pid,
			[keys]: value,
			is_edit_account_page: 1
		} : { platformId: pid, [keys]: value }
		action(params).then((data = {}) => {
			this.setState({ isLoading: false })
			let value = data.data
			if (isUpdate) {
				if (value['snsUniqueId'] && (flag_id != value['snsUniqueId'])) {
					value = {}
					return info()
				}
				updateFetchInfo(value)
			} else {
				addFetchInfo({
					isNewFetch: !(flag_id == value['snsUniqueId']),
					value
				})
			}
			let forms = Object.values((window.updateForms || {})) // 维护页分段提交form
			let singleForm = form // 入库页单个提交form
			if (singleForm) {
				Object.keys(data.data).forEach(key => {
					singleForm.resetFields('base.' + key)
				})
			}
			if (forms.length) {
				Object.keys(data.data).forEach(key => {
					forms.forEach(form => form.resetFields(key))
				})
			}
			message.success('获取信息成功！')
		}).catch(() => {
			this.setState({
				isLoading: false
			})
		})
	}
	state = {
		isLoading: false
	}

	constructor(props) {
		super(props)
		// 处理拓号入库跳转抓取
		let urlParams = parseUrlQuery()
		this.isAutoFetch = urlParams['fetch_info'] && decodeURIComponent(urlParams['fetch_info'])
		let isID = /^\d+$/.test(this.isAutoFetch)
		this.platformType = {
			'1': {
				title: '抓取项',
				radio: <Col span={24}>
					<RadioGroup onChange={this.changeKeys} defaultValue={isID ? 'snsId' : 'snsName'}>
						<Radio value={'snsName'}>账号名称</Radio>
						<Radio value={'snsId'}>账号ID</Radio>
					</RadioGroup>
				</Col>,
				defaultKeys: isID ? 'snsId' : 'snsName',
				placeholder: {
					snsId: '请输入账号ID',
					snsName: '请输入账号名称'
				}
			},
			'9': {
				title: '抓取项',
				radio: <Col span={24}>
					<RadioGroup onChange={this.changeKeys} defaultValue={'url'}>
						<Radio value={'url'}>历史图文消息(URL)</Radio>
						<Radio value={'snsId'}>微信号</Radio>
					</RadioGroup>
				</Col>,
				defaultKeys: 'url',
				placeholder: {
					snsId: '请输入微信号',
					url: '请输入历史图文链接'
				}
			},
			'default': {
				title: '抓取信息',
				radio: null,
				defaultKeys: this.props.defaultKeys || 'url',
				placeholder: '请输入主页链接'
			}
		}
		this.type = this.platformType[this.props.pid] || this.platformType['default']
		this.state = {
			disabled: !this.isAutoFetch,
			value: this.isAutoFetch || '',
			keys: this.type.defaultKeys,
			placeholder: this.type.placeholder[this.type.defaultKeys] || this.type.placeholder
		}
	}

	componentDidMount() {
		if (this.isAutoFetch) {
			let timer = setTimeout(() => {
				window.clearTimeout(timer)
				this.handleFetch()
			}, 0)
		}
	}

	render() {
		const { formItemLayout, pid = 0 } = this.props
		const { disabled, value = '', isLoading, placeholder, keys } = this.state
		let isSuccess = !value || !rules[keys] || rules[keys].test(value)
		let valida = isSuccess ? {
			help: '账号必须经过抓取才可入库'
		} : {
				validateStatus: "error",
				help: '请输入正确的抓取格式!'
			}
		return <div>
			<FormItem {...formItemLayout} label={this.type.title} {...valida}>
				<Row gutter={20}>
					{this.type.radio}
					<Col span={20}>
						<Input placeholder={platformToFetch[pid] || placeholder || "填写抓取信息"} onChange={this.handleChange} value={value} />
					</Col>
					<Col span={4}>
						<Button block onClick={this.handleFetch}
							loading={isLoading}
							disabled={disabled || !isSuccess}
							type='primary'>{isLoading ? '抓取中...' : '一键抓取'}</Button>
					</Col>
				</Row>
			</FormItem>
		</div>
	}

}
