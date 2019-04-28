import apiList from "../../utils/http.js"
const api = require("../../utils/api.js")
const {$Toast} = require('../../components/common/base/index');
const app = getApp()
Page({
  data: {
    isLogin: false, //是否登录
    myCoins: 0, //金币数量
    myOre: 0, //矿石数量
    digOnline: 0, //挖宝区在线人数
    totalOnline: 0, //在线总人数
    animationTime: 5, //矿工挖矿速度值 越小越快
    messageNum: 0, //消息数量
    messageNumShow: true, //消息数量是否显示
    jiasuNum: 0, //加速铲子数量
    jiasuNumShow: true, //加速铲子数量是否显示
    kuangshanNum: 0, //矿山数量
    treasureNum: 0, //我的宝库提示数量
    treasureNumIsTrue: true, //我的宝库提示数量是否显示
    myTreasureContentHeight: 0, //我的宝库内容区域高度初始化
    myTreasureBottom: 65, //默认我的宝库距离底部位置
    treasureArrowUp: true,
    notice: "这是一条测试数据用于显示首页滚动的文字",
    scrollAreaHeight: '', //页面滚动区域高度
    outlinePop: false,
    couponPopShow: false,
    current:1
  },
  onLoad: function (options) {
    let _this = this;
    _this.getSystemInfo(); //获取手机窗口大小用手我的宝库上拉区域
    _this.getSetting(); //是否授权登录
  },
  onShow: function() {
    let _this = this;
    _this.infoGet(); //获取会员基本信息
  },
  /**
   * 获取浏览器容器高度并赋值
   */
  getSystemInfo(){
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          myTreasureContentHeight: res.windowHeight - 190,
          scrollAreaHeight: res.windowHeight - 240
        })
      }
    });
  },
  /**
   * 是否授权登录
   */
  getSetting(){
    let _this = this
    if (wx.getStorageSync('userInfo') != ''){
      //获取到了用户信息
      _this.setData({
        isLogin:true
      })
    }else{
      //没有获取到用户信息
      _this.setData({
        isLogin:false
      })
    }
  },
  /**
   * 点击上拉箭头加载我的宝库
   */
  showTreasure() {
    let _this = this;
    const tokenId = wx.getStorageSync('tokenId')
    if (tokenId){
      this.data.myTreasureBottom = this.data.myTreasureContentHeight + 55
      _this.setData({
        myTreasureBottom: _this.data.myTreasureBottom,
        treasureArrowUp: false,
        current:1
      })
      _this.selectComponent("#baolist").baolist(1, 1);
    }else{
      $Toast({
        content: '请登录!'
      });
    }
    
  },
  /**
   * 点击加速小公仔速度加快
   */
  toyMoveFaster() {
    let _this = this;
    const tokenId = wx.getStorageSync('tokenId');
    if(tokenId){
      _this.setData({
        animationTime: 1
      })
    }else{
      $Toast({
        content: '请登录!'
      });
    }
  },
  /**
   * 点击收起我的宝库
   */
  hideTreasure() {
    let _this = this;
    _this.setData({
      myTreasureBottom: 65,
      treasureArrowUp: true
    })
  },
  /**
   * 点击关闭弹优惠券出层效果
   */
  closeCouponPop() {
    let _this = this;
    _this.setData({
      couponPopShow: false
    })
  },
  // 关闭金币弹出层
  coinPopClose() {
    this.setData({
      coinVisible: false
    });
  },
  // 关闭矿石弹出层
  orePopClose() {
    this.setData({
      oreVisible: false
    });
  },
  // 弹出矿石弹出层
  orePopOpen() {
    const tokenId = wx.getStorageSync('tokenId');
    if (tokenId) {
      this.exchangeconfigList(2);//获取金币兑换铲子资源列表
      this.setData({
        oreVisible: true
      });
    } else {
      $Toast({
        content: '请登录!'
      });
    }
  },
  // 弹出金币弹出层
  coinPopOpen() {
    const tokenId = wx.getStorageSync('tokenId');
    if (tokenId) {
      this.exchangeconfigList(1);//获取金币兑换铲子资源列表
      this.setData({
        coinVisible: true
      });
    } else {
      $Toast({
        content: '请登录!'
      });
    }
    
  },
  // 金币兑换铲子点击兑换
  coinToShovel(e) {
    this.exchange(e.currentTarget.id)
  },
  // 矿石兑换金币点击兑换
  oreToCoin(e) {
    this.exchange(e.currentTarget.id)
  },
  /*
  * 根据类型获取平台资源兑换规则列表
  */
  exchangeconfigList (typeNum) {
    let _this = this;
    const tokenId = wx.getStorageSync('tokenId');
    let pramas = { token: tokenId, type: typeNum }
    api.post(apiList.resource.exchangeconfigList, pramas).then(res => {
      console.log("根据类型获取平台资源兑换规则列表")
      console.log(res)
      if (res.code == 200) {

      }
    })
  },
  /*
  * 平台资源兑换
  */
  exchange: function (configId) {
    let _this = this;
    let pramas = { token: _this.data.tokenId, configId: configId }
    api.post(apiList.resource.exchange, pramas).then(res => {
      console.log("根据类型获取平台资源兑换规则列表")
      console.log(res)
      if (res.code == 200) {

      }
    })
  },
  /*
  * 授权登录
  */
  isLogin(e) {
    let _this = this
    wx.getUserInfo({
      success: function (res) {
        _this.setData({
          isLogin: true
        })
        wx.setStorageSync('userInfo', e.detail.userInfo)
        _this.wxlogin();
      }
    })
  },
  /**
   * 登录换取TOKEN
   */
  wxlogin() {
    let _this = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          let params = { wcode: res.code }
          api.post(apiList.member.wxlogin, params).then(res => {
            let _token = res.data.token
            wx.setStorageSync('tokenId', _token)
            _this.setData({
              tokenId: _token
            })
            _this.baseinfoUpdate();
            _this.infoGet();
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
  },
  /*
   * 获取会员基本信息
   */
  infoGet() {
    let _this = this;
    const tokenId = wx.getStorageSync('tokenId');
    let pramas = { token: tokenId};
    api.post(apiList.member.infoGet, pramas).then(res => {
      if (res.code == 200) {
        _this.setData({
          messageNum: res.data.unReadNoticeNumber,
          jiasuNum: res.data.spederNumber,
          myCoins: res.data.goldcoinNumber,
          myOre: res.data.oreNumber
        })
      }
    })
  },
  /**
   * 更新用户信息
  */
  baseinfoUpdate () {
    let _this = this;
    const tokenId = wx.getStorageSync('tokenId');
    wx.getUserInfo({
      success(res) {
        let params = {
          token: tokenId,
          nickname: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          gender: res.userInfo.gender,
          country: res.userInfo.country,
          province: res.userInfo.province,
          city: res.userInfo.city,
          language: res.userInfo.language
        }
        api.post(apiList.member.baseinfoUpdate, params).then(res => {
          // console.log("更新用户信息")
          // console.log(res)
        })
      }
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: '大家一起来哇宝吧！',
      desc: '哇宝',
      path: '/page/index/index',
      imageUrl: '../../images/common/share.jpg',
      success(e) {
        wx.showShareMenu({
          withShareTicket: true
        })
      }
    }
  },
  /*
   * 领取宝物
   */
  baoReceive: function (e) {
    let _this = this;
    let baoId = e.currentTarget.id;
    let pramas = {
      token: wx.getStorageSync('tokenId'),
      baoId: baoId
    }
    api.post(apiList.bao.baoReceive, pramas).then(res => {
      if (res.code == 200) {
        _this.setData({
          couponPopShow: false
        });
        $Toast({
          content: res.message,
          type: 'success'
        });
      }
    })
  }
})