import { My } from '../my/my-model.js';
var my = new My();
Page({
  data: {
    array: [],
    arrayIndex: [],
    label:[],
    index: 0,
    sindex:0,
    tindex:0,
    multiArray: [],
    multiIndex: [0, 0, 0],
    price:[],
    topPrice:[],
    allPrice:[],
    priceShow:0,
    datePrice:0,
    topArray:[1,2,3],
    status:false
  },
  bindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var id = that.data.arrayIndex[e.detail.value]
    var res = []
    var price = []
    var topPrice = []
    my.getLabel(id, (data) => {
      for(var i=0;i<data.length;i++){
          res = res.concat(data[i].name)
          price = price.concat(data[i].price)
          topPrice = topPrice.concat(data[i].top_price)
      }
      if(that.data.status){
       var allprice = parseFloat(topPrice[0]) + parseFloat(price[0])
      }else{
       var allprice = price[0]
      }
      that.setData({
        tindex:0,
        price:price,
        label:res,
        priceShow:price[0],
        topPrice:topPrice,
        datePrice:topPrice[0],
        allPrice: allprice,
      })
    });
        that.setData({
                index: e.detail.value,
        })
  },
  sbindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var add = my.accMul(that.data.topArray[0], that.data.topPrice[e.detail.value])
    if(that.data.status){
      var p = parseFloat(add) + parseFloat(that.data.price[e.detail.value])
    }else{
      var p = that.data.price[e.detail.value]
    }
    that.setData({
      tindex: 0,
      sindex: e.detail.value,
      datePrice: that.data.topPrice[e.detail.value],
      priceShow:that.data.price[e.detail.value],
      allPrice: p
    })
  },
  tbindPickerChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var add = my.accMul(that.data.topArray[e.detail.value],that.data.topPrice[that.data.sindex])
    that.setData({
      tindex: e.detail.value,
      datePrice: add,
      allPrice: parseFloat(add) + parseFloat(that.data.priceShow)
    })
  },
  switch1Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    if(e.detail.value){
      var p = parseFloat(this.data.priceShow) + parseFloat(this.data.datePrice)
    }else{
      var p = this.data.priceShow
    }
    this.setData({
      status: e.detail.value,
      allPrice: p
    })
   
  },
  image1Change: function (e) {
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost/project/public/api/v1/uploads', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this;
    var formData ={
      tilt:e.detail.value,
      };
    wx.request({
      url: 'http://test.com:8080/test/socket.php?msg=2',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.modalTap();
      }
    })
  },  
  onLoad: function (options) {
    this._loadData();
    console.log(this.data.arrayIndex)
  },
  _loadData:function(){
    var that = this;
    var price = that.data.price;
    var topPrice = that.data.topPrice;
    var allPrice = that.data.allPrice;
    my.getFristLabel((data) => {
      var res = []
      var inx = []
      var lab = []
      for(var i=0;i<data.length;i++){
           res = res.concat(data[i].name)
           inx = inx.concat(data[i].id)
      }
      that.setData({
       array: res,
       arrayIndex: inx
      });
      my.getLabel(inx[0], (data) => {
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          lab = lab.concat(data[i].name)
          price = price.concat(data[i].price)
          topPrice = topPrice.concat(data[i].top_price)
        }
        if(this.data.status){
          allPrice = parseFloat(topPrice[0]) + parseFloat(price[0])
        }else{
          allPrice = price[0]
        }
        that.setData({
          price: price,
          label: lab,
          priceShow: price[0],
          topPrice:topPrice,
          datePrice:topPrice[0],
          allPrice: allPrice,
        })
      });
    });
  }
})