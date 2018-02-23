/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://565209316.bestshow.club';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 获取所有选项公司的接口
        getCompanyUrl: `${host}/weapp/company`,

        //获取吐槽数据的接口
        getTucaoUrl: `${host}/weapp/tucaolist`,

        //关注或者取消关注的接口
        careUrl: `${host}/weapp/care`,

        //点赞的url
        zanUrl: `${host}/weapp/zan`,
        
        //丢大便的url
        caiUrl: `${host}/weapp/cai`,
    }
};

module.exports = config;