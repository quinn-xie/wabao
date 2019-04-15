Component({
    data: {
      
    },
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },
    methods:{
      onTapView(){
        console.log("查看点击" + this.data.ticketId)
      },
      toDetails() {
        console.log(this.data.ticketId + '被点击了')
        wx.navigateTo({
          url: '../../pages/invite/index'
        })
      }
    },
    properties: {
        startDate: {
          type: String,
          value: ''
        },
        endDate: {
          type: String,
          value: ''
        },
        thumb: {
          type: String,
          value: ''
        },
        title: {
          type: String,
          value: ''
        },
        ticketId:{
          type:String,
          value:''
        }
    }
});
