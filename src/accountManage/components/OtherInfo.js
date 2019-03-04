import React from 'react';
import {
	Form,
	Input,
	Row,
	Col,
	Tooltip,
} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;


export class OtherInfo extends React.Component {
	constructor(context, props) {
		super(context, props);
		this.state = {
			visibleForCard: false,
			coExampleCards: [],
			visibleForButton: false
		}
	}
	render() {
		const {
			getFieldDecorator,
			formItemLayout, data ,pid} = this.props;
		const { accountInfo } = data;
		let { mediaTeamNote, accountId,isLowQuality,lowQualityReasonList  } = accountInfo;
		const toolTipsTitle = <span>{lowQualityReasonList}</span>
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
			{pid==9&&<FormItem {...formItemLayout} label='是否劣质号'>
				<Row>
					<Col span={6}>
						{getFieldDecorator('feature.isLowQuality', {
							rules: [{ required: false, }],
						})(
							<div>
							{isLowQuality&&isLowQuality==1&&<Tooltip title={toolTipsTitle}>
								<span>是</span>
							</Tooltip>}
							{isLowQuality&&isLowQuality==2&&<span>否</span>}
							{!isLowQuality && '未获取到数据'}
							</div>
						)}
					</Col>
					{/* <Col span={6} offset={2}>
						<span title="账号等级">账号等级：</span>
						{getFieldDecorator('accountGrade', {
							rules: [{ required: false, }],
							initialValue: accountGrade
						})(
							<Rate disabled={true}  />
						)}
					</Col> */}
				</Row>
			</FormItem>}
			<FormItem {...formItemLayout} label='媒介备注:' >
				{getFieldDecorator('extend.mediaTeamNote', {
					rules: [{ required: false, },
					{max:1000,message:'媒介备注不能超过1000字' },
					],
					initialValue: mediaTeamNote
				})(
					<TextArea style={{ width: '40%' }} />
				)}
			</FormItem>
		</div >
	}
}



