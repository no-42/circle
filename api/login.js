import request from "../utils/request";

export function register(registerType, userName, userPhoneOrEmail, password) {
    return request({
        url: "/member/add",
        data: {
            name: userName,
            phone: registerType === 'phone' ? userPhoneOrEmail : undefined,
            email: registerType === 'email' ? userPhoneOrEmail : undefined,
            password: password
        },
        method: 'post'
    })
}

export function login(name, password) {
    return request({
        url: "/login",
        method: "get",
        params: {
            name,
            password
        }
    })
}

export default {
    register,
    login
}
