import apiList from "../../utils/http.js"
const api = require("../../utils/api.js") 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ifLogin:{
      type:Boolean,
      value:false
    },
    myCoins:{
      type:Number,
      value:0
    },
    myOre: {
      type: Number,
      value: 0
    },
    digOnline: {
      type: Number,
      value: 0
    },
    totalOnline: {
      type: Number,
      value: 0
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    coinVisible: false,
    oreVisible:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭金币弹出层
    coinPopClose() {
      this.setData({
        coinVisible: false
      });
    },
    // 弹出金币弹出层
    coinPopOpen() {
      this.setData({
        coinVisible: true
      });
    },
    // 关闭矿石弹出层
    orePopClose() {
      this.setData({
        oreVisible: false
      });
    },
    // 弹出矿石弹出层
    orePopOpen(){
      this.setData({
        oreVisible: true
      });
    },
    /*
    * 查看是否授权
    */
    bindGetUserInfo(e) {
        console.log()
        console.log("未授权")
        let _this = this;
        if (e.detail.userInfo){
            _this.setData({ifLogin:true})
            _this.ifCanIUse()
        }else{
          wx.clearStorageSync()
        }
    },
      /*
    * 查看是否已经授权登录
     */
      ifCanIUse() {
          let _this = this;
          wx.getSetting({
              success(res) {
                  if (res.authSetting['scope.userInfo']) {
                      _this.setData({ ifLogin: true })
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                      wx.getUserInfo({
                          success(res) {
                            console.log("已经授权")
                            //console.log(res.userInfo)
                            _this.triggerEvent('infoGet') 
                            let params = {
                              token: wx.getStorageSync("tokenId"),
                              nickname: res.userInfo.nickName, 
                              avatarUrl: res.userInfo.avatarUrl,
                              gender: res.userInfo.gender,
                              country: res.userInfo.country,
                              province: res.userInfo.province,
                              city: res.userInfo.city,
                              language: res.userInfo.language
                              }
                              api.post(apiList.member.baseinfoUpdate, params).then(res => {
                                //console.log("更新会员基本信息")
                                //console.log(res)
                              })
                          }
                      })
                  }
              }
          })
      }
  }
})
