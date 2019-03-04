import React from 'react';
import WBYUploadFile from '@/accountManage/base/NewUpload';
import { Form, Select, Input, Checkbox, Popover, Radio } from 'antd';
import SimpleTag from '../base/SimpleTag';
import moment from 'moment';
import { platformToDesc } from '../constants/placeholder';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

const checkForSensitiveWord = action => (rule, value, callback) => {
  action({ string: value }).then(result => {
    let is_sensitive_words = result.data && result.data.is_sensitive_words;
    if (is_sensitive_words == 1) {
      callback('账号简介有敏感词，请重新填写');
    } else {
      callback();
    }
  });
};

/**
 * 二维码
 */
export const QCCodeUpload = (props) => {
  const { getFieldDecorator, formItemLayout, data: { accountInfo }, actions } = props;
  const {
    qrCodeUrl,
    qrCodeUrlFrom,
    qrCodeUrlMaintainedTime
  } = accountInfo;
  return <div>
    <FormItem {...formItemLayout} label='二维码'>
      <div className='clearfix'>
        {getFieldDecorator('base.qrCodeUrl', {
          initialValue: qrCodeUrl ? [{
            name: qrCodeUrl,
            url: qrCodeUrl,
            filepath: qrCodeUrl
          }] : [],
          rules: [{ required: true, message: '二维码不能为空' }]
        })(
          <WBYUploadFile tok={actions.getNewToken} accept={'.bmp, .gif, image/jpeg'} uploadUrl='/api/common-file/file/v1/uploadPubBucket' uploadText={'点击上传'} size={5} showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: !(qrCodeUrlFrom == 2)
          }} disabled={qrCodeUrlFrom == 2} />
        )}
      </div>
      <p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
    </FormItem>
    {/* 隐藏域提交 */}
    {getFieldDecorator('base.qrCodeUrlFrom', { initialValue: qrCodeUrlFrom })(
      <input type="hidden" />)}
    {getFieldDecorator('base.qrCodeUrlMaintainedTime', { initialValue: qrCodeUrlMaintainedTime })(
      <input type="hidden" />)}
  </div>;
};

/**
 * 账号类型(入库用)
 */
export const AccountType = (props) => {
  const { getFieldDecorator, formItemLayout, halfWrapCol, data: { accountInfo } } = props;
  const {
    mediaType = 0
  } = accountInfo;
  return <FormItem {...formItemLayout} wrapperCol={halfWrapCol} label='账号类型'>
    {getFieldDecorator('base.mediaType', {
      initialValue: mediaType || 3
      // rules: [{ required: true, message: '账号类型必须选择' }]
    })(
      <Select style={{ width: '100%' }}>
        <Option value={3}>未知</Option>
        <Option value={1}>草根</Option>
        <Option value={2}>名人</Option>
        <Option value={4}>媒体</Option>
        <Option value={5}>个人</Option>
      </Select>
    )}
  </FormItem>;
};

/**
 * 利润等级
 */
export const ProfitLevel = (props) => {
  const { getFieldDecorator, formItemLayout, halfWrapCol, data: { priceInfo } } = props;
  const {
    profitGradeId
  } = priceInfo;
  return <FormItem {...formItemLayout} wrapperCol={halfWrapCol} label='利润等级'>
    {getFieldDecorator('profitGradeId', {
      initialValue: profitGradeId || 1,
      rules: [{ required: true, message: '' }]
    })(
      <Select style={{ width: '100%' }}>
        <Option value={1}>未知</Option>
      </Select>
    )}
  </FormItem>;
};

/**
 * 账号简介
 */
export const AccountDesc = (props) => {
  const { getFieldDecorator, formItemLayout, data: { accountInfo }, actions: { sensitiveWordsFilter }, pid } = props;
  const {
    introduction = '',
    platformId
  } = accountInfo;
  const desc = platformToDesc[platformId || pid] || '';
  return <FormItem {...formItemLayout} label='账号简介'>
    {getFieldDecorator('base.introduction', {
      initialValue: introduction,
      first: true,
      validateTrigger: 'onBlur',
      rules: [{
        max: 1000,
        message: '账号简介不能超过1000字'
      }, { validator: checkForSensitiveWord(sensitiveWordsFilter) }]
    })(
      <TextArea placeholder={desc} autosize={{ minRows: 2, maxRows: 4 }} />
    )}
  </FormItem>;
};

/**
 * 内容分类
 */
export const ContentCategory = (props) => {
  const { formItemLayout = {}, data: { accountInfo } } = props;
  let {
    classificationList: category = []
  } = accountInfo;
  return <FormItem {...formItemLayout} label='内容分类'>
    {category.length ? <div>{category.map(({ name }) =>
      <SimpleTag key={name}>{name}</SimpleTag>)}</div> : '暂无分类'}
  </FormItem>;
};

/**
 * 微博报价特有项(参考报价)
 */
export const ReferencePrice = (props) => {
  const { formItemLayout = {}, data: { accountInfo } } = props;
  const {
    priceMicroTaskTweet,
    priceMicroTaskRetweet,
    priceWeiqTweet,
    priceWeiqRetweet,
    weitaskFetchedTime
  } = accountInfo;
  return <div>
    <FormItem {...formItemLayout} label='参考报价'>
      <div className='sina-reference-table'>
        <table>
          <tbody>
          <tr>
            <th>微任务原发价</th>
            <td>{priceMicroTaskTweet || '--'}</td>
          </tr>
          <tr>
            <th>微任务转发价</th>
            <td>{priceMicroTaskRetweet || '--'}</td>
          </tr>
          <tr>
            <th>WEIQ原发价</th>
            <td>{priceWeiqTweet || '--'}</td>
          </tr>
          <tr>
            <th>WEIQ转发价</th>
            <td>{priceWeiqRetweet || '--'}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <p className='input-desc-bottom'>微任务,
        WEIQ价格更新时间: <span>{weitaskFetchedTime ? moment(weitaskFetchedTime).format('YYYY-MM-DD') : '--'}</span>
      </p>
    </FormItem>
  </div>;
};

/**
 * 微博报价特有项(报价包含)
 */
export const PriceInclude = (props) => {
  const { getFieldDecorator, formItemLayout = {}, data: { priceInfo } } = props;
  const {
    isSupportTopicAndLink,
    isPreventShielding
  } = priceInfo;
  return <div>
    <FormItem {...formItemLayout} label='报价包含'>
      {getFieldDecorator('isPreventShielding', {
        valuePropName: 'checked',
        initialValue: isPreventShielding == 1
      })(
        <Checkbox>防屏蔽（博主可自行下微任务/接WEIQ订单）</Checkbox>)}
    </FormItem>
    <FormItem style={{ top: '-16px' }}  {...formItemLayout} label=' ' colon={false}>
      {getFieldDecorator('isSupportTopicAndLink', {
        valuePropName: 'checked',
        initialValue: isSupportTopicAndLink == 1
      })(
        <Checkbox>话题/@/链接 </Checkbox>)}
    </FormItem>
  </div>;
};

/**
 * 账号报价帮助信息
 */
export const AccountPriceHelp = () => {
  const content = <div className='account-price-help-tips'>
    <img src={require('../images/help.jpg')} />
  </div>;
  return <div>
    <Popover getPopupContainer={() => document.querySelector('.price_scroll_container') || document.querySelector('#account-manage-container')} placement="topLeft" title={null} content={content} trigger="click">
      <a>查看订单成本, 收入计算规则</a>
    </Popover>
  </div>;
};

/**
 * 账号ID
 */
export const AccountID = (props) => {
  const { data: { accountInfo } } = props;
  const id = accountInfo['accountId'] || '-';
  const { formItemLayout = {} } = props;
  return <FormItem {...formItemLayout} label='account_id'>
    {id}
  </FormItem>;
};

/**
 * 是否微闪投账号
 */
export const AccountIsNameless = (props) => {
  const { getFieldDecorator, formItemLayout = {}, data: { accountInfo } } = props;
  const {
    microFlashPost = 0,
    isFamous
  } = accountInfo;
  const style = isFamous == 1 ? { display: 'none' } : {};
  return <FormItem style={style} {...formItemLayout} label='是否微闪投账号'>
    {getFieldDecorator('extend.microFlashPost', {
      initialValue: isFamous == 1 ? 2 : (microFlashPost || 2)
    })(
      <RadioGroup>
        <Radio value={2}>否</Radio>
        <Radio value={1}>是</Radio>
      </RadioGroup>
    )}
  </FormItem>;
};

/**
 * 可在A端展示
 */
export const DisplayForA = (props) => {
  const { getFieldDecorator, formItemLayout = {}, data: { accountInfo } } = props;
  const {
    isOpen = 1
  } = accountInfo;
  return <FormItem {...formItemLayout} label=' ' colon={false}>
    {getFieldDecorator('extend.isOpen', {
      valuePropName: 'checked',
      initialValue: isOpen == 1
    })(
      <Checkbox>可在A端展示</Checkbox>)}
  </FormItem>;
};
/**
 * 可接单(入库)
 */
export const Orderable = (props) => {
  const { getFieldDecorator, formItemLayout = {}, data: { accountInfo } } = props;
  const {
    isAllowOrderStatus = 1
  } = accountInfo;
  return <FormItem {...formItemLayout} label='是否可接单'>
    {getFieldDecorator('skuList.isAllowOrderStatus', {
      initialValue: isAllowOrderStatus || 1
    })(
      <RadioGroup>
        <Radio value={1}>是</Radio>
        <Radio value={2}>否</Radio>
      </RadioGroup>
    )}
  </FormItem>;
};
/**
 * 接单策略
 * */
export const OrderStrategy = (props) => {
  const { getFieldDecorator, getFieldValue, formItemLayout = {}, halfWrapCol, data: { priceInfo } } = props;
  const {
    isAcceptHardAd,
    isAcceptHardAdDescription
  } = priceInfo;
  let style = {};
  let show = false;
  if (getFieldValue('isAcceptHardAd') === undefined) {
    style = (isAcceptHardAd == 1) ? { display: 'block' } : { display: 'none' };
    show = isAcceptHardAd == 1;
  } else {
    style = (getFieldValue('isAcceptHardAd')) ? { display: 'block' } : { display: 'none' };
    show = getFieldValue('isAcceptHardAd');
  }
  return <div>
    <FormItem label="接硬广"  {...formItemLayout} >
      {getFieldDecorator('isAcceptHardAd', {
        rules: [{ required: false }],
        valuePropName: 'checked',
        initialValue: isAcceptHardAd == 1
      })(
        <Checkbox>接硬广</Checkbox>
      )}
    </FormItem>
    {show ? <FormItem style={style} label="备注" {...formItemLayout} wrapperCol={halfWrapCol}>
      {getFieldDecorator('isAcceptHardAdDescription', {
        rules: [{ max: 1000, message: '备注不能超过1000字' }],
        initialValue: isAcceptHardAdDescription
      })(
        <TextArea />
      )}
    </FormItem> : null}
  </div>;
};
