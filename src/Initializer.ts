import {Container, Inject, Singleton} from "typescript-ioc";
import userSession from "@/store/modules/UserSession";
import {toast} from "@/global";
import UserApi from "@/api/UserApi";
import GetLocationSuccess = UniApp.GetLocationSuccess;
import {UniStorageWrapper} from "@/storage/UniStorage";
import StorageKey from "@/storage/StorageKey";

@Singleton
export default abstract class Initializer {

    abstract init(): Promise<void>
}

class InitApiImpl implements Initializer {

    @Inject
    private userApi!: UserApi

    @Inject
    private storage!: UniStorageWrapper

    async init() {
        if (userSession.isNotLogged) {
            toast.info("自动登录中...")
            await this.userApi.login()
        }
        await this.setLocation()
    }

    private async setLocation() {
        // @ts-ignore
        const [error, result] = await uni.getLocation({})
        if (result == null) this.storage.remove(StorageKey.LOCATION)
        else this.storage.set(StorageKey.LOCATION, result as GetLocationSuccess)
    }
}

Container.bind(Initializer).to(InitApiImpl)
