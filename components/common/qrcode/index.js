const QRCode = require('../../../utils/weapp-qrcode.js')
let qrcode;

Component({
  properties: {
    text:{
      type:String,
      value:""
    },
    width:{
      type: Number,
      value: ""
    },
    height:{
      type: Number,
      value: ""
    },
    color: {
      type: String,
      value: ""
    },
    bg: {
      type: String,
      value: ""
    }
  },
  data: {
    
  },
  ready: function () {
    qrcode = new QRCode('canvas', {
      usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
      text: this.data.text,
      width: this.data.width,
      height: this.data.height,
      color: this.data.color,
      bg: this.data.bg,
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  methods: {
    
  }
})
