import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../views/Landing.vue'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/landing',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Auth/Login.vue')
    },
    {
      path: '/:id',
      name: 'Profile',
      component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),


    },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ '../components/Tabs/tabs.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/landing')
  } else {
    next()
  }

})



export default router
