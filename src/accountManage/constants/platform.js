// 平台码表 id -> name
export const platformView = {
	'1': '新浪微博',
	'2': '腾讯微博',
	'3': '搜狐微博',
	'4': '网易微博',
	'5': 'Qzone认证号',
	'6': '美丽说',
	'7': '蘑菇街',
	'8': '人人网',
	'9': '微信公众号',
	'10': '人人小站',
	'11': '豆瓣小站',
	'12': '点点',
	'13': '爱乐活',
	'14': '百度空间',
	'15': '花瓣',
	'16': '啪啪',
	'17': '微淘',
	'18': '微视（老）',
	'19': 'Qzone个人号',
	'23': '朋友圈',
	'24': '秒拍',
	'25': '美拍',
	'26': '今日头条',
	'27': 'NICE',
	'28': 'IN',
	'29': '优酷',
	'30': '土豆视频',
	'31': '喜马拉雅',
	'32': '荔枝FM',
	'33': 'QQ公众号',
	'93': '小红书',
	'94': '知乎',
	'100': '爱奇艺',
	'101': '搜狐视频',
	'102': '腾讯视频',
	'103': '快手',
	'104': 'YY',
	'105': '映客',
	'106': '一直播',
	'107': '斗鱼',
	'108': '花椒',
	'109': '小咖秀',
	'110': '哔哩哔哩动画',
	'111': 'AcFun',
	'112': '战旗直播',
	'113': '虎牙直播',
	'114': '熊猫直播',
	'115': '抖音',
	'116': '火山小视频',
	'117': 'MOMO陌陌',
	'118': '西瓜视频',
	'119': '淘宝达人',
	'120': '微视'
}

// 平台码表 name -> id
export const platformMap = {
	'SINA': '1',
	'WECHAT': '9',
	'PENG_YOU_QUAN': '23',
	'RED_BOOK': '93'
}
// 平台对应模块
export const viewTypeForPlatform = {
	"defaultChild": {
		involveForWeiboType: [115, 24, 103, 120, 111, 119, 118, 116, 30, 29, 110, 100, 101, 102, 114, 117],
		diff: {
			fetch: {
				defaultKeys: ''
			}
		}
	},
	"SinaChild": {
		involveForWeiboType: [1],
		diff: {
			fetch: {
				defaultKeys: ''
			},
			price: {
				referencePrice: true,
				priceInclude: true
			}
		}
	},
	"WeChatChild": {
		involveForWeiboType: [9],
		diff: {
			fetch: {
				defaultKeys: ''
			},
			base: {
				qcCode: true,
				isFansNumberImg: true
			}
		}

	},
	"FriendsChild": {
		involveForWeiboType: [23],
		diff: {
			base: {
				qcCode: true,
				hideUniqueId: true,
				hideLink: true,
				isFansNumberImg: true
			}
		}

	},
	"CanNotFetchChild": {
		involveForWeiboType: [33, 28, 32, 27, 31, 2, 5, 19, 117],
		diff: {
			base: {
				hideUniqueId: true
			}
		}

	},
	"ReadBookChild": {
		involveForWeiboType: [93],
		diff: {
			fetch: {
				defaultKeys: ''
			}
		}

	},
	"HeadlineChild": {
		involveForWeiboType: [26],
		diff: {
			fetch: {
				defaultKeys: 'snsId'
			}
		}
	},
	"BeautyPatChild": {
		involveForWeiboType: [25],
		diff: {
			fetch: {
				defaultKeys: 'snsId'
			}
		}
	},
	"LikeYYChild": {
		involveForWeiboType: [109, 106, 108, 105, 104, 113, 112, 107],
		diff: {
			fetch: {
				defaultKeys: 'snsId'
			}
		}
	},
	"ZhanQiChild": {
		involveForWeiboType: [112],
		diff: {
			fetch: {
				defaultKeys: ''
			}
		}
	}
}
// 平台对应模块码表
export const platformToType = Object.entries(viewTypeForPlatform).reduce((obj, [key, item]) => {
	item['involveForWeiboType'].forEach(i => {
		obj[i] = {
			key,
			...item
		}
	})
	return obj
}, {})
// 平台对应模块码表
/*export const platformToType = Object.entries(viewTypeForPlatform).reduce((obj, [key, item]) => {
	item['involveForWeiboType'].forEach(i => obj[i] = key)
	return obj
}, {})
export const viewTypeForPlatform = {
	"defaultChild": {
		involveForWeiboType: [115, 24, 103, 120, 111, 119, 118, 116, 30, 29, 110, 100, 101, 102, 114,117],
		component: {
			add: AddDefaultChild,
			update: UpdateDefaultChild
		}
	},
	"SinaChild": {
		involveForWeiboType: [1],
		component: {
			add: AddSinaChild,
			update: UpdateSinaChild
		}
	},
	"WeChatChild": {
		involveForWeiboType: [9],
		component: {
			add: AddWeChatChild,
			update: UpdateWeChatChild
		}
	},
	"FriendsChild": {
		involveForWeiboType: [23, 33, 28, 32, 27, 31, 2, 5, 19, 117],
		component: {
			add: AddFriendsChild,
			update: UpdateFriendsChild
		}
	},
	"ReadBookChild": {
		involveForWeiboType: [93],
		component: {
			add: AddReadBookChild,
			update: UpdateReadBookChild
		}
	},
	"HeadlineChild": {
		involveForWeiboType: [26],
		component: {
			add: AddHeadlineChild,
			update: UpdateHeadlineChild
		}
	},
	"BeautyPatChild": {
		involveForWeiboType: [25],
		component: {
			add: AddBeautyPatChild,
			update: UpdateBeautyPatChild
		}
	},
	"LikeYYChild": {
		involveForWeiboType: [109, 106, 108, 105, 104, 113, 112, 107],
		component: {
			add: AddLikeYYChild,
			update: UpdateLikeYYChild
		}
	}
}*/
