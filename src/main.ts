import Vue from 'vue'
import App from './App.vue'
import '@/style/uni.scss'
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import {toast} from "@/global";
import '@/platform/uniapp/interceptor'

axios.defaults.adapter = mpAdapter

Vue.config.productionTip = false
Vue.prototype.$toast = toast


new App().$mount()
