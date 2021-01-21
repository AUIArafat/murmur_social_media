<template>
  <div>
    <h1>Display the data obtained from API here</h1>
    {{ data }}
  </div>
</template>

<script lang="ts">
export default {
  async asyncData({ $axios }): Promise<object> {
    const res = await $axios.$get('http://localhost:3001/api/users')
    console.log(res[0])
    return {
      data: res,
    }
  },
  data() {
    return {}
  },
}
</script>
