import apiList from "../../utils/http.js"
const api = require("../../utils/api.js") 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myCoins: 1111111,//金币数量
    myOre: 111111,//矿石数量
    digOnline: 111111,//挖宝区在线人数
    totalOnline: 111111,//在线总人数
    animationTime: 5,//矿工挖矿速度值 越小越快
    messageNum: 11,//消息数量
    messageNumShow: true,//消息数量是否显示
    jiasuNum: 11,//加速铲子数量
    jiasuNumShow: true,//加速铲子数量是否显示
    kuangshanNum:11,//矿山数量
    treasureNum: 11,//我的宝库提示数量
    treasureNumIsTrue: true,//我的宝库提示数量是否显示
    myTreasureContentHeight: 0,//我的宝库内容区域高度初始化
    myTreasureBottom:65,//默认我的宝库位置
    treasureArrowUp:true,
    notice:"这是一条测试数据用于显示首页滚动的文字",
    scrollAreaHeight: '',//页面滚动区域高度
    outlinePop:false,
    couponPopShow:false,
    ifLogin:false //是否授权登录
  },
  onLoad: function (options) {
    // 获取手机屏幕高度赋值给我的宝库详情
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          myTreasureContentHeight: res.windowHeight - 190,
          scrollAreaHeight: res.windowHeight - 240
        })
      }
    })
  },
  onShow:function(){
    this.ifCanIUse(); //是否授权
    this.infoGet(); //获取会员基本信息
  },
  /**
   * 点击上拉箭头加载我的宝库
   */
  showTreasure() {
    let _this = this;
    this.data.myTreasureBottom = this.data.myTreasureContentHeight + 55
    _this.setData({
      myTreasureBottom: _this.data.myTreasureBottom,
      treasureArrowUp:false
    })
  },
  /**
   * 点击加速小公仔速度加快
   */
  toyMoveFaster() {
    let _this = this;
    _this.setData({
      animationTime: 1
    })
    console.log("哇宝公仔加速啦")
  },
  /**
   * 点击收起我的宝库
   */
  hideTreasure() {
    let _this = this;
    _this.setData({
      myTreasureBottom: 65,
      treasureArrowUp:true
    })
  },
  /**
   * 点击关闭弹优惠券出层效果
   */
  closeCouponPop(){
    let _this = this;
    _this.setData({
      couponPopShow: false
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
      imageUrl:'../../images/common/share.jpg',
      success(e){
        wx.showShareMenu({
          withShareTicket:true
        })
      }
    }
  },
  /*
  * 获取会员基本信息
  */
  infoGet:function(){
    let _this = this;
    console.log("aewafewafe"+wx.getStorageSync("tokenId"))
    let params = { token: wx.getStorageSync("tokenId")}
    api.post(apiList.member.infoGet, params).then(res => {
      console.log("获取会员基本信息")
      console.log(res)
      _this.setData({
        messageNum: res.data.unReadNoticeNumber,
        jiasuNum: res.data.spederNumber,
        myCoins: res.data.goldcoinNumber,
        myOre: res.data.oreNumber
      })
    })
  },
  /*
  * 查看是否已经授权登录
   */
    ifCanIUse() {
        let _this = this;
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    _this.setData({ifLogin:true})
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                          //console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称")
                          //console.log(res.userInfo)
                          _this.infoGet(); //获取会员基本信息
                        }
                    })
                }
            }
        })
    }
})