Component({
  data: {
    current: 'getting',
    current_scroll: 'getting',
    scrollTop: 100
  },
  properties: {
    scrollAreaHeight:{
      type:Number,
      value:'300'
    }
  },
  methods:{
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    },
    handleChangeScroll({ detail }) {
      this.setData({
        current_scroll: detail.key
      });
    },
    upperRefresh(){
      console.log("刷新" + this.data.current)
    },
    lowerLoadingMore(){
      console.log("加载更多哦" + this.data.current)
    }
  }
});