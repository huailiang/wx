// pages/order/order.js
const app = getApp()

Page({
  data: {
    toastHidden: true,
    modalHidden: true,
    index: 0,
    location:"请填写详细的地址",
    phone:"15266668888",
    des: ['提交成功', '提交取消', '没有填写姓名', '没有填写手机号码','没有填写地址']
  }, 

  onLoad: function () {
      var self = this; 
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });

      // console.log(app.globalData.userInfo);
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 
        success: function (res) {
          var locationString = res.latitude + "," + res.longitude;
          console.log("定位成功"+locationString);
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/?l&get_poi=1',
            data: {
              "key": "YLFBZ-WHAWI-ZXUGH-53Q65-TOJ7E-ADBNQ",
              "location": locationString
            },
            method: 'GET',
            success: function (res) {
              // success
              console.log("请求数据:" + res.data.result.address);
              self.setData({location: res.data.result.address});
              // self.setaddr(res.data.result.address);
            },
            fail: function () {
              // fail
              console.log("请求失败");
            },
            complete: function () {
              // complete
              console.log("请求完成");
            }
          })
        },
        fail: function () {
          // fail
          console.log("定位失败");
        },
        complete: function () {
          // complete
          console.log("定位完成");
        }
      })
  },
  toast:function(idx) {
    this.setData({
      modalHidden: true,
      toastHidden: false,
      index:idx,
      notice_str: this.data.des[idx],
    })
  },

  confirm: function (e) {
    this.toast(0,'');
  },

  cancel: function (e) {
    this.toast(1);
  }, 

  formSubmit: function (e) {
    var data = e.detail.value;
    console.log(data);
    if (data.name=="") {
      this.toast(2);
    }
    else if(data.tel=="") {
      this.toast(3);
    }
    else if (data.addr == "") {
      this.toast(4);
    }
    else {
      this.setData({ modalHidden: false });
    }  
  },

  toastChange: function (e) {
    this.setData({ toastHidden: true });
    if(this.data.index==0) wx.navigateBack({})
  }
})