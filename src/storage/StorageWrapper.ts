import {Container, Singleton, Inject} from "typescript-ioc";
import ierror from "tools-ts/src/error/InnerError";
import {UniStorageWrapper} from "@/storage/UniStorage";

@Singleton
export default abstract class StorageWrapper {

    abstract length: number

    abstract set<T>(key: string, value: T): void

    abstract get<T>(key: string): T

    abstract getOrNull<T>(key: string): T | null

    abstract remove(key: string): void

    abstract exist(key: string): boolean

    /**
     * Clear all key/value pairs in storage
     */
    abstract clear(): void
}

export abstract class BaseStorageWrapper extends StorageWrapper {

    protected abstract storage: Storage

    get length() {
        return this.storage.length
    }

    get<T>(key: string): T {
        const value = this.getOrNull(key)
        if (value == null) ierror(`键 ${key} 不存在对应的值`)
        return value as T
    }

    getOrNull<T>(key: string): T | null {
        const item = this.storage.getItem(key)
        if (item == null) return null
        let value: T
        try {
            value = JSON.parse(item)
        } catch (e) {
            value = item as unknown as T
        }
        return value
    }

    remove(key: string): void {
        this.storage.removeItem(key.toString())
    }

    set<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value))
    }

    exist(key: string): boolean {
        return this.getOrNull(key) != null
    }

    clear(): void {
        this.storage.clear()
    }
}
