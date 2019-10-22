import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        carts: [],
    },
    mutations: {
        insert: (state, payload) => {
            state.carts.push({
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: 1
            })
        },
        update: (state, payload) => {
            // mendeteksi payload ada di index keberapa?

            let idx = state.carts.indexOf(payload);
            // The splice() method adds/removes items to/from an array, and returns the removed item(s).
            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity
            });

            if (payload.quantity <= 0) {
                // menghapus item carts jika quantity-nya nol
                state.carts.splice(idx, 1)
            }


        }
    },
    actions: {
    },
    modules: {
    },
    getters: {
        carts: state => state.carts
    }
})
