import { Table, Descriptions, Button, Rate, Form } from 'antd';
import React, { Component } from 'react';
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

    this.state = {
      dataSource: [],
      count: 2,
      data: {},
      submitContent: {}
    };
  }
  componentDidMount = async () => {
    const { data } = await this.props.actions.getAccountEstimateDetails({ accountId: this.props.accountId })
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
    this.props.actions.accountEstimateSubmit({ estimateitems: this.state.dataSource })
    this.props.actions.getAccountEstimateDetails({ accountId: this.props.accountId })
  }
  render() {
    const { dataSource, } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const { accountId, actions, accountEstimateDetails = {} } = this.props
    const { estimateState } = accountEstimateDetails
    //账号评语提交
    async function updateAccountEstimateDescribeAsync(param) {
      await actions.updateAccountEstimateDescribe(param)
    }
    let columns = [
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
        disabled: estimateState == 2
      },
    ];
    columns = columns.map(col => {
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
          rowKey='dicItemId'
        />
        {estimateState == 1 ? <div className='button-footer'>
          <Button onClick={() => window.open('/order/task/account-manage', "_self")}>返回</Button>
          <Button type='primary' onClick={this.submitForm}>提交</Button>
        </div> : null}
        {estimateState == 2 ? <AccountCommentsForm
          updateAccountEstimateDescribeAsync={updateAccountEstimateDescribeAsync}
          accountId={accountId} data={accountEstimateDetails}
        /> : null}
      </div>
    );
  }
}

export default ContentEvaluation
const AccountComments = (props) => {
  const { data = {}, form, accountId, } = props

  function submitForm(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        props.updateAccountEstimateDescribeAsync({ accountId: accountId })
      }
    })
  }
  return <Form layout='horizontal'>
    <Descriptions title="账号等级及评语">
      <Descriptions.Item label="账号等级">{data.estimateGrade}</Descriptions.Item>
      <Descriptions.Item label="内容评估（总分30）">{data.contentEstimateTotalScore}</Descriptions.Item>
      <Descriptions.Item label="效果评估（总分10）">{data.effectEstimateScore}</Descriptions.Item>
    </Descriptions>
    <Form.Item label='账号评语'>
      {form.getFieldDecorator(`estimateDescribe`, {
        initialValue: 'estimateDescribe',
        rules: [
          { max: 100, message: '不超过100个字' },
          { required: true, message: '请填写账号评语' }
        ],
      })(
        <TextArea rows={4} placeholder='请填写账号评语，不超过100个字' disabled={data.estimateDescribe} />
      )}
    </Form.Item>
    <div className='button-footer'>
      <Button onClick={() => window.open('/order/task/account-manage', "_self")}>返回</Button>
      <Button type='primary' onClick={submitForm} disabled={data.estimateDescribe}>提交</Button>
    </div>
  </Form>
}
const AccountCommentsForm = Form.create()(AccountComments)
