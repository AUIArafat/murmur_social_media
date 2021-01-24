<template>
    <v-col :cols="6" dense>
        <v-card elevation="2" v-if="ispost">
            <v-card-title class="headline">Murmurs</v-card-title>
            <v-row dense method="post" @submit.prevent="postMurmur">
                <!-- <form method="post" @submit.prevent="postMurmur"> -->
                <v-col :cols="10">
                    <v-textarea
                    label="Post Murmur"
                    auto-grow
                    outlined
                    rows="1"
                    class="ma-6"
                    row-height="25"
                    shaped
                    v-model="text"
                    required
                    ></v-textarea>
                </v-col>
                <v-col :cols="2">
                    <v-btn x-large class="ma-2" outlined color="indigo" type="submit" @click="postMurmur">Post</v-btn>
                </v-col>
                <!-- </form> -->
            </v-row>
        </v-card>
        <Notification :message="alert" v-if="alert"/>
        <v-card>
            <v-card-title class="headline">Murmur List</v-card-title>
        </v-card>
    </v-col>
</template>

<script>
import Notification from '~/components/Notification'
export default {
    components: {
        Notification,
    },
    name:"Murmurs",
    props:['ispost'],
    methods:{
        async postMurmur(){
            if(this.text!== ''){
                try{
                    await this.$axios.$post('me/murmurs', {
                        text: this.text,
                        user_id: this.user.id,
                        like_count: this.like_count
                    }).then(result => {
                        console.log('result', result)
                        this.text = '';
                        this.alert = result.text + " posted by " + this.user.name + " at " + result.created_at
                    }).catch(error => {
                        if (error.response && error.response.data) {
                            this.alert = error.response.data.message || error.response.status
                        }
                    })
                }
                catch(error){
                    this.alert = "Something Wrong!!!"
                }
            }
            else{
                this.alert = "Text is required!!!";
            }
        }
    },
    data() {
        return {
            text: '',
            user: this.$store.state.auth.user,
            like_count: 0,
            alert:null
        }
  },
}
</script>