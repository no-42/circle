import axios from "axios"
import axiosAdapterUniapp from 'axios-adapter-uniapp'
import message from "./message";
// 创建一个自定义的Axios对象
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const Axios = axios.create({
    baseURL: '/api_v3',
    adapter: axiosAdapterUniapp,
    timeout: 3000,
    /*也可以不设置Content-Type，影响是在你发送请求时
    Vue会先发送OPTIONS包探测路由是否存在，需要后端也做设置响应OPTIONS
    方法，否则会报跨域错误；我这里用的Beego2，路由里不响应OPTIONS方法，
    所以我在这块设置Content-Type*/
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'text/plain'
        'Content-Type': 'application/json;charset=UTF-8'
    },
    /*这个配置很重要，允许axios携带用户Cookie到后端，不设置这个的话
    Set-Cookie是无效的,除此之外,Chrome默认开启了SameSite检查，如果
    后端不主动设置SameSite = none,Set-Cookie是无效的。详情请文章末尾
    参考阮老师的SameSite讲解*/
    withCredentials: true
});

Axios.interceptors.request.use(req => {
    // 请求拦截处理
    console.log('这里是请求拦截器，我拦截了请求', req);
    return req;
}, err => {
    message.alert({title: '在发送请求时发生错误，错误为', msg: err});
    console.log('在发送请求时发生错误，错误为', err);
    //这里不能直接放回err,需要按照官方说明返回一个Promise
    return Promise.reject(err);
})

Axios.interceptors.response.use(res => {
    // 响应拦截处理
    console.log('响应拦截 ', res);
    return res.data;
}, error => {
    const err = error.toString();
    // 按照实际的响应包进行解析，通过关键字匹配的方式
    switch (true) {
        case err.indexOf('Network') !== -1:
            // message.alert({title: '后端服务器无响应', msg: err});
            console.log('后端服务器无响应', err);
            break;
        case err.indexOf('timeout') !== -1:
            message.alert({title: '请求后端服务器超时！', msg: err});
            console.log('请求后端服务器超时！', err);
            break;
    }
    // console.log(error)
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
})

//暴露Axios实例化对象，允许所有文件调用Axios
export default Axios;
