<template>
    <UserInfo :users="data" />
</template>

<script lang="ts">
import UserInfo from "components/UserInfo"
export default {
  async asyncData({ $axios }): Promise<object> {
    const res = await $axios.$get('users')
    console.log(res[0])
    return {
      data: res,
    }
  },
  data() {
    return {
        data:[]
    }
  },
}
</script>