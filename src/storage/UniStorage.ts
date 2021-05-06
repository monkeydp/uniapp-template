import {Container} from "typescript-ioc";
import StorageWrapper, {BaseStorageWrapper} from "@/storage/StorageWrapper";

class UniStorage implements Storage {

    [name: string]: any;

    get length() {
        return uni.getStorageInfoSync().keys.length
    }

    clear(): void {
        uni.clearStorageSync()
    }

    getItem(key: string): string | null {
        const value = uni.getStorageSync(key)
        if (value == "") return null
        return value;
    }

    key(index: number): string | null {
        const keys = uni.getStorageInfoSync().keys
        if (index < 0 || index + 1 > keys.length) return null
        return keys[index];
    }

    removeItem(key: string): void {
        uni.removeStorageSync(key)
    }

    setItem(key: string, value: string): void {
        uni.setStorageSync(key, value)
    }
}

const uniStorage = new UniStorage()

export abstract class UniStorageWrapper extends StorageWrapper {
}

class UniStorageWrapperImpl extends BaseStorageWrapper implements UniStorageWrapper {
    storage = uniStorage
}

Container.bind(UniStorageWrapper).to(UniStorageWrapperImpl)
