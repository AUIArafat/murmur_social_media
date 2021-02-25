<template>
    <v-row dense>
        <v-col :cols="12" dense>
            <v-card elevation="2">
                <v-card-title class="headline">Follower({{5}})</v-card-title>
                <v-card elevation="2">
                    <v-list one-line>
                        <v-card-text v-for="item in this.followers" :key="item.id">
                            <p>Name: {{item.name}}</p>
                            <p>Email: {{item.email}}</p>
                            <p>Joined at {{item.created_at}}</p>
                        </v-card-text>
                    </v-list>
                </v-card>
            </v-card>
        </v-col>
         <v-col :cols="12" dense>
            <v-card elevation="2">
                <v-card-title class="headline">Followed({{5}})</v-card-title>
                <v-card elevation="2">
                    <v-list one-line>
                        <v-card-text v-for="item in this.followers" :key="item.id">
                            <p>Name: {{item.name}}</p>
                            <p>Email: {{item.email}}</p>
                            <p>Joined at {{item.created_at}}</p>
                        </v-card-text>
                    </v-list>
                </v-card>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">

export default{
    name:"Followers",
    props:["followers"]
}
</script>