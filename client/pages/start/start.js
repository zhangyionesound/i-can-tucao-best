// pages/start/start.js
//获取应用实例
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
    categories: [],
    activeCategoryId: 0,
    tucaoData: [],
    newUser: 0,
    nameArray: [],
    nodata:0,
    shuaXinFlag:0
  },
  /**
   * 点踩的函数
   */
  caiClick: function (e) {
    //console.log(1111, e.currentTarget.dataset.id)
    //发送http请求到后台，给这个评论点赞
    var that = this;
    qcloud.request({
      url: config.service.caiUrl,
      login: false,
      data: {
        id: e.currentTarget.dataset.id
      },
      method: "POST",
      success(result) {
        //console.log(result)
        //如何局部渲染点赞数呢？用js实现吧
        if (result.data.code && result.data.code == 1) {
          // if (result.data.data == 1){
          //   util.showSuccess('点赞成功')
          // }else{
          //   util.showSuccess('取消点赞')
          // }
          that.showData(that.data.activeCategoryId);
        }
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })
  },
  /**
   * 点赞的函数
   */
  zanClick: function (e) {
    //console.log(1111,e.currentTarget.dataset.id)
    //发送http请求到后台，给这个评论点赞
    var that = this;
    qcloud.request({
      url: config.service.zanUrl,
      login: false,
      data: {
        id: e.currentTarget.dataset.id
      },
      method: "POST",
      success(result) {
        //console.log(result)
        //如何局部渲染点赞数呢？用js实现吧
        if (result.data.code && result.data.code == 1) {
          // if (result.data.data == 1){
          //   util.showSuccess('点赞成功')
          // }else{
          //   util.showSuccess('取消点赞')
          // }
          that.showData(that.data.activeCategoryId);
        }
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })
  },
  /**
   * 切换公司的函数，要变换下边的红线和请求不同的数据
   */
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.showData(this.data.activeCategoryId);
  },

  /**
   * 显示吐槽信息-根据categoryId-数字
   */
  showData: function (categoryId) {
    if (categoryId == 0) {
      categoryId = "";
    }
    //console.log(categoryId)
    var that = this;
    qcloud.request({
      url: config.service.getTucaoUrl,
      login: false,
      data: {
        categoryId: categoryId
      },
      method: "POST",
      success(result) {
        //console.log(result, that.data.categories)
        if (result.data.code && result.data.code == 1) {
          if (result.data.data.length) {
            //console.log(22, result.data.data, that.data.nodata)
            that.setData({
              tucaoData: result.data.data,
              nodata: 0,
              shuaXinFlag: 0
            })
          } else {
            //console.log(111, result.data.data, that.data.nodata)
            that.setData({
              tucaoData: result.data.data,
              nodata: 1,
              shuaXinFlag: 0
            })
          }
        }else{
          //console.log(111222)
          util.showModel('请求失败002', error)
        }
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })

  },
  /**
   * 跳转到去吐槽页面
   */
  gotoTuCao: function () {
    wx.switchTab({
      url: "/pages/add/index"
    });
  },
  /**
   * 跳转到去吐槽页面
   */
  gotoTuCaoCompany: function (e) {
    app.globalData.companyId = e.currentTarget.dataset.id;
    wx.switchTab({
      url: "/pages/add/index"
    });
  },
  /**
   * 跳转到去关注页面
   */
  gotoCare: function () {
    wx.navigateTo({
      url: "/pages/care/index"
    })
  },
  /**
   * 
   */
  shuaxin: function(){
    this.onShow()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var categories = [];
    categories = [{ f_id: "0", f_name: "全部" }];

    //请求所有的公司函数
    qcloud.request({
      url: config.service.getCompanyUrl,
      login: false,
      success(result) {
        //console.log(result)
        if (result.data.code && result.data.code == 1) {
          app.globalData.allCompanyArray = result.data.data;
          app.globalData.companyArray = [];
          result.data.data.forEach(function (e) {
            //初始化用户关心的数组
            if (e.f_care_flag == 1) {
              app.globalData.companyArray.push(e);
            }
            //赋值company_id与company_name的数据
            app.globalData.companyNameArray[e.f_id] = e.f_name;
          })
          //初始化这个页面，如果companyArray是空，说明没有关注的公司，提醒用户去吐槽或者关注公司
          //console.log(app.globalData.companyArray);
          if (app.globalData.companyArray == '') {
            // console.log(111)
            that.setData({
              newUser: 1
            })
          } else {
            //如果companyArray不为空，那么就显示关注的公司以及对应的吐槽
            //console.log(app.globalData.companyArray);
            app.globalData.companyArray.forEach(function (e) {
              categories.push(e);
            })
            //console.log(categories);
            //setData执行成功之后，执行获取数据的ajaxthat.showData(0)
            that.setData({
              newUser: 0,
              categories: categories,
              activeCategoryId: 0
            }, that.showData(0));
            //console.log(that.data.categories)
          }
        }else{
          that.setData({
            shuaXinFlag: 1
          });
        }
      },
      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    })
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
    var that = this
    wx.stopPullDownRefresh()
    that.showData(that.data.activeCategoryId)
    wx.showModal({
      title: '刷新成功',
      content: '看看有没有新数据吧',
      showCancel: false
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showModal({
      title: '到底啦',
      content: '已经没有更多数据啦，太久的吐槽，系统会忘掉的',
      showCancel: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})