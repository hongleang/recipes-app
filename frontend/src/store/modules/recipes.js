import http from '@/utils/http'

export default {
  namespaced: true,

  state: {
    recipes: [],
    recipe: null,
    pagination: null,
    loading: false,
    category: null
  },

  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes
    },
    setRecipe(state, recipe) {
      state.recipe = recipe
    },
    addRecipe(state, recipe) {
      state.recipes.push(recipe)
    },
    updateRecipe(state, recipe) {
      const index = state.recipes.findIndex((r) => r.id === recipe.id)
      if (index !== -1) {
        state.recipes[index] = recipe
      }
    },
    deleteRecipe(state, recipeId) {
      state.recipes = state.recipes.filter((r) => r.id !== recipeId)
    },

    setPagination(state, pagination) {
      state.pagination = pagination
    },

    setLoading(state, loading) {
      state.loading = loading
    },
    
  },
  actions: {
    async getRecipes({ commit }, { params }) {
      commit('setLoading', true)

      try {
        const response = await http.get(
          `/recipes?_page=${params.page}&_per_page=${params.per_page}`
        )
        const categories = await http.get(`/categories`)
        const recipes = response.data.data.map((recipe) => ({
          ...recipe,
          category: categories.data.find((c) => c.id == recipe.category_id)
        }))
        commit('setRecipes', recipes)
        const pagination = {
          current: params.page,
          first: response.data?.first,
          last: response.data?.last,
          next: response.data?.next,
          prev: response.data?.prev
        }
        commit('setPagination', pagination)
      } catch (error) {
        alert("Something wrong on the server. We'll try to fix it as soon as possible.")
        console.error(error)
      } finally {
        commit('setLoading', false)
      }
    },
    async getRecipe({ commit }, { id }) {
      commit('setLoading', false)

      try {
        const response = await http.get(`/recipes/${id}`)
        const categories = await http.get(`/categories`)
        const recipe = { ...response.data, category: categories.data.find((c) => c.id == response.data.category_id) }
        console.log(recipe)
        commit('setRecipe', recipe)
      } catch (error) {
        alert("Something wrong on the server. We'll try to fix it as soon as possible.")
        console.error(error)
      } finally {
        commit('setLoading', false)
      }
    },
    async storeRecipe({ commit }, { payload }) {
      try {
        const response = await http.post(`/recipes`, payload)
        commit('addRecipe', response.data)
      } catch (error) {
        alert("Something wrong on the server. We'll try to fix it as soon as possible.")
        console.error(error)
      }
    },
    async updateRecipe({ commit }, { id, payload }) {
      try {
        const response = await http.put(`/recipes/${id}`, payload)
        commit('updateRecipe', response.data)
      } catch (error) {
        alert("Something wrong on the server. We'll try to fix it as soon as possible.")
        console.error(error)
      }
    },
    async deleteRecipe({ commit }, { id }) {
      try {
        await http.delete(`/recipes/${id}`)
        commit('deleteRecipe', id)
      } catch (error) {
        alert("Something wrong on the server. We'll try to fix it as soon as possible.")
        console.error(error)
      }
    },

    setPaginationData({ commit }, { pagination }) {
      commit('setPagination', pagination)
    }
  }
}
