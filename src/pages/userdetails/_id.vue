<template>
    <!-- <UserDetails :users="data" /> -->
      <v-layout column justify-center align-center>
        <v-row dense>
          <UserInfo :userData="userData"/>
          <Murmurs />
          <Followers :followers="data"/>
        </v-row>
      </v-layout>
</template>

<script lang="ts">
import UserInfo from "~/components/UserInfo"
import Murmurs from "~/components/Murmurs"
import Followers from "~/components/Followers"
import axios from 'axios'
export default {
    user(){
        return this.$store.state.auth ? this.$store.state.auth.user : null 
    },
    async asyncData({$axios, params}): Promise<object> {
        console.log("params : ", params)
        const res = await $axios.$get('users/'+params.id)
        console.log(res)
        return {
            userData: res,
        }
   },
  data() {
    return {
        data:[],
        userData:null,
        url: 'api/users/' + this.$route.params.id
    }
  },
}
</script>