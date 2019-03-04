import React, { Component } from 'react';
import { Form, Button, message, Divider, Modal } from 'antd';
import { WrapPanel, WrapPanelForm } from '../../components';
import AffixNav from '../../components/AffixNav';
import MainAccountInfos from '../../components/MainAccountInfos';
import { scroll } from '../../components/ScrollWrap';
import AudiencePortrait from '../../components/AudiencePortrait';
import { BaseInfo } from '@/accountManage/components/BaseInfo';
import {
  AccountDesc,
  AccountID, AccountIsNameless, ContentCategory,
  OrderStrategy, PriceInclude, QCCodeUpload, ReferencePrice
} from '@/accountManage/components/Unique';
import { FamousPrice, NamelessPrice } from '@/accountManage/components/AccountPrice';
import { AccountFeature } from '@/accountManage/components/AccountFeature';
import { CooperateInfo } from '@/accountManage/components/CooperateInfo';
import { OnSaleInfo } from '@/accountManage/components/OnSaleInfo';
import { OrderTakeStrategy } from '@/accountManage/components/OrderTakeStrategy';
import { OtherInfo } from '@/accountManage/components/OtherInfo';
import { FetchInfo } from '@/accountManage/components/FetchInfo';
import { uploadUrl, checkVal } from '../../util';

const FetchHead = (<span>信息自动抓取</span>);
const confirm = Modal.confirm;
const scrollConf = {
  scrollElementSelector: '#app-content-children-id',
  targetsSelector: '.J-scroll-follow-nav',
  offset: 100
};

/**
 * 主账号信息
 */
@scroll(scrollConf)
export class AccountInfos extends Component {
  render() {
    const { auth, data: { accountInfo }, actions } = this.props.params;
    const { babysitter_host = {} } = window.bentleyConfig || {};
    const {
      babysitterHost = babysitter_host.value || 'http://toufang.weiboyi.com',
      accountId,
      modifiedAt,
      platformId
    } = accountInfo;


    let isOwner = auth['account.manage.update.change.main.account'];
    let href = isOwner ? `${babysitterHost}/user/index/type/huanma/account_id/${accountId}/weibo_type/${platformId}` : `${babysitterHost}/user/chowner/account_id/${accountId}`;

    const rightC = <div className='wrap-panel-right-content'>
      <span className='gray-text'>信息更新时间 : {(modifiedAt && modifiedAt !== '1970-01-01 08:00:00') ? modifiedAt : '--'}</span>
      <a target={'_blank'} href={href}>更换主账号</a>
    </div>;
    return <div className='account-info-container update-page'>
      <div>
        <WrapPanel header='主账号信息' navId='mainAccountInfos' right={rightC}>
          <MainAccountInfos accountInfo={accountInfo} />
        </WrapPanel>
        {React.Children.map(this.props.children, child => React.cloneElement(child, { refresh: this.props.refresh }))}
      </div>
      {this.props.sidebarData.length ?
        <AffixNav scrollNode='.account-info-container' isUpdate={true} actions={actions} current={this.props.navCurrent} dataSource={this.props.sidebarData} onToggle={this.props.toggle} /> : null}
    </div>;
  }
}

/**
 * 抓取信息表单
 */
@Form.create()
export class FetchInfoForm extends Component {
  render() {
    const { form, params, diff } = this.props;
    const { data: { accountInfo } } = params;
    const {
      fetchedTime
    } = accountInfo;
    const rightC = <div className='wrap-panel-right-content'>
      <span className='gray-text'>最近成功抓取时间 : {fetchedTime || '--'}</span>
    </div>;
    return <WrapPanel navId='getAccountInfos' right={rightC} header={FetchHead}>
      <FetchInfo {...params} {...form} defaultKeys={diff.defaultKeys} isUpdate={true} />
    </WrapPanel>;
  }
}

/**
 * 基础信息表单
 */
@Form.create()
export class BaseInfoForm extends Component {
  state = {
    submitLoading: false
  };
  handleValues = (values) => {
    const { data: { accountInfo } } = this.props.params;
    const {
      accountId,
      platformId
    } = accountInfo;
    values['id'] = accountId;
    values.base['platformId'] = platformId;
    values.base['avatarUrl'] = uploadUrl(values.base['avatarUrl']);
    values.base['qrCodeUrl'] = uploadUrl(values.base['qrCodeUrl']);
    // values.user = { userId}
    // values['upload_token'] = upload_token
    return values;
  };
  submit = (e) => {
    e.preventDefault();
    const { actions: { updateAccountBase } } = this.props.params;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          submitLoading: true
        });
        values = this.handleValues(values);
        updateAccountBase(values).then(() => {
          this.setState({
            submitLoading: false
          });
          message.success('更新账号成功');
        }).catch(() => {
          this.setState({
            submitLoading: false
          });
        });
      }
    });
  };

  allSubmit = () => {
    return new Promise((resolve, reject) => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values = this.handleValues(values);
          resolve(values);
        } else {
          reject();
        }
      });
    });

  };

  componentWillMount() {
    window.updateForms['baseInfos'] = this.props.form;
    window.allSubmit.store['baseInfos'] = this.allSubmit;
  }

  render() {
    const { form, params, diff } = this.props;
    const { data: { accountInfo } } = params;
    const { platformName, platformIcon } = accountInfo;
    const baseInfoLeft = <div className='wrap-panel-left-content'>
      <img style={{
        position: 'relative',
        top: '-3px'
      }} src={platformIcon} alt={platformName} />
      <span>{platformName}</span>
    </div>;
    const baseInfoRight = <div className='wrap-panel-left-content'>
      <Button loading={this.state.submitLoading} size='small' type='primary' onClick={this.submit}>{'保存'}</Button>
    </div>;
    return <Form>
      <WrapPanel header='基础信息' navId='baseInfos' left={baseInfoLeft} right={baseInfoRight}>
        <BaseInfo {...params} {...form} hideUniqueId={diff.hideUniqueId} hideLink={diff.hideLink}>
          {diff.qcCode ? <QCCodeUpload {...params} {...form} /> :
            <i style={{ display: 'none' }} />}
          <AccountID  {...params} {...form} />
          <Divider dashed />
          {/*<AccountType {...params} {...form} />*/}
          <AccountDesc {...params} {...form} />
          <AccountIsNameless {...params} {...form} />
          <Divider dashed />
          <ContentCategory {...params} {...form} tags={['美食', '游戏']} />
        </BaseInfo>
      </WrapPanel>
    </Form>;
  }
}

/**
 * 账号报价表单
 */
@Form.create()
export class AccountPriceForm extends Component {
  handlePrice = (skuList, price_now = {}, price_next = {}) => {
    return skuList.map(item => {
      let obj = { ...item };
      let key = obj['skuTypeId'];
      obj.costPriceRaw = price_now[key] || 0;
      obj.nextCostPriceRaw = price_next[key] || 0;
      return obj;
    });
  };
  submit = (e) => {
    e.preventDefault();
    const { data: { priceInfo, accountInfo } } = this.props.params;
    const {
      skuList
    } = priceInfo;
    const {
      accountId,
      isFamous,
      platformId
    } = accountInfo;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { price_now, price_next } = values;
        values['skuList'] = this.handlePrice(skuList, price_now, price_next);
        values['isPreventShielding'] = checkVal(values['isPreventShielding']);
        values['isSupportTopicAndLink'] = checkVal(values['isSupportTopicAndLink']);
        values['is_flowunit_off_shelf'] = checkVal(values['is_flowunit_off_shelf']);
        values['forceSaleStatus'] = checkVal(values['forceSaleStatus']);
        values['isAcceptHardAd'] = checkVal(values['isAcceptHardAd']);
        delete values['price_now'];
        delete values['price_next'];
        this.showConfirm({ ...values, id: accountId, productLineId: isFamous, platformId });
      }
    });
  };
  showConfirm = (values) => {
    const { actions: { saveSku }, data: { accountInfo } } = this.props.params;
    const { getSkuActions } = this.props;
    const { isFamous } = accountInfo;
    confirm({
      title: '提交价格信息?',
      content: (isFamous == 1) ? '提交成功后，下个价格有效期和报价将无法修改' : '',
      onOk() {
        return saveSku(values).then(() => {
          message.success('更新报价信息成功', 1.3, () => {
            getSkuActions();
          });

        });
      },
      onCancel() { }
    });
  };

  render() {
    const { form, params, diff = {} } = this.props;
    const { data: { accountInfo, priceInfo } } = params;
    const {
      isFamous
    } = accountInfo;
    const {
      skuList,
      modifiedAt
    } = priceInfo;
    const priceKeys = skuList ? skuList.map(({ skuTypeId, skuTypeName }) => ({
      key: skuTypeId, name: skuTypeName
    })) : [];

    const _isFamous = isFamous === 1;
    const rightC = <div className='wrap-panel-right-content'>
      <span className='gray-text'>信息更新时间 : {(modifiedAt && modifiedAt !== '1970-01-01 08:00:00') ? modifiedAt : '--'}</span>
      <Button size='small' type='primary' onClick={this.submit}>{'保存'}</Button>
    </div>;
    return <Form>
      <WrapPanel header='账号报价' right={rightC}>
        {_isFamous ?
          <FamousPrice {...params} {...form} priceKeys={priceKeys}>
            {diff.referencePrice ? <ReferencePrice  {...params} {...form} /> :
              <i style={{ display: 'none' }} />}
            {diff.priceInclude ? <PriceInclude  {...params} {...form} /> :
              <i style={{ display: 'none' }} />}
            <OrderStrategy {...params} {...form} />
          </FamousPrice>
          :
          <NamelessPrice isUpdate={true} {...params} {...form} priceKeys={priceKeys}>
            {diff.referencePrice ? <ReferencePrice  {...params} {...form} /> :
              <i style={{ display: 'none' }} />}
            <OrderStrategy {...params} {...form} />
          </NamelessPrice>
        }
      </WrapPanel>
    </Form>;
  }
}

/**
 * 账号特征
 */
export class AccountFeatureForm extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  webpackExtraFormData = (values) => {
    if (values.base) {
      let area = [...(values.base.areaId || [])];
      values.base.areaId = area.pop() || 0;
    }
    if (values.extend) {
      let hasCar = values.extend.hasCar;
      let hasHouse = values.extend.hasHouse;
      let hasBaby = values.extend.hasBaby;
      values.extend.hasCar = hasCar ? 1 : 2;
      values.extend.hasHouse = hasHouse ? 1 : 2;
      values.extend.hasBaby = hasBaby ? 1 : 2;
      values.extend.birthDate = values.extend.birthDate ? values.extend.birthDate.format('YYYY-MM-DD') : '';
    } else {
      // 没有展开必须传递一个空的extend
      values.extend = {};
      values.base = { mediaType: values.base && values.base.mediaType };
    }

    return values;
  };

  onSave(values) {
    return this.webpackExtraFormData(values);
  }

  render() {
    const { form, params } = this.props;
    const { actions: { updateAccountFeature } } = params;
    return <WrapPanelForm header='账号特征' navId='featureInfos' onSave={this.onSave} action={updateAccountFeature}>
      <AccountFeature {...params} {...form} />
    </WrapPanelForm>;
  }
}

/**
 * 合作信息
 */
export class CooperateInfoForm extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  onSave = (values) => {
    let { cooperationCases = [] } = values;
    // 设置index
    let n = 1;
    cooperationCases = cooperationCases.filter(({ isDeleted, cooperationCaseId }) => !isDeleted || cooperationCaseId)
    cooperationCases.forEach((item) => {
      if (item.isDeleted) delete item.index;
      item.isDeleted = item.isDeleted ? 1 : 2;
      item.sort = n++;
    });
    values.cooperationCases = cooperationCases;
    return values;
  };

  render() {
    const { form, params } = this.props;
    const { actions: { updateAccountCooperation, getAccountInfo } } = params;
    return <WrapPanelForm header='合作信息' navId='cooperationInfos' onSave={this.onSave} action={updateAccountCooperation} refreshAction={getAccountInfo}>
      <CooperateInfo {...params} {...form} />
    </WrapPanelForm>;
  }
}

/**
 * 上下架信息
 */
export class OnSaleInfoForm extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  webpackExtraFormData = (values) => {
    return values;
  };

  onSave(values) {
    return this.webpackExtraFormData(values);
  }

  render() {
    const { form, params } = this.props;
    const { actions: { updateAccountOnSale } } = params;
    return <WrapPanelForm header="上下架信息" navId='shelfInfos' onSave={this.onSave} action={updateAccountOnSale}>
      <OnSaleInfo {...params} {...form} />
    </WrapPanelForm>;
  }
}

/**
 * 接单策略
 */
export class OrderTakeStrategyfoForm extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  webpackExtraFormData = (values) => {
    let newStrategy = values.strategy || {};
    let startTime = newStrategy.startTimeOfTime;
    let endTime = newStrategy.endTimeOfTime;
    let otherTime = newStrategy.otherTime;
    let startDate;
    let endDate;
    otherTime && otherTime.length > 0 && otherTime.map((item, index) => {
      if (index == 0) {
        // startDate = item.format('YYYY-MM-DD')
        startDate = item;
        newStrategy.startTimeOfTime = item.format('HH:mm:ss');
      } else {
        endDate = item;
        newStrategy.endTimeOfTime = item.format('HH:mm:ss');
      }
    });

    if (startTime) {
      newStrategy.startTimeOfTime = startTime.format('HH:mm:ss');
    }
    if (endTime) {
      newStrategy.endTimeOfTime = endTime.format('HH:mm:ss');
    }
    if (startDate) {
      newStrategy.startTimeOfDate = startDate;

    }
    if (endDate) {
      newStrategy.endTimeOfDate = endDate;
    }
    delete newStrategy.otherTime;
    return newStrategy;
  };

  onSave(values) {
    values.strategy = this.webpackExtraFormData(values);
    if (!values.isFinite) {
      values.extend = {
        maxOrderCount: 0,
        maxOrderCountNote: ''
      };
    }
    if (!values.isLeave) {
      values.strategy = {};
    }
    delete values.isLeave;
    delete values.isFinite;
    return values;
  }

  render() {
    const { form, params } = this.props;
    const { actions: { updateAccountStrategy } } = params;
    return <WrapPanelForm header='接单策略' navId='strategyInfos' onSave={this.onSave} action={updateAccountStrategy}>
      <OrderTakeStrategy {...params} {...form} />
    </WrapPanelForm>;
  }
}

/**
 * 其他信息
 */
export class OtherInfoForm extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  onSave(values) {
    return values;
  }

  render() {
    const { form, params } = this.props;
    const { actions: { updateAccountOther } } = params;
    return <WrapPanelForm header='其他信息' navId='otherInfos' onSave={this.onSave} action={updateAccountOther}>
      <OtherInfo {...params} {...form} />
    </WrapPanelForm>;
  }
}

/**
 * 受众画像表单
 */
@Form.create()
export class AudiencePortraitForm extends Component {
  state = { isLoading: false };
  handleData = (values) => {
    const { data: { accountInfo } } = this.props.params;
    const {
      accountId
    } = accountInfo;
    let newValues = { ...values };
    let newData = newValues.audiencePortrait;
    let gender = newData['genderRadio'] || [];
    let city = newData['cityRadio'] || [];
    newData['audienceGenderMaleRatio'] = (gender[0]);
    newData['audienceGenderFemaleRatio'] = (gender[1]);
    newData['audienceCityDistributionSceenshotUrl'] = uploadUrl(newData['cityUrl']);
    newData['audienceCityTop1'] = city[0];
    newData['audienceCityTop2'] = city[1];
    newData['audienceCityTop3'] = city[2];
    delete newData['genderRadio'];
    delete newData['cityRadio'];
    delete newData['cityUrl'];
    // 其他必要数据
    newValues.id = accountId;
    // newValues.base = { isFamous, userId }
    // newValues.upload_token = upload_token
    return newValues;
  };
  submit = (e) => {
    e.preventDefault();
    const { actions: { updateAccountAudiencePortrait } } = this.props.params;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = this.handleData(values);
        this.setState({ isLoading: true });
        updateAccountAudiencePortrait({ ...data }).then(() => {
          this.setState({ isLoading: false });
          message.success('更新账号成功');
        }).catch(() => {
          this.setState({ isLoading: false });
        });
      }
    });
  };


  render() {
    const { form, params } = this.props;
    const { data: { accountInfo } } = params;
    const {
      modifiedAt
    } = accountInfo;
    const rightC = <div className='wrap-panel-right-content'>
      <span className='gray-text'>信息更新时间 : {(modifiedAt && modifiedAt !== '1970-01-01 08:00:00') ? modifiedAt : '--'}</span>
      <Button loading={this.state.isLoading} size='small' type='primary' onClick={this.submit}>{'保存'}</Button>
    </div>;
    return <Form>
      <WrapPanel header='受众画像' right={rightC}>
        <AudiencePortrait {...params} {...form} />
      </WrapPanel>
    </Form>;
  }
}
