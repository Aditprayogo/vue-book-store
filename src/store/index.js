import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart'
import alert from '@/store/alert'
import auth from '@/store/auth'
import dialog from '@/store/dialog'
import region from '@/store/region'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        prevUrl: ''
    },
    mutations: {
        setPrevUrl: (state, value) => {
            state.prevUrl = value
        }
    },
    actions: {
        setPrevUrl: ({ commit }, value) => {
            commit('setPrevUrl', value)
        }
    },
    modules: {
        cart,
        alert,
        auth,
        dialog,
        region
    },
    getters: {
        prevUrl: state => state.prevUrl
    }
})
