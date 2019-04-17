let baseUrl = "http://srdz.feixianggame.com/wbapi"
const apiList = {
  /*
   * 会员相关接口
  */
  member:{
    // 获取当前会员的宝物列表
    baolist: baseUrl + '/member/baolist',
    // 更新会员基本信息
    baseinfoUpdate: baseUrl + '/member/baseinfo/update',
    // 获取当前会员基本信息
    infoGet: baseUrl + '/member/info/get',
    // 微信授权登录
    wxlogin: baseUrl + '/member/wxlogin'
  },
  /*
   * 宝物相关接口
  */
  bao: {
    // 加戳宝物
    baoAddstamp: baseUrl + '/bao/addstamp',
    // 转增宝物
    baoExchange: baseUrl + '/bao/exchange',
    // 领取宝物
    baoGiveup: baseUrl + '/bao/giveup',
    // 领取宝物
    baoReceive: baseUrl + '/bao/receive'
  },
  /*
   * 平台资源 （矿石 金币）相关
  */
  resource:{
    // 平台资源兑换
    exchange: baseUrl + '/resource/exchange',
    // 根据类型获取平台资源兑换规则列表
    exchangeconfigList: baseUrl + '/resource/exchangeconfig/list'
  },
  /*
   * 用户相关接口，包括注册，登录，退出等接口
  */
  user:{
    // 发送短信验证码
    openLogin: baseUrl + "/user/open/login",
    //发送短信验证码
    openSendSMS: baseUrl +"/user/open/sendSMS"
  }
}
export default apiList