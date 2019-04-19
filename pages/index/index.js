import apiList from "../../utils/http.js"
const api = require("../../utils/api.js") 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    animationTime: 5,//矿工挖矿速度值 越小越快
    messageNum: 12,//消息数量
    messageNumShow: true,//消息数量是否显示
    jiasuNum: 33,//加速铲子数量
    jiasuNumShow: true,//加速铲子数量是否显示
    kuangshanNum:22,//矿山数量
    treasureNum: "89",//我的宝库提示数量
    treasureNumIsTrue: true,//我的宝库提示数量是否显示
    myTreasureContentHeight: 0,//我的宝库内容区域高度初始化
    myTreasureBottom:65,//默认我的宝库位置
    treasureArrowUp:true,
    notice:"这是一条测试数据用于显示首页滚动的文字",
    scrollAreaHeight: '',//页面滚动区域高度
    outlinePop:false,
    couponPopShow:false
  },
  onLoad: function (options) {
    // 测试
    this.baoList();
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
  * 测试接口
  */
  baoList:function(){
    let _this = this;
    let params = { page:'1', pageSize:'10',type:'2' }
    api.post(apiList.member.baolist, params).then(res => {
      console.log(res)
      _this.setData({
        jiasuNum:res.code
      })
    })
  }
})