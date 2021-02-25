<template>
    <!-- <UserDetails :users="data" /> -->
      <v-layout column justify-center align-center>
        <v-row dense>
          <UserInfo :user="user"/>
          <Murmurs />
          <Followers :followers="data"/>
        </v-row>
      </v-layout>
</template>

<script lang="ts">
import UserInfo from "~/components/UserInfo"
import Murmurs from "~/components/Murmurs"
import Followers from "~/components/Followers"
export default {
  computed: {
    user(){
      return this.$store.state.auth ? this.$store.state.auth.user : null 
    }
  },
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