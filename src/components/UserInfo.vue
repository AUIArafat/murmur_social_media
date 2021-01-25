<template>
<v-app>
    <v-col :cols="12">
        <v-card elevation="2">
            <v-card-title class="headline">This is, {{userData.name}}</v-card-title>
            <v-card-text>
                <p>Email: {{userData.email}}</p>
                <p>Total follower: {{followerCount}}</p>
                <p>Total followed: {{follwedCount}}</p>
                <p>Joined at {{userData.created_at}}</p>
            </v-card-text>
            <!-- <v-card-actions v-if="isfollow">
                <v-btn color="primary" text nuxt to="/" outlined>Follow</v-btn>
            </v-card-actions> -->
            <div v-if="isfollow">
                <v-card-actions v-if="isFollowing">
                    <v-btn color="info" text v-on:click="unFollowUser(relationship_id)" outlined><v-icon>mdi-minus</v-icon> Unfollow</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-btn color="success" text v-on:click="followUser(userData.id)" outlined><v-icon>mdi-plus</v-icon> Follow</v-btn>
                </v-card-actions>
            </div>
        </v-card>
    </v-col>
</v-app>
</template>

<script>
export default{
    name:"UserInfo",
    props:['userData', 'isfollow'],
    created (){
      this.getRelationship();
      this.getFollowedCount();
      this.getFollowerCount();
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
                console.log("Added with result : ", result);
                this.isFollowing = true;
                this.follwedCount = this.follwedCount + 1
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
      async unFollowUser(relationship_id){
        console.log("follow id : ", relationship_id, " followed id: ", this.user.id);
        try{
            await this.$axios.$delete('relationship/'+relationship_id).then(result => {
                console.log("Deleted with result : ", result)
                this.isFollowing = false;
                this.follwedCount = this.follwedCount - 1
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
      async getRelationship(){
          const authUserDetail = await this.$axios.$get("users/"+this.user.id)
          this.relationships = authUserDetail.relationships
          this.isFollowing = this.relationships.some(e => {
              this.relationship_id = e.id;
              return e.followed_id === this.userData.id;
            })
      },
      async getFollowedCount(){
          await this.$axios.$get('relationship/getFollowedRelation/'+this.userData.id)
          .then(result=>{
              this.follwedCount = result.length;
          })
      },
       async getFollowerCount(){
          await this.$axios.$get('relationship/getFollowerRelation/'+this.userData.id)
          .then(result=>{
              this.followerCount = result.length;
          })
      },
    },
    data(){
      return{
        user:this.$store.state.auth.user,
        relationships:[],
        currentUser: this.userData,
        isFollowing:false,
        relationship_id:null,
        follwedCount:0,
        followerCount:0
      }
    }
}
</script>