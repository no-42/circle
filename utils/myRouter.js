function buildUrl(url, param) {
    if (param) {
        url = url + "?"
        let keys = Object.keys(param);
        for (let i = 0; i < keys.length; i++) {
            url = url + keys[i] + "=" + param[keys[i]]
            if (i + 1 < keys.length) {
                url = url + "&"
            }
        }
    }
    return url
}

export function simpleNavigateTo(url, param,success) {
    url = buildUrl(url, param)
    let obj = {
        url
    }
    if (success) {
        obj.success = success
    }
    uni.navigateTo(obj)
}

export function simpleSwitchTab(url, param) {
    url = buildUrl(url, param)
    uni.switchTab({
        url
    })
}

export function simpleNavigateBack(num) {
    let ref = {}
    if (num) {
        ref.delta = num
    }
    uni.navigateBack(ref)
}

