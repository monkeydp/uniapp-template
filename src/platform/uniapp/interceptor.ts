import {toast} from "@/global";

class FailUtil {
    static getCodeOrNull(result: any): string | null {
        let code: string | null = null
        const arr = result.errMsg.split(" ")
        if (arr.length == 2) code = arr[1]
        return code
    }

}

// @ts-ignore
uni.addInterceptor("getLocation", {
    fail: (result: any) => {
        const code = FailUtil.getCodeOrNull(result)
        let msg = `获取位置失败`
        if (code != null) msg = msg + `[${code}]`
        switch (code) {
            case "11":
                toast.error(`${msg}, 请打开定位权限`)
                break
            case "12":
                toast.error(`${msg}, 请检查当前网络`)
                break
            case "13":
                toast.error(`${msg}, 请稍后再试`)
                break
            case "14":
                toast.error(`${msg}, 请再次尝试`)
                break
            default:
                toast.error(`${msg}, 请检查定位权限和当前网络`)
                break
        }
    }
})

// @ts-ignore
uni.addInterceptor("scanCode", {
    fail: (result: any) => {
        const code = FailUtil.getCodeOrNull(result)
        let msg = `扫码失败`
        if (code != null) msg = msg + `[${code}]`
        switch (code) {
            case "10":
                // 用户取消
                break;
            case "11":
                toast.error(msg)
                break
        }
    }
})
