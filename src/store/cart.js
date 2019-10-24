export default {
    namespaced: true,
    state: {
        carts: []
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

            // cek id nya ada atau tidak di carts
            let idx = state.carts.indexOf(payload);
            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity
            });
            if (payload.quantity <= 0) {
                state.carts.splice(idx, 1)
            }

        }
    },
    actions: {
        add: ({ state, commit }, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)
            if (!cartItem) {
                // jika cart item tidak ada maka di insert
                commit('insert', payload)
            }
            else {
                // jika ada maka akan di update
                cartItem.quantity++
                commit('update', cartItem)
            }
        }

    },
    getters: {
        carts: state => state.carts
    }

}