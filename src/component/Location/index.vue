<template>
    <view class="location">
        <view style="padding: 0 28rpx">
            <image src="@/static/icon/location.png"
                   style="width: 38rpx; height: 38rpx; vertical-align: middle; margin-right: 10rpx"/>
            <span v-if="location!=null">{{location}}</span>
        </view>
    </view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {NULL_STRING} from "@/global";
    import {Inject} from 'typescript-ioc';
    import {UniStorageWrapper} from '@/storage/UniStorage';
    import StorageKey from "@/storage/StorageKey";
    import GetLocationSuccess = UniApp.GetLocationSuccess;

    @Component({})
    export default class Location extends Vue {

        @Inject
        private storage!: UniStorageWrapper

        private location: string | null = null

        private created() {
            this.location = this.getLocation()
        }

        private getLocation() {
            const location = this.storage.getOrNull<GetLocationSuccess>(StorageKey.LOCATION)
            if (location == null) return NULL_STRING
            const address = location.address as string
            let index = address.indexOf("区")
            if (index == -1) index = address.indexOf("市")
            if (index == -1) index = address.indexOf("省")
            if (index == -1) return address
            return address.substring(index + 1, address.length)
        }
    }
</script>

<style lang="scss">
</style>
