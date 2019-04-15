Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageNum: Number,
    messageNumShow:Boolean,
    jiasuNum:Number,
    jiasuNumShow:Boolean,
    kuangshanNum:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    messageTap(event) {
      console.log("消息被点击了")
    },
    kuangshanTap(event) {
      console.log("矿山被点击了")
    },
    jiasuTap(event) {
      console.log("加速被点击了")
    },
    serviceTap(event) {
      console.log("客服被点击了")
    }
  }
})
