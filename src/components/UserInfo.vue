<template>
    <v-col :cols="3">
        <v-card elevation="2">
            <v-card-title class="headline">User Information</v-card-title>
                <v-card-text>
                    <p>Name: {{userData.name}}</p>
                    <p>Email: {{userData.email}}</p>
                    <p>Joined at {{userData.created_at}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text nuxt to="/">Follower({{5}})</v-btn>
                    <v-btn color="primary" text nuxt to="/">Following({{5}})</v-btn>
                </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
export default{
    name:"UserInfo",
    props:['userData']
}
</script>