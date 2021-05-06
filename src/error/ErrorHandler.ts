import {FailResult} from "biz-ts/src/api/Result";
import {InnerError, isInnerError} from "tools-ts/src/error/InnerError";
import ErrorCode from "@/error/ErrorCode";
import _ from 'lodash';
import {BizError, isBizError} from "biz-ts/src/error/BizError";
import {isQuietError} from "tools-ts/src/error/QuietError";
import {toast} from "@/global";
import userSession from "@/store/modules/UserSession";
import {Container, Inject, Singleton} from "typescript-ioc";
import UserApi from "@/api/UserApi";

@Singleton
export default abstract class ErrorHandler {
    abstract handle(obj: unknown): void
}

export class ErrorHandlerImpl extends ErrorHandler {

    @Inject
    private userApi!:UserApi

    handle(obj: unknown) {
        if (typeof obj == "string") {
            toast.error(obj)
            return
        }

        if (obj instanceof FailResult) {
            this.handleFailResult(obj as FailResult)
            return
        }

        if (isQuietError(obj)) {
            console.debug("静默错误已忽略", obj)
            return
        }

        if (isBizError(obj)) {
            this.handleBizError(obj)
            return
        }

        if (isInnerError(obj)) {
            this.handleInnerError(obj)
            return
        }

        toast.error(JSON.stringify(obj), {
            autoClose: false
        })
    }

    private async handleFailResult(result: FailResult) {

        if (result.code == ErrorCode.USER_NOT_LOGIN) {
            toast.info("登录已失效, 自动登录中...")
            await userSession.clear()
            await this.userApi.login()
            return
        }

        let msg: string
        if (!_.isEmpty(result.msg)) msg = result.msg
        else msg = "<无错误信息>"
        toast.error(msg)
    }

    private handleBizError(error: BizError) {
        toast.error(error.message)
    }

    private handleInnerError(error: InnerError) {
        toast.error(error.message)
        console.log("前端内部错误", error)
    }
}

Container.bind(ErrorHandler).to(ErrorHandlerImpl)
export const errorHandler = Container.get(ErrorHandler)
