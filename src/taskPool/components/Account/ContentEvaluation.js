import { Table, Descriptions, Button, Rate, Form } from 'antd';
import React, { Component } from 'react';
import api from '@/api'
import account from '../../constants/accountInterface'
import TextArea from 'antd/lib/input/TextArea';
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

  save = e => {
    const { record, handleSave } = this.props;
    setTimeout(() => {
      this.form.validateFields((error, values) => {
        if (error) {
          return;
        }

        handleSave({ ...record, ...values });
      });
    }, 0);
  };

  renderCell = form => {
    this.form = form;
    const { dataIndex, record, title, disabled } = this.props;
    return (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Rate disabled={disabled} allowHalf ref={node => (this.input = node)}
          onChange={this.save} />)}
      </Form.Item>
    )
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}

class ContentEvaluation extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'age',
        align: 'center',
        render: (text, record, index) => index + 1
      },
      {
        title: '调查项',
        dataIndex: 'itemName',
        width: '30%',
      },
      {
        title: '提示',
        dataIndex: 'itemDesc',
      },
      {
        title: <div>*评分</div>,
        width: '220px',
        align: 'center',
        dataIndex: 'contentEstimateScore',
        editable: true,
        disabled: props.disabled
      },
    ];

    this.state = {
      dataSource: [],
      count: 2,
      data: {},
      submitContent: {}
    };
  }
  componentDidMount = async () => {
    const { data } = await api.post(account.accountEstimateDetails, { accountId: this.props.accountId })
    this.setState({ data: data, dataSource: data.estimateitems })
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };
  submitForm = async () => {
    const { data } = this.props.accountEstimateSubmitAsync({ estimateitems: this.state.dataSource })
    this.setState({ submitContent: data })
  }
  render() {
    const { dataSource, submitContent } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          disabled: col.disabled,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey='itemId'
        />
        <div className='button-footer'>
          <Button onClick={() => window.open('/order/task/account-manage', "_self")}>返回</Button>
          <Button type='primary' onClick={this.submitForm}>提交</Button>
        </div>
        <AccountComments />
      </div>
    );
  }
}

export default ContentEvaluation
const AccountComments = (props) => {
  const { data = {} } = props
  return <Form layout='inline'>
    <Descriptions title="账号等级及评语">
      <Descriptions.Item label="账号等级">{data.estimateGrade}</Descriptions.Item>
      <Descriptions.Item label="内容评估（总分30）">{data.contentEstimateTotalScore}</Descriptions.Item>
      <Descriptions.Item label="效果评估（总分10）">{data.effectEstimateScore}</Descriptions.Item>
    </Descriptions>
    <Form.Item label='账号评语'>
      <TextArea rows={4} />
    </Form.Item>
  </Form>
}
Form.create()(AccountComments)
