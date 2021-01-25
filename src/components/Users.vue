<template>
  <v-app>
    <v-card-title class="headline">Display the data obtained from API here</v-card-title>
    <v-layout column justify-center align-center>
    <!-- <v-flex xs12 sm8 md6> -->
        <v-container fluid>
      <v-row dense>
          <v-col v-for="item in users" :key="item.id" :cols="3">
            <v-card elevation="2">
              <v-card-title class="headline">Hello, I'm <nuxt-link class="navbar-item" :to="{ path: 'userdetails/'+item.id}">{{item.name}}</nuxt-link></v-card-title>
              <v-card-text>
                <p>Email: {{item.email}}</p>
                <p>Joined at {{item.created_at}}</p>
              </v-card-text>
              <!-- {{relationships}} -->
                <!-- <v-card-actions v-if="relationships.some(e => e.followed_id === item.id)">
                  <v-btn color="info" text v-on:click="followUser(e.id)" outlined><v-icon>mdi-minus</v-icon> Unfollow</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                  <v-btn color="success" text v-on:click="unFollowUser(item.id)" outlined><v-icon>mdi-plus</v-icon> Follow</v-btn>
                </v-card-actions> -->
            </v-card>
      </v-col>
         </v-row>
    </v-container>
    <!-- </v-flex> -->
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
      async followUser(followed_id){
        console.log("follow id : ", followed_id, " followed id: ", this.user.id);
        try{
            await this.$axios.$post('relationship', {
                follower_id: this.user.id,
                followed_id: followed_id,
                user_id: this.user.id
            }).then(result => {
                console.log("Added with result : ", result)
                // this.relationships = result.user;
                this.getRelationship();
            }).catch(error => {
                if (error.response && error.response.data) {
                    this.alert = error.response.data.message || error.response.status
                }
            })
        }
        catch(error){
            this.alert = "Something Wrong!!!"
            setTimeout(() => this.alert = '', 5000);
        }
      },
      async unFollowUser(followed_id){
        console.log("follow id : ", followed_id, " followed id: ", this.user.id);
        try{
            await this.$axios.$post('relationship', {
                follower_id: this.user.id,
                followed_id: followed_id,
                user_id: this.user.id
            }).then(result => {
                console.log("Added with result : ", result)
            }).catch(error => {
                if (error.response && error.response.data) {
                    this.alert = error.response.data.message || error.response.status
                }
            })
        }
        catch(error){
            this.alert = "Something Wrong!!!"
            setTimeout(() => this.alert = '', 5000);
        }
      },
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
