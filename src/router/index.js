import { createRouter, createWebHistory } from 'vue-router'

import SearchView from '../views/SearchView.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'search',
        component: SearchView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
]

const router = createRouter({ 
    history: createWebHistory(),
    routes
})

export default router