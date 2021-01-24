<template>
    <!-- <UserDetails :users="data" /> -->
      <v-layout column justify-center align-center>
        <v-row dense>
          <UserInfo :userData="userData"/>
          <Murmurs :ispost="isPost"/>
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
        isPost: false,
        murmurList: []
    }
  },
}
</script>