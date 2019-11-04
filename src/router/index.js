import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)



const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Categories.vue')
    },
    {
        path: '/books',
        name: 'books',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Books.vue')
    },
    {
        path: '/category/:slug',
        name: 'category',
        component: () => import( /* webpackChunkName: "category" */'../views/Category.vue')
    },
    {
        path: '/book/:slug',
        name: 'book',
        component: () => import( /* webpackChunkName: "book" */
            '../views/Book.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import( /* webpackChunkName: "checkout" */
            '../views/Checkout.vue'),
        meta: { auth: true } // penandanya ini gans
    },



]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // jika routing ada meta auth-nya maka
    if (to.matched.some(record => record.meta.auth)) {
        // jika user adalah guest
        if (store.getters['auth/guest']) {
            // tampilkan pesan bahwa harus login dulu
            store.dispatch('alert/set', {
                status: true,
                text: 'Login first',
                color: 'error',
            })
            // tampilkan form login
            store.dispatch('setPrevUrl', to.path)
            store.dispatch('dialog/setComponent', 'login')
            store.dispatch('dialog/setStatus', true)
        }
        else {
            next()
        }
    }
    else {
        next()
    }
})


export default router
