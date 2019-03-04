import React from 'react';
import { message, Button, Form } from 'antd';
import { parseUrlQuery } from '@/util/parseUrl';
import './WrapPanel.less';

class PanelHeader extends React.PureComponent {
  render() {
    const { header, onSave, left = '', right = '', isLoading } = this.props;
    return (
      <div className='wrap-panel-header'>
        <div className='wrap-panel-header-content'>
          <div className='wrap-panel-header-text'>{header}</div>
          {left ? <div className='wrap-panel-header-left'>{left}</div> : null}
          <em className="wrap-panel-header-line" />
          <div className='wrap-panel-header-right'>
            {right}
            <Button loading={isLoading} size='small' type='primary' onClick={onSave}>{'保存'}</Button>
          </div>
        </div>
      </div>
    );
  }
}

class WrapPanelForm extends React.Component {
  state = {
    isLoading: false
  };
  edit = () => {
    this.setState({ isLoading: true });
  };
  save = () => {
    const { form, onSave = (v => v), action, refreshAction: refresh } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        let id = parseUrlQuery()['account_id'];
        action({ ...onSave(values), id }).then(() => {
          if (refresh) {
            setTimeout(() => {
              refresh({accountId: id}).then(() => {
                this.setState({ bodyLoading: true });
                message.success('更新账号成功');
                this.setState({ isLoading: false, bodyLoading: false });
              })
            },1000);
          }else {
            message.success('更新账号成功');
            this.setState({ isLoading: false });
          }
        }).catch(() => {
          this.setState({ isLoading: false });
        });
      }
    });
  };
  reset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({ isLoading: false });
  };

  allSubmit = () => {
    const { onSave } = this.props;

    return new Promise((resolve, reject) => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // 处理value
          // window.allSubmit.data[navId] =
          resolve({ ...onSave(values) });
        } else {
          reject();
        }
      });
    });
  };

  componentWillMount() {
    const { navId } = this.props;
    window.updateForms[navId] = this.props.form;
    window.allSubmit.store[navId] = this.allSubmit;
  }

  render() {
    const { isLoading, bodyLoading } = this.state;
    const { header = '', form, navId = '', refresh } = this.props;
    return <div className={'wrap-panel' + (navId ? ' J-scroll-follow-nav' : '')} id={navId}>
      <PanelHeader
        header={header}
        isLoading={isLoading}
        onSave={this.save}
        onEdit={this.edit}
        onReset={this.reset}
      />
      {refresh && bodyLoading ? null : <div className='wrap-panel-body'>
        <Form>
          {
            React.Children.map(this.props.children, child => React.cloneElement(child, { ...form }))
          }
        </Form>
      </div>}
    </div>;
  }
}


export default Form.create()(WrapPanelForm);
