import React from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Popconfirm,
  message
} from 'antd';
import {
  platformToCooperUrl,
  platformToCooperBrand,
  platformToCooperContent
} from '../constants/placeholder';

const FormItem = Form.Item;
const { TextArea } = Input;


export class CooperateInfo extends React.Component {
  constructor(context, props) {
    super(context, props);
    this.state = {
      textCount: 0,
      visibleForCard: false,
      coExampleCards: [],
      disableForButton: false,
      randomKey: 1,
      accountId: 0
    };
  }

  /**
   *
   * 处理ajax中数据，新增Title字段，brandLen，resultLen字段
   */
  handleCardsData = (cooperation_case) => {
    let [...data] = cooperation_case;
    if (data.length > 0) {
      data.map((item, index) => {
        item.title = `案例${index + 1}`;
        item.brandLen = item.brand && item.brand.length;
        item.resultLen = item.content && item.content.length;
      });
    }
    this.setState({
      coExampleCards: data,
      disableForButton: data.length >= 5
    });
  };

  handleChangeForcoNotes = (e) => {
    let target = e.target.value;
    let len = target.length;

    this.setState({
      textCount: len
    });
  };

  handleCardVisible = () => {
    let cardSource = this.state.coExampleCards || [];
    let cardsLen = cardSource.filter(({ isDeleted }) => !isDeleted).length;
    if (cardsLen >= 5) {
      this.setState({
        disableForButton: true
      }, () => {
        this.forceUpdate();
      });
    } else {
      cardSource.push({
        'tempId': Math.random() + 'ss',
        'brandLen': 0,
        'resultLen': 0
      });
    }
    this.setState({
      visibleForCard: true,
      coExampleCards: cardSource
    });
  };

  handleClickForDel = (index) => {
    let [...cardSource] = this.state.coExampleCards;
    cardSource[index]['isDeleted'] = true;
    this.setState({
      coExampleCards: cardSource,
      disableForButton: cardSource.filter(({ isDeleted }) => !isDeleted).length >= 5
    });

  };

  handleChangeForBrandAndResult = (e, index, type) => {
    let stringLen = e.target.value.length;
    let [...cardSource] = this.state.coExampleCards;
    cardSource.map((item, innerIndex) => {
      if (type == 1) {
        //处理品牌的字符变化
        if (index == innerIndex) {
          item.brandLen = stringLen;
        }
      } else {
        //处理合作效果
        if (index == innerIndex) {
          item.resultLen = stringLen;
        }
      }
    });
    this.setState({
      coExampleCards: cardSource
    });
  };

  validateTextLen = (rule, value, callback, type) => {
    let length = value && value.length;
    if (type == 'brand') {
      //处理品牌的长度
      if (length > 20) {
        callback('品牌不能超过20字');
      } else {
        this.handleBlurForSensitive(rule, value, callback);
      }
    } else {
      //处理合作效果的
      if (length > 1000) {
        callback('账号简介不能超过1000字');
      } else {
        this.handleBlurForSensitive(rule, value, callback);
      }
    }
  };

  handleBlurForSensitive = (rule, value, callback) => {
    const { sensitiveWordsFilter } = this.props.actions;
    let param = {};
    param.string = value;
    sensitiveWordsFilter(param).then(result => {
      if (result.code != 200) {
        message.destroy()
        message.error('查询敏感词接口出错，请重试！');
      } else {
        let is_sensitive_words = result.data && result.data.is_sensitive_words;
        if (is_sensitive_words == 1) {
          return callback('有敏感词，请重新填写');
        } else {
          callback();

        }
      }
    });
  };

  validatTipsLen = (rule, value, callback) => {
    let length = value && value.length;
    if (length > 1000) {
      callback('合作须知不能超过1000字');
    } else {
      callback();
    }
  };

  componentWillMount() {
    let nextProps = this.props;
    if (nextProps.data.accountInfo.cooperationCases && nextProps.data.accountInfo.cooperationCases.length > 0) {
      this.handleCardsData(nextProps.data.accountInfo.cooperationCases);
    }
    if (nextProps.data.accountInfo.cooperationTips) {
      let len = nextProps.data.accountInfo.cooperationTips.length;
      this.setState({
        textCount: len
      });
    }
    if (nextProps.data.accountInfo.accountId) {
      this.setState({
        accountId: nextProps.data.accountInfo.accountId
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('data' in nextProps && nextProps.data && nextProps.data.accountInfo) {
      if (this.state.randomKey == 1) {
        if (nextProps.data.accountInfo.cooperationCases && nextProps.data.accountInfo.cooperationCases.length > 0) {
          this.handleCardsData(nextProps.data.accountInfo.cooperationCases);
        }
        if (nextProps.data.accountInfo.cooperationTips) {
          let len = nextProps.data.accountInfo.cooperationTips.length;
          this.setState({
            textCount: len
          });
        }
        if (nextProps.data.accountInfo.accountId) {
          this.setState({
            accountId: nextProps.data.accountInfo.accountId
          });
        }
      }
      this.setState({
        randomKey: Math.random()
      });
    }
  }

  render() {
    const {
      getFieldDecorator,
      formItemLayout, data, pid
    } = this.props;
    const { accountInfo } = data;
    let { cooperationTips, accountId } = accountInfo;
    let { textCount, coExampleCards } = this.state;
    let disableForButton = coExampleCards.filter(item => !item.isDeleted).length >= 5;
    const descForUrl = platformToCooperUrl[pid] || '';
    const descForBrand = platformToCooperBrand[pid] || '';
    const descForContent = platformToCooperContent[pid] || '';
    let titleFlag = 0;
    const coExampleCardNode = coExampleCards && coExampleCards.length > 0 ?
      <div>
        {coExampleCards.map((item, index) => {
          !item.isDeleted && (titleFlag += 1);
          return item.isDeleted ? <div key={index} style={{ display: 'none' }}>
              {getFieldDecorator(`cooperationCases[${index}]cooperationCaseId`, {
                initialValue: item.cooperationCaseId
              })(<input type="hidden" />)}
              {getFieldDecorator(`cooperationCases[${index}]isDeleted`, {
                initialValue: item.isDeleted
              })(<input type="hidden" />)}
              {getFieldDecorator(`cooperationCases[${index}]brand`, {
                initialValue: item.brand
              })(<input type="hidden" />)}
              {getFieldDecorator(`cooperationCases[${index}]link`, {
                initialValue: item.link
              })(<input type="hidden" />)}
              {getFieldDecorator(`cooperationCases[${index}]content`, {
                initialValue: item.content
              })(<input type="hidden" />)}
            </div>
            : <Card key={index} type="inner" title={'案例' + titleFlag} extra={
              <Popconfirm placement="topRight" title={'确定删除此项吗?'} onConfirm={() => this.handleClickForDel(index)}>
                <a>删除</a>
              </Popconfirm>} value={1} style={{ margin: '5px 0' }}>
              {getFieldDecorator(`cooperationCases[${index}]cooperationCaseId`, {
                initialValue: item.cooperationCaseId
              })(
                <input type="hidden" />
              )}
              {getFieldDecorator(`cooperationCases[${index}]isDeleted`, {
                initialValue: item.isDeleted
              })(
                <input type="hidden" />
              )}
              <FormItem {...formItemLayout} label="合作品牌"
              >
                {getFieldDecorator(`cooperationCases[${index}]brand`, {
                  validateTrigger: ['onBlur'],
                  rules: [{ required: true, message: '品牌不能为空' }, {
                    validator: (rule, value, callback) => this.validateTextLen(rule, value, callback, 'brand')
                  }],
                  initialValue: item.brand
                })(
                  <TextArea style={{ width: '80%' }} onChange={(e) => this.handleChangeForBrandAndResult(e, index, 1)} placeholder={descForBrand} />
                )}
                <span style={{
                  position: 'absolute',
                  top: '-9px',
                  right: '20px'
                }}>{item.brandLen}/20</span>
              </FormItem>
              <FormItem {...formItemLayout} label="案例链接">
                {getFieldDecorator(`cooperationCases[${index}]link`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{ required: true, message: 'URL不能为空' }, {
                    pattern: /^htt(p|ps):\/\//,
                    message: 'URL格式不正确，请填写前缀为“http://或https://”的URL'
                  }],
                  initialValue: item.link
                })(
                  <Input style={{ width: '80%' }} placeholder={descForUrl} />
                )}
              </FormItem>
              <FormItem  {...formItemLayout} label="合作效果">
                {getFieldDecorator(`cooperationCases[${index}]content`, {
                  validateTrigger: ['onBlur'],
                  rules: [{ required: true, message: '合作效果不能为空' }, {
                    validator: (rule, value, callback) => this.validateTextLen(rule, value, callback, 'result')
                  }],
                  initialValue: item.content
                })(
                  <TextArea style={{ width: '80%' }} onChange={(e) => this.handleChangeForBrandAndResult(e, index, 2)} placeholder={descForContent} autosize={{
                    minRows: 3,
                    maxRows: 6
                  }} />
                )}
                <span style={{
                  position: 'absolute',
                  top: '-9px',
                  right: '20px'
                }}>{item.resultLen}/1000</span>
              </FormItem>
            </Card>;
        })}
      </div> : null;
    return <div>
      {getFieldDecorator('id', {
        initialValue: accountId
      })(
        <input type="hidden" />
      )}
      {/*{getFieldDecorator('base.userId', {
				initialValue: userId
			})(
				<input type="hidden" />
			)}*/}
      <FormItem {...formItemLayout}
        label='合作须知:'
      >
        {getFieldDecorator('extend.cooperationTips', {
          validateTrigger: ['onBlur'],
          rules: [{ required: false }, {
            validator: this.validatTipsLen
          }, {
            validator: this.handleBlurForSensitive
          }],
          initialValue: cooperationTips
        })(
          <TextArea placeholder="从发/接广告的禁忌点出发填写，将直接展示给广告主！ 举例：1. 不接电视直销类品牌； 2.只接受公益性质的微博合作 ；3. 只要品牌不受争议，合作形式都ok  4.对合作时间的要求，举例：a.需要在发布前提前15天预约；b.微信撰稿时间/视频创作时间最短为7天"
            autosize={{
              minRows: 3,
              maxRows: 6
            }} style={{ width: '70%' }} onChange={this.handleChangeForcoNotes} />
        )}
        <span style={{
          position: 'absolute',
          top: '-9px',
          right: '20px'
        }}><span style={{ color: (textCount > 1000) ? 'red' : 'black' }}>{textCount}</span>/1000</span>
      </FormItem>
      <FormItem {...formItemLayout} label='合作案例:'>
        <div>{coExampleCardNode}</div>
        <Button icon="plus" onClick={this.handleCardVisible} disabled={disableForButton}>添加案例</Button>
      </FormItem>
    </div>;
  }
}



