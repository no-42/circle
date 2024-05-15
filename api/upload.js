export function uploadImg(filePath, successF, failF) {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: 'api_v3/upload/pic',
            filePath: filePath,
            success: (uploadFileRes) => {
                resolve(successF(eval("(" + uploadFileRes.data + ")")))
            },
            fail: () => {
                reject(failF())
            }
        });
    })
}
