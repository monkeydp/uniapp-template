import {Container, Inject, Singleton} from "typescript-ioc";
import BaseApi from './BaseApi';
import User from "@/model/User";
import DingtalkApi from "@/platform/dingtalk/DingtalkApi";
import StorageKey from "@/storage/StorageKey";
import userSession from "@/store/modules/UserSession";
import {toast} from "@/global";

@Singleton
export default abstract class UserApi {

    abstract login(): Promise<void>

    abstract info(): Promise<User>
}

class UserApiImpl extends BaseApi implements UserApi {

    protected urlPrefix = 'user'

    @Inject
    private dingtalkApi!: DingtalkApi

    private mockUser = {
        id: '1',
        name: "张三",
        dingtalkUser: {
            id: '1',
            name: "张三",
            rawId: "",
        }
    }

    async login(): Promise<void> {
        // #ifdef MP-DINGTALK
        await this.ddlogin()
        return
        // #endif

        this.mockLogin()
    }

    private mockLogin() {
        this.storage.set(StorageKey.TOKEN, "abc123")
        userSession.activate(this.mockUser)
    }

    private async ddlogin(): Promise<void> {
        const code = await this.dingtalkApi.getAuthCodeOrNull()
        if (code == null) {
            toast.error("无法登录, 获取授权码失败")
            return
        }
        const result: DDLoginResult = await this.axios.post('ddlogin', {code: code})
        this.storage.set(StorageKey.TOKEN, result.token)
        userSession.activate(result.user)
    }

    async info(): Promise<User> {
        return this.mockUser
    }
}

Container.bind(UserApi).to(UserApiImpl)

export class DDLoginResult {
    token!: string
    user!: User
}
