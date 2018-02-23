// pages/care/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyArray:''
  },
  /**
   * 去广场
   */
  gotoSquare:function(){
    wx.switchTab({
      url: "/pages/start/start"
    });
  },
  /**
   * 关注或者取消关注
   */
  toCarethis:function (e){
    //console.log(e.currentTarget.dataset.id)
    var that = this;
    qcloud.request({
      url: config.service.careUrl,
      login: false,
      data: {
        id: e.currentTarget.dataset.id
      },
      method: "POST",
      success(result) {
        //console.log(result)
        if (result.data.code && result.data.code == 1) {
          // wx.showModal({
          //   title: '操作成功',
          //   content: '你可以继续关注或者去围观',
          //   cancelText: '去围观',
          //   cancelColor: '#3CC51F',
          //   confirmText:'继续选择',
          //   confirmColor:'#000000',
          //   success: function (res) {
          //     if (res.confirm) {
          //       // console.log('用户点击确定')
          //     } else if (res.cancel) {
          //       // console.log('用户点击取消')
          //       wx.switchTab({
          //         url: "/pages/start/start"
          //       });
          //     }
          //   }
          // })
          that.setData({
            companyArray: result.data.data
          })
          app.globalData.allCompanyArray = result.data.data;
          //console.log(app.globalData.allCompanyArray);
          app.globalData.companyArray = [];
          result.data.data.forEach(function (e) {
            if (e.f_care_flag == 1) {
              app.globalData.companyArray.push(e);
            }
          })
        }
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      companyArray: app.globalData.allCompanyArray 
    })
    //console.log(that.data.companyArray)
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
  
  }
})