// pages/add/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    requestResult: '',
    tucao: '',
    company: [],
    companyIdArray: [],
    companyId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var companyIdArray = []
    that.setData({
      company: app.globalData.allCompanyArray
    })
    //console.log(that.data.company,app.globalData.companyArray)
    that.data.company.forEach(function (e) {
      companyIdArray.push(e.f_id);
    })
    this.setData({
      companyIdArray: companyIdArray
    });
    //console.log(that.data.companyIdArray)
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
    var that = this
    //console.log(app.globalData.companyId);
    if (app.globalData.companyId) {
      app.globalData.allCompanyArray.forEach(function (e, i) {
        if (e.f_id == app.globalData.companyId) {
          that.setData({
            companyId: i
          })
        }
      })
      app.globalData.companyId = '';
    }
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
   * 提交到后台的吐槽数据
   */
  bindFormSubmit: function (e) {
    //console.log(e.detail.value.textarea)
    var that = this
    //console.log(that.data.companyIdArray)
    if (e.detail.value.textarea == '') {
      util.showModel('吐你一脸...', '不写点什么，准备用意念吐槽吗？')
      return
    }
    var selector = that.data.companyIdArray[e.detail.value.selector];
    //console.log(e.detail.value.selector,selector);
    if (!e.detail.value.selector || typeof (selector) == 'undefined') {
      util.showModel('你要吐槽谁？', '不选一下公司吗？')
      return
    }
    var that = this
    util.showBusy('吐槽数据传送中...')
    qcloud.request({
      url: `${config.service.host}/weapp/add`,
      data: {
        text: e.detail.value.textarea,
        companyId: selector
      },
      method: "POST",
      login: true,
      success(result) {
        //console.log(result)
        //一天如果吐槽太多次，达到上限就不能吐槽了
        if (result.data.code && result.data.code == -2) {
          //不要把内容清空，感觉体验不好
          util.showModel('吐槽太多了', '每天适度吐槽才有利于身心健康');
        }
        //吐槽成功跳转去前台
        else if (result.data.code && result.data.code == 1) {
          //吐槽完成继续吐槽，或者去看看自己的吐槽？
          util.showSuccess('吐槽完成')
          //吐槽完成继续吐槽，或者去看看自己的吐槽？
          wx.showModal({
            title: '吐槽完成',
            content: '你可以去围观或者继续吐槽',
            cancelText: '去围观',
            cancelColor: '#3CC51F',
            confirmText: '继续吐槽',
            confirmColor: '#000000',
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
              } else if (res.cancel) {
                // console.log('用户点击取消')
                wx.switchTab({
                  url: "/pages/start/start"
                });
              }
            }
          })
          //重新获取关注公司的数据，更新到全局变量中
          app.globalData.allCompanyArray = result.data.data;
          //console.log(app.globalData.allCompanyArray);
          app.globalData.companyArray = [];
          result.data.data.forEach(function (e) {
            if (e.f_care_flag == 1) {
              app.globalData.companyArray.push(e);
            }
          })
          //发表成功了之后，把吐槽的信息置为空
          that.setData({
            tucao: ''
          });
        } else {
          util.showModel('吐槽失败', '可能是代码遇到了什么前所未有的打击，正在修复中');
        }
      },
      fail(error) {
        console.log(error);
        util.showModel('吐槽失败，可能是代码遇到了什么前所未有的打击，正在修复中', error);
        console.log('request fail', error);
      }
    })

  },
  /**
   * 
   */
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

})