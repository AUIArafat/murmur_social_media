<template>
    <!-- <UserDetails :users="data" /> -->
    <!-- <v-app> -->
      <v-layout column justify-center align-center>
        <v-row dense>
          <UserInfo :userData="user" :isfollow="false"/>
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
export default {
    computed:{
        user(){
            return this.$store.state.auth ? this.$store.state.auth.user : null 
        }
    },
    created() {
        this.getUserMururs()
    },
    methods:{
        getUserMururs(){
            this.user_id = this.$store.state.auth.user.id;
            console.log("user is : ", this.user_id);
            this.$axios.$get('murmurs/getByUserId?user_id='+this.user_id).then(result=>{
                console.log("Murmur is : ", result);
                this.murmurs = result;
            })
        }
    },
//   async asyncData({ $axios }): Promise<object> {
//     const res = await $axios.$get('users')
//     console.log(res[0])
//     return {
//       data: res,
//     }
//   },
  data() {
    return {
        data:[],
        isPost: true,
        murmurs:[],
        user_id: null
    }
  },
}
</script>