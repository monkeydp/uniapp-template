import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import store from '@/store'
import User from "@/model/User";
import {Inject} from "typescript-ioc";
import {UniStorageWrapper} from "@/storage/UniStorage";
import StorageKey from "@/storage/StorageKey";
import storageWrappers from "@/storage/StorageWrappers";
import berror from "biz-ts/src/error/BizError";

export abstract class UserSession {

    abstract user: User

    abstract userOrNull: User | null

    abstract isLogged: boolean

    abstract isNotLogged: boolean

    abstract activate(user: User): Promise<void>

    abstract clear(): Promise<void>
}

@Module({dynamic: true, namespaced: true, store, name: 'userSession'})
class UserSessionImpl extends VuexModule implements UserSession {

    @Inject
    private storage!: UniStorageWrapper

    private key = StorageKey.LOGGED_USER

    userOrNull = this.storage.getOrNull<User>(this.key)

    get user(){
        return this.userOrNull ?? berror("用户尚未登录")
    }

    isLogged = this.storage.exist(this.key)

    get isNotLogged() {
        return !this.isLogged
    }

    @Action
    async activate(user: User) {
        this.setUser(user)
        this.storage.set(this.key, user)
        this.setIsLogged(true)
    }

    @Action
    async clear() {
        this.removeUser()
        storageWrappers.forEach(storageWrapper => {
            storageWrapper.clear()
        })
        this.setIsLogged(false)
    }

    @Mutation
    private setUser(user: User) {
        this.userOrNull = user
    }

    @Mutation
    private setIsLogged(isLogged: boolean) {
        this.isLogged = isLogged
    }

    @Mutation
    private removeUser() {
        delete this.userOrNull
    }
}

const userSession: UserSession = getModule(UserSessionImpl)
export default userSession
