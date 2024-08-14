import recipes from './modules/recipes'

import { createLogger, createStore } from 'vuex'

const store = createStore({
  modules: {
    recipes
  },
  plugins: [createLogger()],

})

export default store
