<template>
   <v-layout column justify-center align-center>
    <v-row dense>
        <v-col :cols="3">
            <v-card elevation="2">
                <v-card-title class="headline">User Information</v-card-title>
                    <v-card-text>
                        <p>Name: {{user.username}}</p>
                        <p>Email: {{user.email}}</p>
                        <p>Joined at {{user.created_at}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" text nuxt to="/">Follower({{5}})</v-btn>
                        <v-btn color="primary" text nuxt to="/">Following({{5}})</v-btn>
                    </v-card-actions>
            </v-card>
        </v-col>
        <v-col :cols="6" dense>
            <v-card elevation="2">
                <v-card-title class="headline">Murmurs</v-card-title>
                <v-row dense>
                    <v-col :cols="10">
                        <v-textarea
                        label="Post Murmur"
                        auto-grow
                        outlined
                        rows="2"
                        class="ma-6"
                        row-height="25"
                        shaped
                        ></v-textarea>
                    </v-col>
                    <v-col :cols="2">
                        <v-btn
                        x-large
                        class="ma-2"
                        outlined
                        color="indigo"
                        >
                    Post
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-card>
                <v-card-title class="headline">Murmur List</v-card-title>
            </v-card>
        </v-col>
        <v-col :cols="3" dense>
            <v-card elevation="2">
                <v-card-title class="headline">Follower</v-card-title>
                    <v-card elevation="2">
                      <v-list one-line>
                            <template v-for="item in users">
                                <v-card-text>
                                    <p>Name: {{item.name}}</p>
                                    <p>Email: {{user.email}}</p>
                                    <p>Joined at {{user.created_at}}</p>
                                </v-card-text>
                            </template>
                            </v-list>
                    </v-card>
            </v-card>
            <v-card elevation="2">
                <v-card-title class="headline">Following</v-card-title>
                    <v-card-text>
                        <p>Name: {{user.username}}</p>
                        <p>Email: {{user.email}}</p>
                        <p>Joined at {{user.created_at}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" text nuxt to="/">Follower({{5}})</v-btn>
                        <v-btn color="primary" text nuxt to="/">Following({{5}})</v-btn>
                    </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default{
    name: 'UserInfo',
    props: ['users'],
    computed: {
        user () { return this.$store.state.auth ? this.$store.state.auth.user : null }
    }, 
}
</script>