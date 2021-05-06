import {BastToast, ToastOption} from "biz-ts/src/util/Toast";

export default class ToastImpl extends BastToast {

    // ms
    private static DEFAULT_DURATION = 1500

    private calcDuration(autoClose: boolean) {
        if (autoClose) return ToastImpl.DEFAULT_DURATION
        else return 60 * 60 * 1000
    }

    info(message: any, option: ToastOption = new ToastOption()): void {
        uni.showToast({
            title: message.toString(),
            icon: "none",
            duration: this.calcDuration(option.autoClose),
        })
    }

    warn(message: any, option: ToastOption = new ToastOption()): void {
        uni.showToast({
            title: message.toString(),
            icon: "none",
            duration: this.calcDuration(option.autoClose),
        })
    }

    error(message: any, option: ToastOption = new ToastOption()): void {
        uni.showToast({
            title: message.toString(),
        })
    }
}
