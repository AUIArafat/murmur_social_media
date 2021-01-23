<template>
  <div>
    <h1>Display the data obtained from API here</h1>
    <v-layout column justify-center align-center>
    <!-- <v-flex xs12 sm8 md6> -->
        <v-container fluid>
      <v-row dense>
          <v-col  v-for="item in users" :key="item.id" :cols="3">
      <v-card elevation="2" outlined>
        <v-card-title class="headline">Hello, I'm {{item.name}}</v-card-title>
        <v-card-text>
          <p>Email: {{item.email}}</p>
          <p>Joined at {{item.created_at}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="default" text nuxt to="/"><v-icon>mdi-plus</v-icon> Follow</v-btn>
        </v-card-actions>
      </v-card>
      </v-col>
         </v-row>
    </v-container>
    <!-- </v-flex> -->
  </v-layout>
  </div>
</template>

<script lang="ts">
export default {
    name: 'Users',
    props: ['users']
}
</script>
