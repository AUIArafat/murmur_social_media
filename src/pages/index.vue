<template>
  <v-app>
        <v-main class="px-0">
            <v-data-iterator
              :items="murmurs"
              :items-per-page.sync="ipp"
              :page.sync="page"
              hide-default-footer
              class="d-flex flex-column mh-100 overflow-hidden"
            >
              <template v-slot:header>
                <v-toolbar
                  color="rgb(29, 161, 242)"
                  class="shrink mb-1"
                >
                    <div class="headline white--text mr-2 text-truncate">
                        Timeline
                    </div>
                </v-toolbar>
              </template>
              <template v-slot:default="props">
                <v-row class="fill-height overflow-auto" id="container">
                  <v-col
                    v-for="item in props.items"
                    :key="item.id"
                    :cols="(12/itemsPerRow)"
                    class="py-2"
                  > 
                    <v-card elevation="2" outlined class="mx-auto" color="rgb(116, 202, 254)" dark max-width="800">
                      <v-card-title>
                          <v-icon
                            large
                            left
                          >
                            mdi-twitter
                          </v-icon>
                          <span class="title font-weight-bold">Murmur</span>
                        </v-card-title>
                      <v-card-text class="headline font-weight-light">
                        <!-- <p>{{item.text}}</p>
                        Posted at {{item.created_at}} -->
                         <span v-html="item.text" class="mr-2"></span>
                        <v-chip v-text="item.created_at"></v-chip>
                      </v-card-text>
                      <v-card-actions>
                        <v-list-item class="grow">

        <v-list-item-content v-if="user.id !== item.user_id">
          posted by <nuxt-link class="navbar-item" :to="{ path: 'userdetails/'+item.user_id}">{{item.name}}</nuxt-link>
        </v-list-item-content>
        <v-list-item-content v-else>
          posted by <nuxt-link class="navbar-item" :to="{ path: 'userdetails/me'}">{{item.name}}</nuxt-link>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
        <v-btn color="default" text @click="likeMurmur(item.id)">
          <v-icon class="mr-1">
            thumb_up
          </v-icon>
        </v-btn>
          <span class="subheading mr-2">{{item.like_count}}</span>
        </v-row>
      </v-list-item>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:footer>
                <v-row class="no-gutters mt-auto py-2 shrink" align="center" justify="center">
                  <span class="mx-2">Rows per page</span>{{ rowsPerPage }}
                  
                  <v-spacer></v-spacer>
                  <span
                    class="mr-4
                    grey--text"
                  >
                    Page {{ page }} of <span v-text="numberOfPages" class="font-weight-bold primary--text"></span>
                  </span>
                  <v-btn
                    large
                    dark
                    rounded
                    color="rgb(29, 161, 242)"
                    class="mr-1"
                    @click="formerPage"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn
                    large
                    dark
                    rounded
                    color="rgb(29, 161, 242)"
                    class="ml-1"
                    @click="nextPage"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </v-data-iterator>
      </v-main>
    </v-app>
</template>

<script lang="ts">
export default {
  async asyncData({ $axios }): Promise<object> {
    const res = await $axios.$get('murmurs')
    console.log(res[0])
    return {
      murmurs: res,
    }
  },
   computed: {
      numberOfPages () {
        return Math.ceil(this.murmurs.length / this.ipp)
      },
      rowsPerPage () {
        return 10;
      },
      itemsPerRow () {
        return 1;
      },
      ipp () {
         return Math.ceil(this.rowsPerPage * this.itemsPerRow)
      },
    },
  methods:{
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
      },
      nextPage () {
          if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
          if (this.page - 1 >= 1) this.page -= 1
      },
  },
  data() {
    return {
      rpp: 10,
      page: 1,
      user: this.$store.state.auth.user
    }
  },
}
</script>
