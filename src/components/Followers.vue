<template>
            <v-col :cols="3" dense>
            <v-card elevation="2">
                <v-card-title class="headline">Follower</v-card-title>
                    <v-card elevation="2">
                      <v-list one-line>
                            <template v-for="item in this.followers">
                                <v-card-text>
                                    <p>Name: {{item.name}}</p>
                                    <p>Email: {{item.email}}</p>
                                    <p>Joined at {{item.created_at}}</p>
                                </v-card-text>
                            </template>
                            </v-list>
                    </v-card>
            </v-card>
        </v-col>
</template>

<script lang="ts">

export default{
    name:"Followers",
    props:["followers"]
}
</script>