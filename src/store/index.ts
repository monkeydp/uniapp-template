import Vue from 'vue';
import Vuex from 'vuex';
import {UserSession} from "@/store/modules/UserSession";
import {config} from 'vuex-module-decorators'

config.rawError = true

Vue.use(Vuex);

export interface RootState {
    user: UserSession;
}

export default new Vuex.Store<RootState>({});
