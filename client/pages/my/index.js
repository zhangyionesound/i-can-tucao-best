// pages/my/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 关于我们的小程序
   */
  aboutUs: function () {
    wx.showModal({
      title: '关于我',
      content: '个人开发，私事联系289413620@qq.com',
      showCancel: false
    })
  },
  /**
   * 建议
   */
  advise: function () {
    wx.showModal({
      title: '建议',
      content: '在广场的+号里面，可以关注“这个小程序”，直接吐槽就好，我会看到',
      showCancel: false
    })
  },
  /**
   * 关注更多公司
   */
  care: function() {
    wx.navigateTo({
      url: "/pages/care/index"
    })
  }
  
})