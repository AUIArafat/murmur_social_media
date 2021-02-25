<template>
  <v-app>
    <v-layout column align-center>
      <v-card-title class="headline">All Users</v-card-title>
        <v-container fluid>
      <v-row dense>
          <v-col v-for="item in users" :key="item.id" :cols="3">
            <v-card elevation="2">
              <v-card-title class="headline">Hello, I'm <nuxt-link class="navbar-item" :to="{ path: 'userdetails/'+item.id}">{{item.name}}</nuxt-link></v-card-title>
              <v-card-text>
                <p>Email: {{item.email}}</p>
                <p>Joined at {{item.created_at}}</p>
              </v-card-text>
            </v-card>
      </v-col>
         </v-row>
    </v-container>
  </v-layout>
  </v-app>
</template>

<script lang="ts">
export default {
    name: 'Users',
    props: ['users'],
    created (){
      this.getRelationship();
    },
    methods: {
      getRelationship(){
        this.users = this.users.filter(user =>{
          if(this.user.id === user.id){
            this.relationships = user.relationships;
          }
          return this.user.id !== user.id
        })
      }
    },
    data(){
      return{
        user:this.$store.state.auth.user,
        relationships:[]
      }
    }
}
</script>
