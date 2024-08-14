import { createRouter, createWebHistory } from 'vue-router'
import { RecipeIndex, RecipeShow } from '../views/recipes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/recipes'
    },
    {
      path: '/recipes',
      name: 'recipes.index',
      component: RecipeIndex
    },
    {
      path: '/recipes/:id',
      name: 'recipes.show',
      component: RecipeShow
    }
  ]
})

export default router
