import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import update from 'immutability-helper'

import {
  getCompanyBrands_success,
  getCompanyProjects_success,
  getSalesManagers_success,
  getExecutor_success,
  getCompanyPlatforms_success,
  addOrUpdateSummary_success,
  getSummaryOrderInfo_success,
  getPlatformDataInfo_success,
  getSummaryListByOrder_success,
  getSummaryTotalInfo_success,
  getCompanyTotalInfo_success,
  getBrands_success,
  getSummaryList_success,
  getProjects_success,
  getOrders_success,
  getKocOrders_success
} from '../actions'

// 处理列表数据为map表
function handleResponseList(primary_key) {
  return (state, action) => {
    let response = action.payload.data || {}, source = {}
    const { total = 0, page = 1, pageSize = 50, rows = [] } = response
    const list = rows.map(item => {
      source[item[primary_key]] = { ...item }
      source[item[primary_key]]['key'] = item[primary_key]
      return item[primary_key]
    })
    return {
      total, page, pageSize, list, source: { ...state.source, ...source }, response
    }
  }
}

// 初始化列表数据
function initList() {
  return { list: [], source: {}, total: 0, page: 1, pageSize: 50, response: {} }
}

// 公共的数据
const defaultPublicSource = {
  salesManagers: [],
  executors: [],
  executionStatus: [
    { 'label': '执行中', 'value': '21' },
    { 'label': '已执行', 'value': '22' },
    { 'label': '待执行', 'value': '23' },
    { 'label': '执行取消', 'value': '24' },
    { 'label': '执行终止', 'value': '25' },
    { 'label': '待质检', 'value': '26' },
    { 'label': '质检中', 'value': '27' },
    { 'label': '质检完成', 'value': '28' },
    { 'label': '终止申请中', 'value': '31' },
    { 'label': '已完成', 'value': '32' },
    { 'label': '赔偿申请中', 'value': '33' },
    { 'label': '赔偿通过', 'value': '34' },
    { 'label': '已结案', 'value': '35' }
  ],
  summaryStatus: [
    { 'label': '待提交内审', 'value': '1' },
    { 'label': '待内审', 'value': '2' },
    { 'label': '内审通过，待提交品牌方审核', 'value': '3' },
    { 'label': '内审被拒，待修改', 'value': '4' },
    { 'label': '待品牌方审核', 'value': '5' },
    { 'label': '品牌方审核被拒，待修改', 'value': '6' },
    { 'label': '审核通过', 'value': '7' }
  ],
  brandByUser: [],
  projectByUser: []
}
export const publicSource = handleActions({
  [combineActions(getExecutor_success)]: (state, action) => {
    return update(state, {
      executors: {
        $set: action.payload.data
      }
    })
  },
  [combineActions(getSalesManagers_success)]: (state, action) => {
    return update(state, {
      salesManagers: {
        $set: action.payload.data
      }
    })
  },
  [combineActions(getBrands_success)]: (state, action) => {
    return update(state, {
      brandByUser: {
        $set: action.payload.data
      }
    })
  },
  [combineActions(getProjects_success)]: (state, action) => {
    return update(state, {
      projectByUser: {
        $set: action.payload.data
      }
    })
  }
}, defaultPublicSource)

// 公司/数据单 纬度下的数据
const defaultCompanySource = {
  brandByCompany: [],
  projectByCompany: [],
  platformByCompany: [],
  companyId: '',  // 公司id
  summaryName: '', // 数据单名称
  summaryId: '', // 数据单id
  creatorName: '', // 数据单创建人
  beSalesRealName: '', //公司所属销售
  companyName: '', //公司简称
  companyPath: '' //公司跳转路径
}
export const companySource = handleActions({
  [combineActions(getCompanyBrands_success)]: (state, action) => {
    return update(state, {
      brandByCompany: {
        $set: action.payload.data
      }
    })
  },
  [combineActions(getCompanyProjects_success)]: (state, action) => {
    return update(state, {
      projectByCompany: {
        $set: action.payload.data
      }
    })
  },
  [combineActions(getCompanyPlatforms_success)]: (state, action) => {
    return update(state, {
      platformByCompany: {
        $set: action.payload.data
      }
    })
  },
  [combineActions(addOrUpdateSummary_success)]: (state, action) => {
    return update(state, {
      summaryId: {
        $set: action.payload.data.summary_id || state.summaryId
      }
    })
  },
  [combineActions(getCompanyTotalInfo_success)]: (state, action) => {
    const { company_name, real_name, company_path } = action.payload.data
    return {
      ...state,
      beSalesRealName: real_name,
      companyName: company_name,
      companyPath: company_path
    }
  },
  [combineActions(getSummaryTotalInfo_success)]: (state, action) => {
    const { summary_id, creator_name, summary_name, company_id } = action.payload.data
    return {
      ...state,
      summaryName: summary_name,
      summaryId: summary_id,
      creatorName: creator_name,
      companyId: company_id
    }
  },
  [combineActions('resetCreateReportData')]: () => {
    return defaultCompanySource
  }
}, defaultCompanySource)

// 请求(公司/数据单纬度)全部订单的数据
export const selectOrderList = handleActions({
  [combineActions(getOrders_success)]: handleResponseList('order_id'),
  [combineActions('clearAllOrderList')]: () => {
    return initList()
  }
}, initList())
// koc可以筛选的订单
export const selectKocOrderList = handleActions({
  [combineActions(getKocOrders_success)]: handleResponseList('koc_order_id'),
  [combineActions('clearAllOrderList')]: () => {
    return initList()
  }
}, initList())

// 数据单订单信息(列表)
export const summaryOrders = handleActions({
  [combineActions(getSummaryOrderInfo_success)]: (state, action) => {
    let response = action.payload.data || {}, source = {}
    let { list = [] } = response
    list = list.map(item => {
      source[item['id']] = { ...item }
      source[item['id']]['key'] = item['id']
      return item['id']
    })
    return {
      list, source: { ...state.source, ...source }, response
    }
  },
  [combineActions('addPlatform')]: (state, action) => {
    let { platform_id, id, status } = action.payload.data || {}
    console.log(status, '=====>');
    return update(state, {
      source: {
        [id]: {
          platform: {
            $push: [{
              platform_id,
              is_finish: 2,
              modify_status: 1,
              is_hand_record: 1,
              check_status: 1
            }]
          }
        }
      }
    })
  },
  [combineActions('removePlatform')]: (state, action) => {
    let { platform_id, id } = action.payload.data || {}
    let index = state.source[id].platform.findIndex(({ platform_id: id }) => platform_id == id)
    return update(state, { source: { [id]: { platform: { $splice: [[index, 1]] } } } })

  },
  [combineActions('removeSummaryOrder')]: (state, action) => {
    let { id } = action.payload.data || {}
    let index = state.list.findIndex((key) => key == id)
    return update(state, { list: { $splice: [[index, 1]] } })

  },
  [combineActions('submitPlatformInfo')]: (state, action) => {
    let { platform_id, id } = action.payload.data || {}
    //modify_status
    let index = state.source[id].platform.findIndex(({ platform_id: id }) => platform_id == id)
    return update(state, {
      source: {
        [id]: {
          platform: {
            [index]: {
              is_finish: { $set: 1 },
              modify_status: { $set: 2 }
            }
          }
        }
      }
    })
  },
  [combineActions('resetCreateReportData')]: () => {
    return {
      list: [],
      source: {},
      response: {}
    }
  }
}, {
    list: [],
    source: {},
    response: {}
  })

// 平台数据信息
export const platformData = handleActions({
  [combineActions(getPlatformDataInfo_success)]: (state, action) => {
    return {
      ...action.payload.data
    }
  },
  [combineActions('resetCreateReportData')]: () => {
    return {
      total: {},
      basic_information: {},
      execution_link: {},
      execution_screenshot: {},
      execution_data: {}
    }
  },
  [combineActions('clearPlatformData')]: () => {
    return {
      total: {},
      basic_information: {},
      execution_link: {},
      execution_screenshot: {},
      execution_data: {}
    }
  }
}, {
    total: {},
    basic_information: {},
    execution_link: {},
    execution_screenshot: {},
    execution_data: {}
  })

// 订单投放数据汇总列表
export const summaryListByOrder = handleActions({
  [combineActions(getSummaryListByOrder_success)]: handleResponseList('order_id')
}, initList())

// 订单投放数据审核列表
export const summaryList = handleActions({
  [combineActions(getSummaryList_success)]: handleResponseList('summary_id')
}, initList())

export default combineReducers({
  publicSource,
  companySource,
  selectOrderList,
  selectKocOrderList,
  summaryOrders,
  platformData,
  summaryListByOrder,
  summaryList
})
