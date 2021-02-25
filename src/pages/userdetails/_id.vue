<template>
    <!-- <UserDetails :users="data" /> -->
    <!-- <v-app> -->
      <v-layout column justify-center align-center>
        <v-row dense>
          <UserInfo :userData="userData" :isfollow="true"/>
          <Murmurs :ispost="isPost" :murmurs="murmurs"/>
          <!-- <Followers :followers="data"/> -->
        </v-row>
      </v-layout>
    <!-- </v-app> -->
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
   created() {
        this.getUserMururs()
    },
    methods:{
        getUserMururs(){
            console.log("user is : ", this.user_id);
            this.$axios.$get('murmurs/getByUserId?user_id='+this.user_id).then(result=>{
                console.log("Murmur is : ", result);
                this.murmurs = result;
            })
        }
    },
  data() {
    return {
        data:[],
        userData:null,
        isPost: false,
        murmurs: [],
        user_id: this.$route.params.id
    }
  },
}
</script>