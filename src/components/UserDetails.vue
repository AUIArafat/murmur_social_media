<template>
   <v-layout column justify-center align-center>
    <v-row dense>
        <UserInfo/>
    </v-row>
  </v-layout>
</template>

<script>
import UserInfo from "components/UserInfo"
export default{
    name: 'UserDetails',
    props: ['users'],
    computed: {
        user () { return this.$store.state.auth ? this.$store.state.auth.user : null }
    }, 
}
</script>