<template>
    <view class="home-container">
        <navbar title="主页"/>
        <booklist
                ref="booklist"
                :pq-form="pqForm"
        />
    </view>
</template>

<script lang="ts">
    import {Component, Ref, Vue} from 'vue-property-decorator';
    import Navbar from "@/component/Navbar/index.vue";
    import Location from "@/component/Location/index.vue";
    import Booklist from "@/component/Book/booklist.vue";
    import {PqForm} from "biz-ts/src/api/Paging";
    import {Inject} from "typescript-ioc";
    import Initializer from "@/Initializer";

    @Component({
        components: {
            Navbar,
            Location,
            Booklist,
        }
    })
    export default class Home extends Vue {

        @Inject private initializer!: Initializer

        @Ref() private booklist!: Booklist

        private pqForm = new PqForm(1, 20)

        private async refresh() {
            await this.$nextTick()
            await this.booklist?.refresh()
        }

        private async onShow() {
            await this.initializer.init()
            await this.refresh()
        }

        private async onPullDownRefresh() {
            await this.refresh()
            uni.stopPullDownRefresh()
        }
    }
</script>

<style lang="scss">
    .home-container {
        width: 100%;
    }
</style>
