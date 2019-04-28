import apiList from "../../utils/http.js"
const api = require("../../utils/api.js") 
Component({
  data: {
    current: '1',
    current_scroll: '1',
    scrollTop: 100,
    hasNoData:true,
    baoList:''
  },
  properties: {
    scrollAreaHeight:{
      type:Number,
      value:'300'
    },
    current:{
      type:Number,
      value:1
    }
  },
  methods:{
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
      this.baolist(detail.key,1) //获取宝物列表
    },
    handleChangeScroll({ detail }) {
      this.setData({
        current_scroll: detail.key
      });
    },
    //下拉刷新
    upperRefresh(){
      // console.log("刷新" + this.data.current)
      // this.baolist(this.data.current,1) //获取宝物列表
    },
    //加载更多
    lowerLoadingMore(){
      // var pageNum = 1;
      // this.baolist(this.data.current, pageNum) //获取宝物列表
    },
    /*
      * 获取宝物列表
    */
    baolist: function (typeNum, pageNum) {
      let _this = this;
      const tokenId = wx.getStorageSync('tokenId');
      let pramas = { 
        token: '123456', //临时数据
        //token: tokenId, 
        type: typeNum, 
        page: pageNum, 
        pageSize: 10
      }
      api.post(apiList.member.baolist, pramas).then(res => {
        if (res.code == 200 && res.data != '') {
          _this.setData({
            hasNoData : false,
            baoList : res.data
          })
        }else{
          _this.setData({
            hasNoData: true
          })
        }
      })
    },
    /*
    * 领取宝物
    */
    baoReceive: function (e) {
      let _this = this;
      let baoId = e.currentTarget.id;
      let pramas = { token: tokenId, baoId: baoId }
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
  }
});