import apiList from "utils/http.js"
const api = require("utils/api.js") 
App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   * 小程序登录
   */
  onLaunch: function () {
    wx.login({
      success: function (res) {
        let params = { wcode: res.code}
        //console.log(res)
        if (res.code) {
          // --------- 发送凭证 ------------------
          api.post(apiList.member.wxlogin, params).then(res => {
            const _token = res.data.token
            wx.setStorageSync('tokenId', _token)
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
