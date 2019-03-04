const oldPreFix = "/accountManage"
export default {
	common:{
		areas: '/operator-gateway/common/v1/areas',
		industries: '/operator-gateway/common/v1/industries',
		platform: '/operator-gateway/common/v1/platform',
	},
	fetchAccountBaseInfo: '/operator-gateway/account/v1/captureInfo',
	getAudiencePortrait: '/operator-gateway/account/v1/getAudiencePortrait',
	getAccountInfo: '/operator-gateway/account/v1/getDetail',
	getAccountOnShelfStatus: '/operator-gateway/account/v1/onShelfStatus',
	saveAccountInfo: '/operator-gateway/account/v1/addAccount',
	getSkuTypeList: '/operator-gateway/sku/v1/skuType',
	getSkuList: '/operator-gateway/sku/v1/skuList',
	getPrimaryAccountInfo: '/operator-gateway/account/v1/getUserNameWithAdmin',
	getUserInvoiceInfo: '/operator-gateway/account/v1/getUserInvoiceInfo',
	sensitiveWordsFilter: oldPreFix + '/sensitiveWordsFilter',
	update: {
		saveSku: '/operator-gateway/sku/v1/updateSku',
		accountBase: '/operator-gateway/account/v1/updateBase',
		accountFans: '/operator-gateway/account/v1/updateFollowersCount',
		accountFeature: '/operator-gateway/account/v1/updateExtend',
		accountCooperation: '/operator-gateway/account/v1/updateCooperationCases',
		accountOnSale: '/operator-gateway/account/v1/updateOnline',
		accountStrategy: '/operator-gateway/account/v1/updateStrategy',
		accountOther: '/operator-gateway/account/v1/updateOtherInfo',
		accountAudiencePortrait: '/operator-gateway/account/v1/updateAudiencePortrait',
	}
}
