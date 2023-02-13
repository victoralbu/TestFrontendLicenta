<template>
  <h1>Hello</h1>
</template>

<script>
definePageMeta({
  middleware: ['auth', 'validate-token']
})
</script>

<style lang="scss" scoped>

</style>