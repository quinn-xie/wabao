const { $Message } = require('../../components/common/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:false,
    sendCode:"发送",
    sendCodeBtnDisabled:true,
    name: "",
    tel:"",
    address:"",
    rename:"大大侠",
    retel:"13333333333",
    readdress:"广东省深圳市南山区华辉玉门"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '大家一起来哇宝吧！',
      desc: '哇宝',
      path: '/page/invite/index',
      imageUrl: '../../images/common/share.jpg',
      success(e) {
        wx.showShareMenu({
          withShareTicket: true
        })
      }
    }
  },
/**
 * 传入NAME值
 */
  setName: function (e){
    let _this = this;
    _this.setData({
      name: e.detail.detail.value
    })
  },
/**
 * 传入PHONE值
 */
  setPhone: function (e) {
    let _this = this;
    _this.setData({
      tel: e.detail.detail.value
    })
  },
/**
  * 传入ADDRESS值
  */
  setAddress: function (e) {
    let _this = this;
    _this.setData({
      address: e.detail.detail.value
    })
  },
/**
  * 手机号验证
  */
  blurPhone: function (e) {
    let _this = this;
    let phone = e.detail.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      _this.setData({
        sendCodeBtnDisabled: true
      })
      if (phone.length != 11) {
        $Message({
          content: '电话号码输入错误',
          type: 'error'
        });
      }
    } else {
      _this.setData({
        sendCodeBtnDisabled: false
      })
    }
  },
/**
   * 提交信息按钮点击
   */
  submitClick: function () {
    let _this = this;
    if(_this.data.name == ""){
      $Message({
        content: '请输入姓名',
        type: 'error'
      });
    }else if (_this.data.tel == ""){
      $Message({
        content: '请输入联系电话',
        type: 'error'
      });
    }else if (_this.data.address == "") {
      $Message({
        content: '请输入收货地址',
        type: 'error'
      });
    }else{
      _this.setData({
        isActive: true
      })
    }
  },
  /**
   * 邀请好友哇宝按钮点击
   */
  inviteFriendClick:function(){
    console.log("邀请好友哇宝按钮点击")
  }
})