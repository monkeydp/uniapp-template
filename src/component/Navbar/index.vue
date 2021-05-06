<template>
    <view class="navbar">
        <view class="status-bar"/>
        <view class="navbar-box">
            <view class="navbar-content" :style="{ width: barWidth * 2 +'rpx' }">
                <span style="font-weight: 700">{{title}}</span>
                <slot/>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import GetSystemInfoResult = UniApp.GetSystemInfoResult;

    @Component({})
    export default class Navbar extends Vue {

        @Prop() title!: string | undefined

        barWidth = 200

        private async created() {
            let result = await uni.getSystemInfoSync() as GetSystemInfoResult
            this.barWidth = result.windowWidth - 87           // Navbar 可操作宽度 = 屏幕宽度 - 小程序右上角的胶囊宽度（87）
        }
    }
</script>

<style lang="scss">
    $status-bar-height: var(--status-bar-height);
    $navbar-box-height: 48px;

    @supports (-webkit-touch-callout: none) {
        /* CSS specific to iOS devices */
        $navbar-box-height: 48;
    }

    @supports not (-webkit-touch-callout: none) {
        /* CSS for other than iOS devices */
        $navbar-box-height: 44;
    }

    $navbar-height: calc(#{$status-bar-height} + #{$navbar-box-height});

    .navbar {
        width: 100%;
        height: $navbar-height;
    }

    .status-bar {
        width: 100%;
        height: $status-bar-height;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #FFFFFF;
        z-index: 999;
    }

    .navbar-box {
        width: 100%;
        height: $navbar-box-height;
        position: fixed;
        top: $status-bar-height;
        left: 0;
        right: 0;
        background-color: #FFFFFF;
        padding: 0 8px;
        z-index: 999;

        .navbar-content {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
</style>
