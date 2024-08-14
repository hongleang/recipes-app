<template>
  <div class="container">
    <div class="col-md-8 mx-auto mt-4">
      <div class="card">
        <div class="p-4">
          <h1 class="fs-4 fw-bold mb-4">Recipes</h1>
          <RecipeFilter v-model="filter" />
          <ul class="list-group">
            <template v-if="loading">
              <div class="spinner-border text-center" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </template>
            <template v-if="recipes.length === 0 && !loading">
              <li class="text-center text-muted">No recipes found</li>
            </template>
            <template v-if="recipes.length > 0">
              <li v-for="recipe in recipes" :key="recipe.id" class="list-group-item list-group-item-action">
                <router-link :to="{ name: 'recipes.show', params: { id: recipe.id } }">
                  <div class="row">
                    <div class="col-md-8">
                      <h3 class="fs-5">{{ recipe.title }}</h3>
                      <p>{{ recipe.description }}</p>
                    </div>
                  </div>
                </router-link>
              </li>
            </template>

          </ul>
          <Pagination class="mt-4" v-if="pagination" :pagination="pagination" @next="next" @prev="prev"
            @navigateToPage="navigateToPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import RecipeFilter from './partials/RecipeFilter.vue'

export default {
  components: {
    Pagination,
    RecipeFilter
  },

  mounted() {
    this.getRecipes({ params: { page: 1, per_page: 4 } })
  },

  computed: {
    ...mapState('recipes', ['recipes', 'pagination', 'loading']),

    filter:{
      get() {
        return ''
      },
      set(value) {
        const recipes = this.recipes.filter((r) => r.category.name.includes(value))
        this.$store.commit('recipes/setRecipes', recipes)
      }
    },
  },

  methods: {
    ...mapActions('recipes', ['getRecipes']),

    next() {
      this.getRecipes({ params: { page: this.pagination.next, per_page: 4 } })
    },

    prev() {
      this.getRecipes({ params: { page: this.pagination.prev, per_page: 4 } })
    },

    navigateToPage(page) {
      this.getRecipes({ params: { page, per_page: 4 } })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item-action {
  cursor: pointer;

  a {
    color: initial;
    text-decoration: none;

    &:hover {
      text-decoration: none;
      opacity: 0.94;
    }
  }
}
</style>
