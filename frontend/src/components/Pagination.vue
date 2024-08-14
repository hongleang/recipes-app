<template>
  <nav>
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ 'disabled': !pagination?.prev }">
        <a class="page-link" @click.prevent="$emit('prev')">Previous</a>
      </li>

      <li v-for="n in Array.from(Array(pagination?.last ?? 0).keys())" :key="n" class="page-item">
        <a class="page-link" :class="{ 'active': pagination?.current === n + 1 }" @click="$emit('navigateToPage', n + 1)">{{ n + 1 }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled': !pagination?.next }">
        <a class="page-link" @click.prevent="$emit('next')">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>


export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>