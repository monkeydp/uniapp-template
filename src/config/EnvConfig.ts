class EnvConfig {
    private env = process.env
    readonly backend = {
        baseUrl: this.env.VUE_APP_BACKEND_BASE_URL as string
    }
    readonly dingtalk = {
        corpId: this.env.VUE_APP_DINGTALK_CORP_ID as string
    }
}

const envconfig = new EnvConfig()
export default envconfig

