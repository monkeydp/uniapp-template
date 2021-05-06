<template>
    <view class="scan-container">

        <navbar title="扫码"/>

        <button type="primary" @click="scancodeAndQueryBook">
            扫码找书
        </button>

        <view class="info">
            <view>
                <span class="label">扫码结果</span>
                <span class="value">{{scanresult}}</span>
            </view>
        </view>

        <view>
            <view class="info">

                <uni-row>
                    <uni-col :span="16">
                        <view v-if="bookOrNull!=null">
                            <view>
                                <span class="label">标题</span>
                                <span class="value">{{book.title}}</span>
                            </view>
                            <view>
                                <span class="label">作者</span>
                                <span class="value">{{book.author}}</span>
                            </view>
                            <view>
                                <span class="label">ISBN</span>
                                <span class="value">{{book.isbn}}</span>
                            </view>
                            <view>
                                <span class="label">出版社</span>
                                <span class="value">{{book.publisher}}</span>
                            </view>
                        </view>
                    </uni-col>
                    <uni-col :span="7" :offset="1">
                        <image v-if="bookOrNull!=null"
                               :src="book.picture"
                               style="width: 100%"
                               mode="widthFix"
                        />
                    </uni-col>
                </uni-row>

                <view v-if="bookOrNull!=null">
                    <span class="label">简介</span>

                    <view style="height: 195rpx; overflow-y: auto">
                        {{book.summary}}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Inject} from "typescript-ioc";
    import {NULL_STRING, toast} from "@/global";
    import Book from "@/model/Book";
    import Navbar from "@/component/Navbar/index.vue";
    import Location from "@/component/Location/index.vue"
    import Initializer from "@/Initializer";
    import BookApi from "@/api/BookApi";
    import ScanCodeSuccessRes = UniApp.ScanCodeSuccessRes;

    @Component({
        components: {
            Navbar,
            Location,
        }
    })
    export default class Scan extends Vue {

        @Inject private initializer!: Initializer

        @Inject
        private bookApi!: BookApi

        private bookOrNull: Book | null = null

        private get book(): Book {
            return this.bookOrNull ?? new Book()
        }

        // 扫码结束后, 也会触发
        private async onShow() {
            await this.initializer.init()

            if (this.isValidIsbn())
                await this.queryBook()
        }

        private async queryBook(isbn: string = this.scanresult) {
            this.bookOrNull = await this.bookApi.query(isbn)
        }

        private scanresult = NULL_STRING

        private async scancodeAndQueryBook() {
            // #ifdef H5
            await this.queryBook()
            return
            // #endif

            // @ts-ignore
            let [error, result] = await uni.scanCode({})
            if (result == null) return
            const res = result as ScanCodeSuccessRes
            this.scanresult = res.result
            const isbn = Number(this.scanresult)
            if (isNaN(isbn)) {
                toast.error(`请扫描书本背面的 ISBN 条形码`)
                return
            }

            if (!this.isValidIsbn(this.scanresult)) {
                toast.error("只支持 10 位或 13 位的 ISBN 查询")
                return
            }
        }

        private isValidIsbn(isbnString = this.scanresult) {
            const length = isbnString.length
            const isbn = Number(isbnString)
            if (isNaN(isbn) || (length != 10 && length != 13)) return false
            return true
        }

        private async onPullDownRefresh() {
            if (this.bookOrNull != null)
                await this.queryBook(this.book.isbn)

            uni.stopPullDownRefresh()
        }
    }
</script>

<style lang="scss">
    .scan-container {
        width: 100%;

        .info {
            .label {
                width: 128rpx;
            }
        }
    }
</style>
