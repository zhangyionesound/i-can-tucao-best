//app.js
var qcloud = require('/vendor/wafer2-client-sdk/index')
var config = require('/config')
var util = require('/utils/util.js')

App({
    onLaunch: function () {
      var that = this;
      qcloud.setLoginUrl(config.service.loginUrl)
      this.login()
    },
    /**
     * 用户登录模块
     */
    login: function () {
      if (this.globalData.logged) return
      util.showBusy('正在登录')
      var that = this
      // 调用登录接口
      qcloud.login({
        success(result) {
          if (result) {
            util.showSuccess('登录成功1')
            that.globalData.userInfo = result;
            that.globalData.logged = true;
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.requestUrl,
              login: true,
              success(result) {
                util.showSuccess('登录成功2')
                that.globalData.userInfo = result.data.data;
                that.globalData.logged = true;
              },
              fail(error) {
                util.showModel('请求失败', error)
                console.log('request fail', error)
              }
            })
          }
        },
        fail(error) {
          util.showModel('登录失败', error)
          console.log('登录失败', error)
        }
      })
    },
    globalData: {
      userInfo: null,
      logged: false,
      takeSession: false,
      requestResult: '',
      tooken:null,
      uid:null,
      companyArray:[],
      allCompanyArray:[],
      companyNameArray:[],
      //没有数据的时候，点击吐槽，带过去对应的公司id
      companyId:'',
    }
})