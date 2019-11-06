import React, {PureComponent} from 'react';
import { Form, Modal, Input, DatePicker } from 'antd';
import numeral from 'numeral'

const FormItem = Form.Item;
const { Textarea } = Input;

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
            case 'editReceipt':
                return this.getReceiptComp();
            case 'pass':
                return this.getPassComp();
            case 'qualified':
                return this.getQualifiedComp();
            case 'unqualified':
                return this.getUnqualifiedComp();
            case 'settlement':
                return this.getSettlementComp();
            case 'unSettlement':
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
            <Form>
                <FormItem label={'回执链接'} {...formItemLayout} >
                    {getFieldDecorator('回执链接', 
                    { 
                        initialValue: '',
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
            <Form>
                <FormItem label={'请添加发文日期'} {...formItemLayout} >
                    {getFieldDecorator('请添加发文日期', 
                    { 
                        initialValue: '',
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
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form>
                <FormItem label={'发布时间'} {...formItemLayout} >
                    {getFieldDecorator('发布时间', 
                    { 
                        initialValue: '',
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
                 <FormItem label={'此刻阅读数'} {...formItemLayout} >
                    {getFieldDecorator('此刻阅读数', 
                    { 
                        initialValue: '',
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
                <FormItem label={'截图'} {...formItemLayout} >
                    {getFieldDecorator('截图', 
                    { 
                        initialValue: '',
                        rules: [
                            {
                                required: true,
                                message: '请上传截图',
                            }
                        ],
                    })(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
            </Form>
        )
    }

    getUnqualifiedComp = () => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form>
                 <FormItem label={'选择原因'} {...formItemLayout} >
                    {getFieldDecorator('选择原因', 
                    { 
                        initialValue: ''
                    })(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
                <FormItem label={'备注'} {...formItemLayout} >
                    {getFieldDecorator('备注', 
                    { 
                        initialValue: '',
                    })(
                        <Textarea />
                    )}
                </FormItem>
                <FormItem label={'截图'} {...formItemLayout} >
                    {getFieldDecorator('截图', 
                    { 
                        initialValue: '',
                        rules: [
                            {
                                required: true,
                                message: '请上传截图',
                            }
                        ],
                    })(
                        <Input placeholder="请输入"/>
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
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
        };
        
        return (
            <Form>
                <FormItem label={'填写理由'} {...formItemLayout} >
                    {getFieldDecorator('填写理由', 
                    { 
                        initialValue: '',
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
                <FormItem label={'上传附件/截图'} {...formItemLayout} >
                    {getFieldDecorator('上传附件/截图', 
                    { 
                        initialValue: '',
                    })(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
            </Form>
        ) 
    }

    handleOk = () => {
        const { form, handleCancel } = this.props;
        form.validateFields((errs, values) => {
            // if(errs) return null;
            handleCancel();
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