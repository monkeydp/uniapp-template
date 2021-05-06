import BaseAxiosApi from "biz-ts/src/api/BaseAxiosApi";
import envconfig from "@/config/EnvConfig";
import {AxiosRequestConfig} from "axios"
import {FailResult} from 'biz-ts/src/api/Result';
import {errorHandler} from "@/error/ErrorHandler";
import {UniStorageWrapper} from "@/storage/UniStorage";
import {Inject} from "typescript-ioc";
import StorageKey from "@/storage/StorageKey";
import GetLocationSuccess = UniApp.GetLocationSuccess;

export default abstract class BaseApi extends BaseAxiosApi {

    @Inject
    protected storage!: UniStorageWrapper

    protected axiosRequestConfig(): AxiosRequestConfig {
        return {
            baseURL: this.baseUrl(),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
    }

    protected baseUrl(): string {
        return envconfig.backend.baseUrl
    }

    protected handleFailResult<T>(result: FailResult): Promise<T> {
        errorHandler.handle(result)
        return Promise.reject(result)
    }

    protected getHeaders(): object | null {
        return {
            authorization: this.getAuthorization(),
            gcs: this.getGcs(),
            dingtalk: JSON.stringify(envconfig.dingtalk)
        }
    }

    protected getAuthorization(): string | null {
        return this.storage.getOrNull(StorageKey.TOKEN)
    }

    protected getGcs(): string | null {
        const location = this.storage.getOrNull<GetLocationSuccess>(StorageKey.LOCATION)
        if (location == null) return null
        return JSON.stringify({
            longitude: location.longitude,
            latitude: location.latitude,
        })
    }
}

