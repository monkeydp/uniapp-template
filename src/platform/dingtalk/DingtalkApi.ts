import dd from "dingtalk-jsapi";
import {Container, Singleton} from "typescript-ioc";
import envconfig from "@/config/EnvConfig";

@Singleton
export default abstract class DingtalkApi {

    abstract getAuthCodeOrNull(): Promise<string | null>
}

export class DingtalkApiImpl extends DingtalkApi {

    private config = envconfig.dingtalk

    async getAuthCodeOrNull(): Promise<string | null> {
        const result = await dd.runtime.permission.requestAuthCode({
            corpId: this.config.corpId
        });
        if (result.code == undefined) return null
        return result.code
    }
}

Container.bind(DingtalkApi).to(DingtalkApiImpl)
