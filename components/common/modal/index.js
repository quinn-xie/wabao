Component({
    externalClasses: ['i-class', 'i-class-mask'],

    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: ''
        },
        titleTitleStyleA:{
          type: Boolean,
          value: false
        },
        titleTitleStyleB: {
          type: Boolean,
          value: false
        },
        titlebg:{
          type: String,
          value: ''
        },
        slotHeight:{
          type:Number,
          value:''
        }
    },

    methods: {
        modalClose(){
          this.setData({
            visible: false
          });
        }
    }
});
