<script lang="ts">
    import {errorHandler} from "@/error/ErrorHandler";
    import {Component, Vue} from 'vue-property-decorator'

    @Component({
        extends: {
            mpType: 'app'
        }
    })
    export default class Index extends Vue {

        onError(err: object) {
            errorHandler.handle(err)
        }

        onHide() {
            // userSession.clear()
        }
    }
</script>

<style>
    /*每个页面公共css */
</style>
