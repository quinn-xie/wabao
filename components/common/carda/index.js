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
        console.log("打算放弃了" + this.data.ticketId)
      },
      onTapReceive(){
        console.log("正准备收下" + this.data.ticketId)
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
