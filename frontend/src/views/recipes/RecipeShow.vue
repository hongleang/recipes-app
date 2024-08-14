<template>
  <div v-if="recipe" class="col-md-8 col-lg-6 mx-auto mt-4">
    <div class="card">
      <div class="p-4">
        <div class="row">
          <div class="col-md-8">
            <h1 class="fs-4 fw-bold">{{ recipe.title }}</h1>
            <p class="fs-6 text-muted">{{ recipe.category?.name }}</p>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-sm" 
              :class="{ 'btn-primary': isInCart(recipe.id), 'btn-outline-primary': !isInCart(recipe.id) }">
              <i class="fas fa-bag-shopping me-2"></i>
              Add to Shopping Cart
            </button>
          </div>
        </div>


        <p class="text-muted">{{ recipe.description }}</p>

        <h4>Ingredients</h4>
        <ul class="list-group list-group-flush">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.name" class="list-group-item">
            <div class="hstack">
              {{ ingredient.name }}
              <div class="vr ms-auto"></div>
              <span class="badge bg-primary rounded-pill ms-3">{{ ingredient.quantity }}</span>
            </div>
          </li>
        </ul>


        <h4 class="mt-4">Instructions</h4>
        <ul>
          <li v-for="step in recipe.instructions" :key="step">{{ step }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  created() {
    this.$watch(
      () => this.$route.params.id,
      this.getData,
      { immediate: true }
    )
  },

  computed: {
    ...mapState('recipes', ['recipe'])
  },

  methods: {
    ...mapActions('recipes', ['getRecipe']),

    getData() {
      this.getRecipe({ id: this.$route.params.id })
    },

    isInCart(recipeId) {
      return false
    }
  }
}
</script>

<style lang="scss" scoped></style>