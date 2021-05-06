<template>
    <view class="my-container">
        <navbar title="我的"/>
        <uni-list>
            <uni-list-item :title="user.name"/>
        </uni-list>
    </view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Navbar from "@/component/Navbar/index.vue";
    import {Inject} from "typescript-ioc";
    import Initializer from "@/Initializer";
    import userSession from "@/store/modules/UserSession";
    import UserApi from "@/api/UserApi";
    import User from "@/model/User"

    @Component({
        components: {
            Navbar,
        }
    })
    export default class My extends Vue {

        @Inject
        private initializer!: Initializer

        @Inject
        private userApi!: UserApi

        private get user() {
            return userSession.userOrNull ?? new User()
        }

        private async refresh() {
            await this.$nextTick()
            const user = await this.userApi.info()
            userSession.activate(user)
        }

        private async onShow() {
            await this.initializer.init()
        }

        private async onPullDownRefresh() {
            await this.refresh()
            uni.stopPullDownRefresh()
        }
    }
</script>

<style lang="scss">
    .my-container {
        width: 100%;
    }
</style>
