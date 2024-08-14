<template>
  <div>
    <div class="container">
      <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <RouterLink :to="{ name: 'home'}" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'home'}" class="nav-link">
              <i class="fa-solid fa-cart-shopping"></i>
              Shopping Cart
            </RouterLink>
          </li>
        </ul>
      </header>
    </div>
    <RouterView />
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss"></style>