import React, {PureComponent} from 'react';
import { Form, Modal, Input, DatePicker } from 'antd';
import numeral from 'numeral'

const FormItem = Form.Item;
const { TextArea } = Input;
import { OssUpload } from "wbyui";
import moment from 'moment';

class TaskModal extends PureComponent {
    constructor(props) {
		super(props);
		this.state = {
			loading: false, 
			attachment: ''
		};
	}

    getModalContent = type => {
        switch(type) {
            case 'addReceipt':
            case 'TPFristFailureUpdateContentUrl':
                return this.getReceiptComp();
            case 'TPApprovedFirstSuccess':
                return this.getPassComp();
            case 'TPApprovedSecondSuccess':
                return this.getQualifiedComp();
            case 'TPApprovedSecondFailure':
                return this.getUnqualifiedComp();
            case 'TPMcnOrderConfirmFinish':
                return this.getSettlementComp();
            case 'TPMcnOrderConfirmCancel':
                return this.getunSettlementComp();

            default:
                return null;
        }
    }

    getReceiptComp = () => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form {...formItemLayout}>
                <FormItem label={'回执链接'} >
                    {getFieldDecorator('contentUrl', 
                    { 
                        rules: [
                            {
                                required: true,
                                message: '请输入回执链接',
                            }
                        ],
                    })(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
            </Form>
        )
    }

    getPassComp = () => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form {...formItemLayout}>
                <FormItem label={'请添加发文日期'} >
                    {getFieldDecorator('publishedTime', 
                    { 
                        rules: [
                            {
                                required: true,
                                message: '请选择发文日期',
                            }
                        ],
                    })(
                        <DatePicker showTime placeholder="请选择发文日期" />
                    )}
                </FormItem>
            </Form>
        )
    }

    getQualifiedComp = () => {
        const { form, data } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form {...formItemLayout}>
                <FormItem label={'发布时间'} >
                    {getFieldDecorator('publishedTime', 
                    { 
                        rules: [
                            {
                                required: true,
                                message: '请选择发布时间',
                            }
                        ],
                    })(
                        <DatePicker showTime placeholder="请选择发布时间" />
                    )}
                </FormItem>
                 <FormItem label={'此刻阅读数'} >
                    {getFieldDecorator('readNumber', 
                    { 
                        rules: [
                            {
                                required: true,
                                message: '请输入此刻阅读数',
                            }
                        ],
                    })(
                        <Input placeholder="请输入此刻阅读数"/>
                    )}
                </FormItem>
                <FormItem label="截图">
                    {getFieldDecorator('snapshotUrl', {
                        valuePropName: 'fileList',
                        getValueFromEvent: e => e && e.fileList,
                        rules: [
                            { message: '请上传截图', required: true, type: "array" }
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
                            tipContent=''
                        />
                    )}
                    </FormItem>
            </Form>
        )
    }

    getUnqualifiedComp = () => {
        const { form, data } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form {...formItemLayout}>
                 <FormItem label={'选择原因'} >
                    {getFieldDecorator('approveReason')(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
                <FormItem label={'备注'} >
                    {getFieldDecorator('remark')(
                        <TextArea
                            autoSize={{
                                minRows: 3,
                                maxRows: 3
                            }}
                        />
                    )}
                </FormItem>
                <FormItem label="截图">
                    {getFieldDecorator('snapshotUrl', {
                        valuePropName: 'fileList',
                        getValueFromEvent: e => e && e.fileList,
                        rules: [
                        { message: '请上传截图', required: true, type: "array" }
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
                            tipContent=''
                        />
                    )}
                </FormItem>
            </Form>
        )
    }

    getSettlementComp = () => {
        const { settlementAmount = 0 } = this.props;
        return (
            <div>
                <span>本次任务执行将成功生成</span>
                <span style={{color: 'red'}}>{numeral(settlementAmount).format('0.00')}</span>
                <span>元的结算单，是否确定？</span>
            </div>
        )
    }

    getunSettlementComp = () => {
        const { form, data } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form {...formItemLayout}>
                <FormItem label={'填写理由'} >
                    {getFieldDecorator('orderRemark', 
                    { 
                        rules: [
                            {
                                required: true,
                                message: '请填写理由',
                            }
                        ],
                    })(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
                <FormItem label="上传附件/截图">
                    {getFieldDecorator('snapshotUrl', {
                        valuePropName: 'fileList',
                        getValueFromEvent: e => e && e.fileList,
                        rules: [
                            { message: '请上传附件/截图', required: true, type: "array" }
                        ]
                    })(
                        <OssUpload
                            authToken={data.authToken}
                            listType='picture-card'
                            rule={{
                                max: 50,
                            }}
                            len={1}
                            tipContent=''
                        />
                    )}
                </FormItem>
            </Form>
        ) 
    }

    handleOk = () => {
        const { form, handleOk } = this.props;
        form.validateFields((errs, values) => {
            if(errs) return;

            const { publishedTime, snapshotUrl } = values;
            if(publishedTime) {
                values.publishedTime = moment(publishedTime).format('YYYY-MM-DD HH:mm:ss')
            }
            if(snapshotUrl) {
                values.snapshotUrl = snapshotUrl[0].url
            }
            handleOk(values);
        })
    }

    render() {
        const { visible, type, title, handleCancel } = this.props;
        return (
            <Modal
                title={title}
                visible={visible}
                destroyOnClose
                onCancel={handleCancel}
                onOk={this.handleOk}
            >
                {this.getModalContent(type)}
            </Modal>
        )
    }
}

export default Form.create()(TaskModal)