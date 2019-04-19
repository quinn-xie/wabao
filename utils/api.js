const app = getApp()
const request = (url, options) => {
  wx.showLoading({
    title: "数据加载中...",
    icon: "loading"
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("tokenId")  // 请求附上TOKEN
      },
      success(res) {
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail(error) {
        reject(error.data)
      },
      complete: function (res) {
        wx.hideLoading(); //隐藏loading
      }
    })
  })
}
// 声明GET请求
const get = (url, options = {}) => {
  return request(url, { method: 'GET', data: options })
}
// 声明POST请求
const post = (url, options) => {
  return request(url, { method: 'POST', data: options })
}
// 暴露出去
module.exports = {
  get,
  post
}