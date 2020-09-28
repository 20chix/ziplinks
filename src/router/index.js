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
      component: () => import(/* webpackChunkName: "about" */ '../components/Auth/Login.vue')
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
