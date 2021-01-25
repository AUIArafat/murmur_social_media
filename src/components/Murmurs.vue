<template>
    <v-col :cols="9" dense>
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
            <Notification :message="alert" v-if="alert"/>
        </v-card>
        <v-card>
            <v-card-title class="headline">Murmur List</v-card-title>
            <v-row dense>
                <v-col  v-for="item in murmurList" :key="item.id" :cols="12">
                    <v-card elevation="2" outlined>
                        <v-card-title class="headline">{{item.text}}</v-card-title>
                        <v-card-text>
                        <p>Posted at {{item.created_at}}</p>
                        </v-card-text>
                        <v-card-actions>
                        <v-btn color="default" text outlined @click="likeMurmur(item.id)"><v-icon>thumb_up </v-icon>({{item.like_count}})</v-btn>
                        <v-btn color="default" text v-if="ispost" @click="deleteMurmur(item.id)" outlined><v-icon>delete</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
         </v-row>
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
    props:['ispost', 'murmurs'],
    computed: {
        murmurList:{ 
            get: function(){
                return this.murmurs;
            },
            set: function(value) {
                this.$emit('murmurList', value)
            }
        }
    },
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
                        this.murmurs.push(result);
                        // [result].concat(this.murmurs)
                        console.log('after result', result)
                        this.alert = result.text + " posted by " + this.user.name + " at " + result.created_at
                        setTimeout(() => this.alert = '', 5000);
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
            }
            else{
                this.alert = "Text is required!!!";
                setTimeout(() => this.alert = '', 5000);
                console.log("all murmur : ", this.murmurs);
            }
        },
        async deleteMurmur(id){
            try{
                await this.$axios.$delete('me/murmurs/'+id)
                .then(result => {
                    this.murmurs = this.murmurList.some(e=>{
                        return e.id !== id;
                    })
                    this.alert = result.message + " by " + this.user.name
                    setTimeout(() => this.alert = '', 5000);
                }).catch(error => {
                    if (error.response && error.response.data) {
                        this.alert = error.response.data.message || error.response.status
                        setTimeout(() => this.alert = '', 5000);
                    }
                })
            }
            catch(error){
                this.alert = "Something Wrong!!!"
                setTimeout(() => this.alert = '', 5000);
            }
        },
        async likeMurmur(id){
            try{
                await this.$axios.$post('murmurs/likeMurmur/'+id)
                .then(result => {
                    console.log('result', result)
                    this.murmurs.some(e=>{
                        if(e.id === result.result.id){
                            e.like_count = result.result.like_count;
                        }
                    })
                }).catch(error => {
                    if (error.response && error.response.data) {
                        this.alert = error.response.data.message || error.response.status
                        setTimeout(() => this.alert = '', 5000);
                    }
                })
            }
            catch(error){
                this.alert = "Something Wrong!!!"
                setTimeout(() => this.alert = '', 5000);
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