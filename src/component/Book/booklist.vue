<template>
    <view class="booklist-container">
        <view v-if="showEmptyText" class="top-text">
            一本书都没有
        </view>
        <view v-if="showLoadingText" class="top-text">
            加载中
        </view>

        <scroll-view scroll-y
                     @scrolltolower="handleScolltolower"
                     style="height: 90vh"
                     :scroll-top="scrollTop"
        >
            <uni-list v-for="(item, index) in list" :key="item.id">
                <uni-list-item :title="++index + '. ' + item.title"
                               :note="item.author"
                               clickable
                />
            </uni-list>
        </scroll-view>
    </view>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Inject} from "typescript-ioc";
    import Book from "@/model/Book";
    import Paging, {PagingQueryForm} from "biz-ts/src/api/Paging";
    import _ from 'lodash'
    import BookApi from "@/api/BookApi";

    @Component({})
    export default class Booklist extends Vue {

        @Inject
        private api!: BookApi

        private isLoading = true

        private list = new Array<Book>()

        private get showLoadingText() {
            return _.isEmpty(this.list) && this.isLoading
        }

        private get showEmptyText() {
            return _.isEmpty(this.list) && !this.isLoading
        }

        private paging = new Paging<Book>()

        @Prop() protected pqForm!: PagingQueryForm
        @Prop() protected emptyText!: string | undefined

        private async getPaging() {
            this.isLoading = true
            // @ts-ignore
            const paging = await this.api.paging(this.pqForm)
            this.isLoading = false
            return paging
        }

        private async nextPaging(reset = false) {
            this.paging = await this.getPaging()
            if (reset) this.list = []
            if (_.isEmpty(this.paging.content)) return

            const ids = this.list.map(item => {
                return item.id
            })
            this.paging.content.forEach(item => {
                if (!ids.includes(item.id))
                    this.list.push(item)
            })
        }

        private handleScolltolower() {
            if (this.pqForm.currentPage < this.paging.pageCount)
                this.$set(this.pqForm, "currentPage", this.pqForm.currentPage + 1)
            this.nextPaging()
        }

        private scrollTop = 0

        async refresh() {
            this.scrollTop = Math.random()
            await this.$nextTick()
            this.scrollTop = 0
            this.pqForm.currentPage = 1
            await this.nextPaging(true)
        }
    }
</script>

<style lang="scss">
    .booklist-container {
        width: 100%;
    }

    .top-text {
        text-align: center;
        margin-top: 20rpx;
        opacity: 0.5;
    }
</style>
