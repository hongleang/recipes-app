<template>
  <div>
    <div class="input-group mb-3">
      <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text" class="form-control" placeholder="Search recipes" aria-label="Search recipes" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
  }
</script>

<style lang="scss" scoped>

</style>