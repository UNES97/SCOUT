import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Import views
import ScoutingDashboard from './views/ScoutingDashboard.vue'
import PlayerDetail from './views/PlayerDetail.vue'
import Favorites from './views/Favorites.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: ScoutingDashboard
    },
    {
      path: '/player/:id',
      name: 'PlayerDetail',
      component: PlayerDetail
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    return { top: 0, behavior: 'smooth' }
  }
})

// Create app
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)

// Mount app
app.mount('#app')
