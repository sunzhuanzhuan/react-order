import React from 'react';
import { Form, Input, Select } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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
    const date = moment(new Date()).format('YYYY-MM-DD-HH-mm').toString();
    const str = date.split('-').reduce((str, current, index) => {
      const timeMap = ['年', '月', '日', '时', '分'];
      return str + current + timeMap[index]
    }, '【Spotplan】')

    return <Form className='spotplan-add-form'>
      <FormItem label='公司简称' {...formItemLayout}>{company_name}</FormItem>
      <FormItem label='所属销售' {...formItemLayout}>{real_name}</FormItem>
      <FormItem label='所属项目' {...formItemLayout}>
        {getFieldDecorator('project_id', {
          rules: [{ required: true, message: '请选择所属项目' }]
        })(
          <Select style={{ width: 260 }}
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
          initialValue: str,
          rules: [
            { required: true, message: 'Spotplan名称不能为空' },
            { max: 100, message: 'Spotplan名称不能超过100个字' }]
        })(
          <Input style={{ width: 260 }} />
        )}
        <div className='tip-style' > 为方便日后调用 / 查询，可以重新命名</div>
      </FormItem>
      <FormItem label='备注信息' {...formItemLayout}>
        {getFieldDecorator('content', {
          rules: [
            { max: 200, message: '备注信息不能超过200个字 ' }
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
