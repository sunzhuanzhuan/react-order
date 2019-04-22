import React from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class BasicInfo extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  componentDidMount() {
    const { search } = this.props;
    this.props.queryData(1, { company_id: search.company_id });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { data: { company_name, real_name, project = [] } } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return <Form className='spotplan-add-form'>
      <FormItem label='公司简称' {...formItemLayout}>{company_name}</FormItem>
      <FormItem label='所属销售' {...formItemLayout}>{real_name}</FormItem>
      <FormItem label='所属项目' {...formItemLayout}>
        {getFieldDecorator('project_id', {
          rules: [{ required: true, message: '请勾选要添加的权限' }]
        })(
          <Select style={{ width: 200 }}
            placeholder='请选择'
            getPopupContainer={() => document.querySelector('.spotplan-add-form')}
            allowClear
            showSearch
            filterOption={(input, option) => (
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            )}
          >
            {project.map(item => (<Option value={item.project_id} key={item.project_id}>{item.project_name}</Option>))}
          </Select>
        )}
      </FormItem>
      <FormItem label='Spotplan名称' {...formItemLayout}>
        {getFieldDecorator('spotplan_name', {
          initialValue: '【Spotplan】年-月-日-时-分',
          rules: [
            { required: true, message: 'Spotplan名称不能为空' },
            { max: 50, message: 'Spotplan名称不能超过50个字' }]
        })(
          <Input style={{ width: 200 }} />
        )}
        <div className='tip-style' > 为方便日后调用 / 查询，可以重新命名</div>
      </FormItem>
      <FormItem label='备注信息' {...formItemLayout}>
        {getFieldDecorator('content', {
          rules: [
            { max: 100, message: '备注信息不能超过100个字 ' }
          ]
        })(
          <TextArea autosize={{ minRows: 4, maxRows: 6 }} style={{ width: 400 }} />
        )}
        <div className='tip-style' >请输入备注信息，不要超过100个字</div>
      </FormItem>
    </Form>
  }
}

export default Form.create()(BasicInfo)
// const mapStateToProps = (state) => {
//   return {
//     spotplanCompanyInfo: state.spotplanReducers.spotplanCompanyInfo,
//   }
// }
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({ ...spotplanAction }, dispatch)
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(BasicInfo))
