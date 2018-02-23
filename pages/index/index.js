//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    title:"**潢川手工挂面直销**\n",
    phone:"联系电话:15738281598\n",
    clickQr:"\n点击查看支付二维码\n\n",
    address: "江家集镇富江南街109号\n",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    console.log("req form");
    wx.request({
      url: 'https://jinshuju.net/f/ucBhVY', 
      method:'POST',
      data: {
        name: 'alexpeng',
        num: '2',
        phone: '15266668888',
        addr: 'Shanghai,Yangpu Distric',
      },
      header: {'content-type': 'application/json'},
      success: function (res) { console.log(res.data) }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickQr:function(e)
  {
    wx.navigateTo({
      url: '../qrcode/qrcode'
    })
  },
  clickOrder:function(e)
  {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  clickVedio:function(e)
  {
    wx.navigateTo({
      url: '../vedio/vedio'
    })
  }
})
