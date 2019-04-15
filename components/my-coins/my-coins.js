
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  
  /**
   * 组件的初始数据
   */
  data: {
    myCoins:'2142143',
    myOre:'11784',
    digOnline:'12432',
    totalOnline:'6336',
    coinVisible: false,
    oreVisible:false
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
    }
  }
})
