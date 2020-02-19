/**
 * Created by lzb on 2020-02-19.
 */
export const uploadRequired = {
  required: true,
  type: "array",
  validator: (rule, value, callback) => {
    if (value && value.length > 0 && value.every(item => item.url)) {
      callback()
    }
    callback(rule.message)
  }
}
