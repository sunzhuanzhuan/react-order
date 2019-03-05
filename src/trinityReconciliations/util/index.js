/**
 * Created by lzb on 2018/12/12.
 */
import moment from 'moment'

/**
 * 处理提交url
 * @param {Object[]} [file] - 对象数组
 * @param {string} file[].url - 文件的绝对路径
 * @param {number} [limit] - 取的数量
 * @param {string} [key] - 路径的key
 * @returns {string|*} [url] - 提交的文件地址(绝对路径)
 */
export function uploadUrl(file, key = 'url', limit = 1) {
	//  校验file类型, 不合法或没有传入则返回 undefined
	if (!Array.isArray(file)) return undefined

	if (limit === 1) {
		// 当只上传一个路径
		return file.length ? file[0][key] : ''
	} else {
		// 当上传多个路径
		let ary = file.splice(0, limit)
		return ary.map(item => item[key])
	}

}
/**
 * 处理提交 checkbox to value
 * @param {boolean | *} [value]
 * @param {array} [map]
 * @returns {*}
 */
export function checkVal(value, map = ["2","1"]) {
	if (typeof value === "boolean") {
		return map[value / 1]
	}
	return value
}
/**
 * 处理原因显示
 * @param {string | array} reason - 传入数组或字符串原因
 * @returns {string} reason - 返回字符串原因
 */
export function handleReason(reason = '') {
	let result = ''
	if (Array.isArray(reason)) {
		result = reason.join('，')
	} else if (typeof reason === 'string') {
		result = reason.replace(/,/g, '，')
	}
	return result
}
/**
 * 时间转moment对象
 * @param {date} [date]
 * @returns {moment} moment - 返回moment对象
 */
export function date2moment(date) {
	// 判断 date 是否为一个有效值
	return date ? moment(date) : moment.invalid()
}

export default { uploadUrl, checkVal, handleReason, date2moment }
