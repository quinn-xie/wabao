import apiList from "../../../utils/http.js"
const api = require("../../../utils/api.js")
const tokenId = wx.getStorageSync('tokenId')
const { $Toast } = require('../base/index');
Component({
    data: {
      
    },
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },
    methods:{
      //倒计时结束后状态改变
      myLinsterner(e) {
        if (this.data.percent == 100){
          this.setData({
            status: false,
            succeed: true
          });
        }else{
          this.setData({
            status: false,
            succeed: false
          });
        }
      },
      onTapGiveup(e){
        let _this = this;
        let baoId = this.data.ticketId
        let pramas = { token: tokenId, baoId: baoId }
        api.post(apiList.bao.baoGiveup, pramas).then(res => {
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
      },
      onTapReceive(){
        let _this = this;
        let baoId = this.data.ticketId
        let pramas = { token: tokenId, baoId: baoId }
        api.post(apiList.bao.baoReceive, pramas).then(res => {
          console.log(res.message)
          if (res.code == 200) {
            _this.setData({
              couponPopShow: false
            });
            $Toast({
              content: res.message
            });
          }
        })
      },
      toDetails() {
        console.log(this.data.ticketId+'被点击了')
        wx.navigateTo({
          url: '../../pages/invite/index'
        })
      }
    },
    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        percent: {
          type: Number,
          value: ''
        },
        targetTime:{
          type: Number,
          value: ''
        },
        clearTimer:{
          type: Boolean,
          value: false
        },
        status:{
          type: Boolean,
          value: true
        },
        succeed:{
          type: Boolean,
          value: true
        },
        ticketId:{
          type:String,
          value:''
        }
    }
});
